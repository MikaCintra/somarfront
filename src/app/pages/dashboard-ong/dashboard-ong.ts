import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../../features/auth/services/auth.service';
import { CampaignsService, Campaign } from '../../features/campaigns/services/campaigns.service';
import { VolunteerService, VolunteerOpportunity, VolunteerRegistration } from '../../features/volunteers/services/volunteer.service';
import { MessagesService } from '../../features/chat/services/messages.service';
import { Modal } from '../../shared/components/modal/modal';
import { ThemeLanguageToggle } from '../../shared/components/theme-language-toggle/theme-language-toggle';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MOCK_DONORS, DONORS_STATS } from '../../shared/data/mock-donors.data';
import { DonorProfile } from '../../shared/models/user.interface';

@Component({
  selector: 'app-dashboard-ong',
  imports: [CommonModule, Modal, ReactiveFormsModule, RouterModule, ThemeLanguageToggle],
  templateUrl: './dashboard-ong.html',
  styleUrl: './dashboard-ong.scss'
})
export class DashboardOng implements OnInit {
  
  campaigns: Campaign[] = [];

  // Doadores reais do sistema
  donors: DonorProfile[] = MOCK_DONORS;
  donorsStats = DONORS_STATS;
  
  // Top voluntários (baseado nos doadores com mais horas)
  volunteers = MOCK_DONORS
    .sort((a, b) => b.totalVolunteerHours - a.totalVolunteerHours)
    .slice(0, 5)
    .map(donor => ({
      name: donor.name,
      hours: donor.totalVolunteerHours,
      lastActivity: donor.lastLogin ? this.getLastActivityText(donor.lastLogin) : 'Nunca'
    }));

  // Campanhas
  isModalOpen = false;
  editingCampaign: Campaign | null = null;
  campaignForm!: FormGroup;

  // Oportunidades de Voluntariado
  opportunities: VolunteerOpportunity[] = [];
  isVolunteerModalOpen = false;
  editingOpportunity: VolunteerOpportunity | null = null;
  volunteerForm!: FormGroup;

  // Visualização de inscritos
  isRegistrationsModalOpen = false;
  selectedOpportunityRegistrations: VolunteerRegistration[] = [];
  selectedOpportunityTitle: string = '';

  categories = ['Roupas', 'Alimentos', 'Educação', 'Móveis', 'Brinquedos', 'Higiene', 'Outros'];
  volunteerCategories = ['Alimentos', 'Educação', 'Saúde', 'Eventos', 'Meio Ambiente', 'Esportes', 'Outros'];
  
