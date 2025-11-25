import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../../features/auth/services/auth.service';
import { CampaignsService, Campaign } from '../../features/campaigns/services/campaigns.service';
import { VolunteerService, VolunteerOpportunity } from '../../features/volunteers/services/volunteer.service';
import { Modal } from '../../shared/components/modal/modal';
import { CampaignDetailsModal } from '../../features/campaigns/components/campaign-details-modal/campaign-details-modal';
import { ThemeLanguageToggle } from '../../shared/components/theme-language-toggle/theme-language-toggle';
import { ReviewsService } from '../../shared/components/reviews.service';
import { GamificationService, UserGamification, Badge, Achievement } from '../../core/services/gamification.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MOCK_DONORS } from '../../shared/data/mock-donors.data';
import { DonorProfile } from '../../shared/models/user.interface';
import { I18nService } from '../../core/services/i18n.service';
import { BRAZILIAN_STATES, State, getCitiesByState } from '../../shared/data/brazil-locations.data';
import { ChatService } from '../../features/chat/services/chat.service';
import { LoggerService } from '../../core/services/logger.service';

@Component({
  selector: 'app-dashboard-doador',
  imports: [CommonModule, Modal, CampaignDetailsModal, ReactiveFormsModule, FormsModule, RouterModule, ThemeLanguageToggle],
  templateUrl: './dashboard-doador.html',
  styleUrl: './dashboard-doador.scss'
})
export class DashboardDoador implements OnInit {
  
  allCampaigns: Campaign[] = [];
  filteredCampaigns: Campaign[] = [];
  
  selectedCategory = '';
  selectedUrgency = '';
  searchQuery = '';
  selectedState = '';
  selectedCity = '';

  categories = ['Roupas', 'Alimentos', 'Educação', 'Móveis', 'Brinquedos', 'Higiene', 'Outros'];
  states = BRAZILIAN_STATES;
  cities: string[] = [];

  volunteerOpportunities: VolunteerOpportunity[] = [];
  isVolunteerRegistrationModalOpen = false;
  selectedOpportunity: VolunteerOpportunity | null = null;
  volunteerRegistrationForm!: FormGroup;

  // Buscar perfil do doador logado (exemplo: primeiro doador)
  currentDonorEmail: string = '';
  currentDonorProfile: DonorProfile | null = null;
  
  myContributions = {
    donations: 0,
    volunteerHours: 0,
    impactedPeople: 150
  };

  isDonationModalOpen = false;
  isDetailsModalOpen = false;
  selectedCampaign: Campaign | null = null;
  donationForm!: FormGroup;

  // Gamification
  userGamification: UserGamification | null = null;
  userBadgesDisplay: { badge: Badge; achievement: Achievement | null }[] = [];

  constructor(
    public i18n: I18nService,
    private router: Router,
    private loginService: LoginService,
    private campaignsService: CampaignsService,
    private volunteerService: VolunteerService,
    private reviewsService: ReviewsService,
    private gamificationService: GamificationService,
    private chatService: ChatService,
    private logger: LoggerService
  ) {
    this.initDonationForm();
    this.initVolunteerRegistrationForm();
  }

  ngOnInit() {
    this.loadDonorProfile();
    this.loadCampaigns();
    this.loadVolunteerOpportunities();
    this.loadGamificationData();
  }

  loadDonorProfile() {
    // Buscar email do doador logado
    this.currentDonorEmail = sessionStorage.getItem('user-email') || '';
    
    // Buscar perfil do doador nos dados mockados
    this.currentDonorProfile = MOCK_DONORS.find(d => d.email === this.currentDonorEmail) || null;
    
    // Se encontrar o perfil, atualizar contribuições
    if (this.currentDonorProfile) {
      this.myContributions = {
        donations: this.currentDonorProfile.totalDonations,
        volunteerHours: this.currentDonorProfile.totalVolunteerHours,
        impactedPeople: this.currentDonorProfile.totalDonations * 5 // Estimativa de impacto
      };
    }
  }

  loadCampaigns() {
    this.allCampaigns = this.campaignsService.getActiveCampaigns();
    this.filteredCampaigns = [...this.allCampaigns];
  }

  loadVolunteerOpportunities() {
    this.volunteerOpportunities = this.volunteerService.getOpenOpportunities();
  }

  initDonationForm() {
    this.donationForm = new FormGroup({
      itemDescription: new FormControl('', [Validators.required, Validators.minLength(3)]),
      quantity: new FormControl(1, [Validators.required, Validators.min(1)]),
      deliveryType: new FormControl('retirada', [Validators.required]), // retirada ou entrega
      donorName: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      notes: new FormControl('')
    });
  }

