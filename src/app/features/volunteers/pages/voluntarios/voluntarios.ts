import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { VolunteerService, VolunteerOpportunity, VolunteerRegistration } from '../../services/volunteer.service';
import { ThemeLanguageToggle } from '../../../../shared/components/theme-language-toggle/theme-language-toggle';

@Component({
  selector: 'app-voluntarios',
  imports: [CommonModule, RouterModule, FormsModule, ThemeLanguageToggle],
  templateUrl: './voluntarios.html',
  styleUrl: './voluntarios.scss'
})
export class Voluntarios implements OnInit {
  title = 'Voluntários';
  userType: string = '';
  userEmail: string = '';
  userName: string = '';

  allOpportunities: VolunteerOpportunity[] = [];
  filteredOpportunities: VolunteerOpportunity[] = [];
  myRegistrations: VolunteerRegistration[] = [];

  searchQuery = '';
  selectedCategory = '';
  selectedStatus = '';

  categories = ['Alimentos', 'Educação', 'Saúde', 'Eventos', 'Meio Ambiente', 'Esportes', 'Outros'];

  constructor(
    private router: Router,
    private volunteerService: VolunteerService
  ) {}

  ngOnInit() {
    this.userType = sessionStorage.getItem('user-type') || '';
    this.userEmail = sessionStorage.getItem('user-email') || '';
    this.userName = sessionStorage.getItem('username') || '';
    this.loadOpportunities();
  }

  loadOpportunities() {
    const isAdmin = this.userEmail === 'admin@somar.com';
    
    if (this.userType === 'ong' || isAdmin) {
      // ONG ou Admin vê suas oportunidades (admin vê todas)
      this.allOpportunities = this.volunteerService.getOpportunitiesByOng(this.userEmail);
    } else {
      // Doador vê apenas oportunidades abertas
      this.allOpportunities = this.volunteerService.getOpenOpportunities();
      this.myRegistrations = this.volunteerService.getUserRegistrations(this.userEmail);
    }
    this.filteredOpportunities = [...this.allOpportunities];
  }

  applyFilters() {
    this.filteredOpportunities = this.allOpportunities.filter(opp => {
      const matchesSearch = !this.searchQuery || 
        opp.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        opp.description.toLowerCase().includes(this.searchQuery.toLowerCase());
      
      const matchesCategory = !this.selectedCategory || opp.category === this.selectedCategory;
      const matchesStatus = !this.selectedStatus || opp.status === this.selectedStatus;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }

  clearFilters() {
    this.searchQuery = '';
    this.selectedCategory = '';
    this.selectedStatus = '';
    this.applyFilters();
  }

  getStatusLabel(status: string): string {
    switch(status) {
      case 'open': return 'Aberta';
      case 'full': return 'Completa';
      case 'closed': return 'Fechada';
      default: return status;
    }
  }

  getStatusColor(status: string): string {
    switch(status) {
      case 'open': return '#27ae60';
      case 'full': return '#f39c12';
      case 'closed': return '#95a5a6';
      default: return '#95a5a6';
    }
  }

  getRegistrationStatus(oppId: number): string {
    const registration = this.myRegistrations.find(r => r.opportunityId === oppId);
    if (!registration) return '';
    
    switch(registration.status) {
      case 'pending': return 'Pendente';
      case 'confirmed': return 'Confirmado';
      case 'cancelled': return 'Cancelado';
      default: return registration.status;
    }
  }

  isRegistered(oppId: number): boolean {
    return this.myRegistrations.some(r => 
      r.opportunityId === oppId && r.status !== 'cancelled'
    );
  }

  getVacanciesInfo(opp: VolunteerOpportunity): string {
    const available = opp.vacancies - opp.currentVolunteers;
    return `${available} de ${opp.vacancies} vagas`;
  }

  viewDetails(opp: VolunteerOpportunity) {
    console.log('Ver detalhes:', opp);
    // Futura implementação de modal de detalhes
  }
}