  currentUserEmail: string = '';
  currentUserName: string = '';
  unreadMessagesCount: number = 0;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private campaignsService: CampaignsService,
    private volunteerService: VolunteerService,
    private messagesService: MessagesService
  ) {
    this.initForm();
    this.initVolunteerForm();
  }

  ngOnInit() {
    this.currentUserEmail = sessionStorage.getItem('user-email') || '';
    this.currentUserName = sessionStorage.getItem('username') || 'ONG';
    this.loadCampaigns();
    this.loadOpportunities();
    this.loadUnreadCount();
  }

  loadCampaigns() {
    this.campaigns = this.campaignsService.getCampaignsByOng(this.currentUserEmail);
  }

  loadUnreadCount() {
    this.unreadMessagesCount = this.messagesService.getTotalUnreadCount(this.currentUserEmail);
  }

  loadOpportunities() {
    this.opportunities = this.volunteerService.getOpportunitiesByOng(this.currentUserEmail);
  }

  initForm() {
    this.campaignForm = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(5)]),
      description: new FormControl('', [Validators.required, Validators.minLength(10)]),
      goal: new FormControl(100, [Validators.required, Validators.min(1)]),
      category: new FormControl('', [Validators.required]),
      location: new FormControl('', [Validators.required])
    });
  }

  openNewCampaignModal() {
    this.editingCampaign = null;
    this.campaignForm.reset({ goal: 100 });
    this.isModalOpen = true;
  }

  openEditCampaignModal(campaign: Campaign) {
    this.editingCampaign = campaign;
    this.campaignForm.patchValue({
      title: campaign.titulo,
      description: campaign.descricao,
      goal: campaign.meta,
      category: campaign.category,
      location: campaign.localizacao || ''
    });
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.editingCampaign = null;
    this.campaignForm.reset();
  }

  saveCampaign() {
    if (this.campaignForm.valid) {
      const formValue = this.campaignForm.value;

      if (this.editingCampaign) {
        // Editar campanha existente
        const success = this.campaignsService.updateCampaign(this.editingCampaign.id, {
          titulo: formValue.title,
          descricao: formValue.description,
          meta: formValue.goal,
          category: formValue.category
        });

        if (success) {
          alert('Campanha atualizada com sucesso! ✅');
          this.loadCampaigns();
        }
      } else {
        // Criar nova campanha
        this.campaignsService.saveCampaign(
          formValue.title,
          formValue.description,
          formValue.goal,
          formValue.location || 'Brasil'
        ).subscribe({
          next: () => {
            alert('Campanha criada com sucesso! 🎉');
            this.loadCampaigns();
          },
          error: (error) => {
            console.error('Erro ao criar campanha:', error);
          }
        });
      }

      this.closeModal();
    }
  }

  deleteCampaign(campaignId: number) {
    if (confirm('Tem certeza que deseja excluir esta campanha?')) {
      const success = this.campaignsService.deleteCampaign(campaignId);
      
      if (success) {
        alert('Campanha excluída com sucesso!');
        this.loadCampaigns();
      }
    }
  }

  getProgress(campaign: Campaign): number {
    return (campaign.current || 0 / campaign.meta) * 100;
  }

  // === VOLUNTEER OPPORTUNITIES METHODS ===

  initVolunteerForm() {
    this.volunteerForm = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(5)]),
      description: new FormControl('', [Validators.required, Validators.minLength(10)]),
      date: new FormControl('', [Validators.required]),
      time: new FormControl('', [Validators.required]),
      location: new FormControl('', [Validators.required]),
      vacancies: new FormControl(5, [Validators.required, Validators.min(1)]),
      category: new FormControl('', [Validators.required]),
      skills: new FormControl('')
    });
  }

  openNewVolunteerModal() {
    this.editingOpportunity = null;
    this.volunteerForm.reset({ vacancies: 5 });
    this.isVolunteerModalOpen = true;
  }

  openEditVolunteerModal(opportunity: VolunteerOpportunity) {
    this.editingOpportunity = opportunity;
    this.volunteerForm.patchValue({
      title: opportunity.title,
      description: opportunity.description,
      date: opportunity.date,
      time: opportunity.time,
      location: opportunity.location,
      vacancies: opportunity.vacancies,
      category: opportunity.category,
      skills: opportunity.skills?.join(', ') || ''
    });
    this.isVolunteerModalOpen = true;
  }

  closeVolunteerModal() {
    this.isVolunteerModalOpen = false;
    this.editingOpportunity = null;
    this.volunteerForm.reset();
  }

  saveVolunteerOpportunity() {
    if (this.volunteerForm.valid) {
      const formValue = this.volunteerForm.value;
      const skillsArray = formValue.skills 
        ? formValue.skills.split(',').map((s: string) => s.trim()).filter((s: string) => s)
        : [];

      if (this.editingOpportunity) {
        // Editar oportunidade existente
        const success = this.volunteerService.updateOpportunity(this.editingOpportunity.id, {
          title: formValue.title,
          description: formValue.description,
          date: formValue.date,
          time: formValue.time,
          location: formValue.location,
          vacancies: formValue.vacancies,
          category: formValue.category,
          skills: skillsArray
        });

        if (success) {
          alert('Oportunidade atualizada com sucesso! ✅');
          this.loadOpportunities();
        }
      } else {
        // Criar nova oportunidade
        this.volunteerService.createOpportunity({
          ongEmail: this.currentUserEmail,
          ongName: this.currentUserName,
          title: formValue.title,
          description: formValue.description,
          date: formValue.date,
          time: formValue.time,
          location: formValue.location,
          vacancies: formValue.vacancies,
          currentVolunteers: 0,
          category: formValue.category,
          skills: skillsArray,
          status: 'open'
        });

        alert('Oportunidade criada com sucesso! 🎉');
        this.loadOpportunities();
      }

      this.closeVolunteerModal();
    }
  }

  deleteVolunteerOpportunity(opportunityId: number) {
    if (confirm('Tem certeza que deseja excluir esta oportunidade de voluntariado?')) {
      const success = this.volunteerService.deleteOpportunity(opportunityId);
      
      if (success) {
        alert('Oportunidade excluída com sucesso!');
        this.loadOpportunities();
      }
    }
  }

  viewRegistrations(opportunity: VolunteerOpportunity) {
    this.selectedOpportunityTitle = opportunity.title;
    this.selectedOpportunityRegistrations = this.volunteerService.getRegistrationsByOpportunity(opportunity.id);
    this.isRegistrationsModalOpen = true;
  }

  closeRegistrationsModal() {
    this.isRegistrationsModalOpen = false;
    this.selectedOpportunityRegistrations = [];
    this.selectedOpportunityTitle = '';
  }

  confirmRegistration(registrationId: number) {
    const success = this.volunteerService.updateRegistration(registrationId, { status: 'confirmed' });
    if (success) {
      alert('Inscrição confirmada! ✅');
      this.selectedOpportunityRegistrations = this.selectedOpportunityRegistrations.map(r =>
        r.id === registrationId ? { ...r, status: 'confirmed' as const } : r
      );
    }
  }

  getVacancyStatus(opportunity: VolunteerOpportunity): string {
    const available = opportunity.vacancies - opportunity.currentVolunteers;
    if (available <= 0) return 'Vagas esgotadas';
    if (available === 1) return '1 vaga restante';
    return `${available} vagas disponíveis`;
  }

  getVacancyClass(opportunity: VolunteerOpportunity): string {
    const available = opportunity.vacancies - opportunity.currentVolunteers;
    if (available <= 0) return 'full';
    if (available <= 2) return 'low';
    return 'open';
  }

  // Função auxiliar para calcular tempo desde último login
  private getLastActivityText(lastLogin: Date): string {
    const now = new Date();
    const diffMs = now.getTime() - lastLogin.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Hoje';
    if (diffDays === 1) return '1 dia atrás';
    if (diffDays < 7) return `${diffDays} dias atrás`;
    if (diffDays < 30) {
      const weeks = Math.floor(diffDays / 7);
      return weeks === 1 ? '1 semana atrás' : `${weeks} semanas atrás`;
    }
    const months = Math.floor(diffDays / 30);
    return months === 1 ? '1 mês atrás' : `${months} meses atrás`;
  }

  goToChat() {
    this.router.navigate(['/chat']);
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/']);
  }
}