  initVolunteerRegistrationForm() {
    this.volunteerRegistrationForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      message: new FormControl('')
    });
  }

  openDonationModal(campaign: Campaign) {
    this.selectedCampaign = campaign;
    this.donationForm.reset({ quantity: 1 });
    this.isDonationModalOpen = true;
  }

  closeDonationModal() {
    this.isDonationModalOpen = false;
    this.selectedCampaign = null;
    this.donationForm.reset();
  }

  submitDonation() {
    if (this.donationForm.valid && this.selectedCampaign) {
      const formValue = this.donationForm.value;
      
      // Atualiza o progresso da campanha usando o serviço
      const success = this.campaignsService.addDonation(
        this.selectedCampaign.id, 
        formValue.quantity
      );

      if (success) {
        // Atualiza as contribuições do doador
        this.myContributions.donations++;
        
        const deliveryMessage = formValue.deliveryType === 'entrega' 
          ? 'Você se comprometeu a entregar a doação no endereço da ONG.'
          : 'A ONG entrará em contato para combinar a retirada no seu endereço.';
        
        // Criar chat automaticamente com a ONG
        this.createChatWithOng(this.selectedCampaign, 'doação');
        
        alert(`✅ Doação registrada com sucesso!\n\n${formValue.quantity} ${formValue.itemDescription} para "${this.selectedCampaign.title}"\n\n${deliveryMessage}\n\n💬 Um chat foi iniciado com a ONG para você coordenar os detalhes da doação. Acesse o menu "Chat" para conversar.`);
        
        this.closeDonationModal();
        this.loadCampaigns(); // Recarrega as campanhas com dados atualizados
      }
    }
  }

  applyFilters() {
    this.filteredCampaigns = this.allCampaigns.filter(campaign => {
      const matchesCategory = !this.selectedCategory || campaign.category === this.selectedCategory;
      const matchesUrgency = !this.selectedUrgency || campaign.urgency === this.selectedUrgency;
      const matchesSearch = !this.searchQuery || 
        campaign.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        campaign.description.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        campaign.ongName.toLowerCase().includes(this.searchQuery.toLowerCase());
      
      // Filtro por estado e cidade
      const matchesState = !this.selectedState || (campaign.location?.includes(this.selectedState) ?? false);
      const matchesCity = !this.selectedCity || (campaign.location?.includes(this.selectedCity) ?? false);
      
      return matchesCategory && matchesUrgency && matchesSearch && matchesState && matchesCity;
    });
  }

  onStateChange() {
    this.selectedCity = '';
    if (this.selectedState) {
      this.cities = getCitiesByState(this.selectedState);
    } else {
      this.cities = [];
    }
    this.applyFilters();
  }

  clearFilters() {
    this.selectedCategory = '';
    this.selectedUrgency = '';
    this.searchQuery = '';
    this.selectedState = '';
    this.selectedCity = '';
    this.cities = [];
    this.applyFilters();
  }

  getProgress(campaign: Campaign): number {
    return (campaign.current / campaign.goal) * 100;
  }

  getUrgencyColor(urgency: string | undefined): string {
    switch(urgency) {
      case 'high': return '#E74C3C';
      case 'medium': return '#F39C12';
      case 'low': return '#2ECC71';
      default: return '#F39C12'; // default to medium
    }
  }

  // === REVIEWS / RATINGS ===
  getCampaignRating(campaignId: number): number {
    try {
      const stats = this.reviewsService.getReviewStats(campaignId);
      return stats ? stats.averageRating : 0;
    } catch (e) {
      this.logger.error('Error fetching review stats', e);
      return 0;
    }
  }

  getCampaignReviewCount(campaignId: number): number {
    try {
      const stats = this.reviewsService.getReviewStats(campaignId);
      return stats ? stats.totalReviews : 0;
    } catch (e) {
      this.logger.error('Error fetching review count', e);
      return 0;
    }
  }

  donate(campaignId: number) {
    alert('Funcionalidade de doação em desenvolvimento');
  }

  volunteer(index: number) {
    if (this.volunteerOpportunities[index]) {
      this.openVolunteerRegistrationModal(this.volunteerOpportunities[index]);
    }
  }

  // === VOLUNTEER METHODS ===

  openVolunteerRegistrationModal(opportunity: VolunteerOpportunity) {
    const currentUserEmail = sessionStorage.getItem('user-email') || '';
    
    // Verifica se já está inscrito
    if (this.volunteerService.isVolunteerRegistered(opportunity.id, currentUserEmail)) {
      alert('⚠️ Você já está inscrito nesta oportunidade de voluntariado!');
      return;
    }

    // Verifica se há vagas
    if (opportunity.currentVolunteers >= opportunity.vacancies) {
      alert('😔 Desculpe, as vagas para esta oportunidade já foram preenchidas.');
      return;
    }

    this.selectedOpportunity = opportunity;
    this.volunteerRegistrationForm.reset();
    this.isVolunteerRegistrationModalOpen = true;
  }

  closeVolunteerRegistrationModal() {
    this.isVolunteerRegistrationModalOpen = false;
    this.selectedOpportunity = null;
    this.volunteerRegistrationForm.reset();
  }

  submitVolunteerRegistration() {
    if (this.volunteerRegistrationForm.valid && this.selectedOpportunity) {
      const formValue = this.volunteerRegistrationForm.value;
      const currentUserEmail = sessionStorage.getItem('user-email') || '';

      const registration = this.volunteerService.createRegistration({
        opportunityId: this.selectedOpportunity.id,
        volunteerEmail: currentUserEmail,
        volunteerName: formValue.name,
        phone: formValue.phone,
        message: formValue.message || '',
        status: 'pending'
      });

      if (registration) {
        // Criar chat automaticamente com a ONG
        this.createChatWithOng(this.selectedOpportunity, 'voluntariado');
        
        alert(`✅ Inscrição realizada com sucesso!\n\nVocê se inscreveu para "${this.selectedOpportunity.title}"\n\nA ONG "${this.selectedOpportunity.ongName}" entrará em contato para confirmar sua participação.\n\n💬 Um chat foi iniciado com a ONG para você coordenar os detalhes. Acesse o menu "Chat" para conversar.`);
        
        this.myContributions.volunteerHours += 4; // Estimativa
        this.closeVolunteerRegistrationModal();
        this.loadVolunteerOpportunities(); // Atualiza a lista
      } else {
        alert('❌ Não foi possível realizar a inscrição. Tente novamente.');
      }
    }
  }

  getAvailableSpots(opportunity: VolunteerOpportunity): number {
    return opportunity.vacancies - opportunity.currentVolunteers;
  }

  // Modal de Detalhes da Campanha
  openDetailsModal(campaign: Campaign) {
    this.selectedCampaign = campaign;
    this.isDetailsModalOpen = true;
  }

  closeDetailsModal() {
    this.isDetailsModalOpen = false;
    this.selectedCampaign = null;
  }

  // === GAMIFICATION ===
  loadGamificationData() {
    const userEmail = sessionStorage.getItem('user-email') || 'user@example.com';
    this.userGamification = this.gamificationService.getUserGamification(userEmail);
    this.userBadgesDisplay = this.gamificationService.getUserBadges(userEmail);
  }

  getLevelProgress(): number {
    if (!this.userGamification) return 0;
    const currentLevelMin = Math.pow(this.userGamification.level - 1, 2) * 50;
    const nextLevelMin = Math.pow(this.userGamification.level, 2) * 50;
    const pointsInCurrentLevel = this.userGamification.points - currentLevelMin;
    const pointsNeededForLevel = nextLevelMin - currentLevelMin;
    return (pointsInCurrentLevel / pointsNeededForLevel) * 100;
  }

  getPointsToNextLevel(): number {
    if (!this.userGamification) return 0;
    const nextLevelMin = Math.pow(this.userGamification.level, 2) * 50;
    return Math.max(0, nextLevelMin - this.userGamification.points);
  }

  getUnlockedBadgesCount(): number {
    return this.userBadgesDisplay.filter(item => item.achievement !== null).length;
  }

  getTotalBadgesCount(): number {
    return this.userBadgesDisplay.length;
  }

  // Criar chat automaticamente com a ONG
  createChatWithOng(item: Campaign | VolunteerOpportunity, type: 'doação' | 'voluntariado') {
    const currentUserEmail = sessionStorage.getItem('user-email') || '';
    const currentUserName = sessionStorage.getItem('username') || 'Usuário';
    
    // Determinar o email e nome da ONG (simplificado - na prática viria do banco)
    const ongEmail = 'ong@somar.com'; // Email padrão da ONG
    const ongName = 'ongName' in item ? item.ongName : 'ONG';
    
    // Verificar se já existe uma conversa entre o usuário e a ONG
    const existingConversations = this.chatService.getUserConversations(currentUserEmail);
    let conversation = existingConversations.find(c => 
      c.participants.includes(ongEmail) && c.participants.includes(currentUserEmail)
    );
    
    // Se não existe, criar nova conversa
    if (!conversation) {
      const participantNames = new Map<string, string>([
        [currentUserEmail, currentUserName],
        [ongEmail, ongName]
      ]);
      
      conversation = this.chatService.createConversation(
        [currentUserEmail, ongEmail],
        participantNames
      );
    }
    
    // Enviar mensagem inicial automática
    const itemTitle = 'title' in item ? item.title : '';
    const message = type === 'doação' 
      ? `Olá! Acabei de realizar uma doação para a campanha "${itemTitle}". Gostaria de coordenar os detalhes da entrega.`
      : `Olá! Acabei de me inscrever como voluntário em "${itemTitle}". Estou à disposição para mais informações.`;
    
    this.chatService.sendMessage(
      conversation.id,
      currentUserEmail,
      currentUserName,
      message
    );
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/']);
  }
}
