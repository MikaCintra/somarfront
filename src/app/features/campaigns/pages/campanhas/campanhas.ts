import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CampaignsApiService, Campaign } from '../../services/campaigns-api.service';
import { ThemeLanguageToggle } from '../../../../shared/components/theme-language-toggle/theme-language-toggle';

@Component({
  selector: 'app-campanhas',
  imports: [CommonModule, RouterModule, FormsModule, ThemeLanguageToggle],
  templateUrl: './campanhas.html',
  styleUrl: './campanhas.scss'
})
export class Campanhas implements OnInit {
  title = 'Campanhas';
  userType: string = '';
  userEmail: string = '';

  allCampaigns: Campaign[] = [];
  filteredCampaigns: Campaign[] = [];

  searchQuery = '';
  selectedCategory = '';
  selectedStatus = '';
  selectedUrgency = '';

  categories = ['Roupas', 'Alimentos', 'Educação', 'Móveis', 'Brinquedos', 'Higiene', 'Outros'];

  constructor(
    private router: Router,
    private campaignsService: CampaignsApiService
  ) {}

  ngOnInit() {
    this.userType = sessionStorage.getItem('user-type') || '';
    this.userEmail = sessionStorage.getItem('user-email') || '';
    this.loadCampaigns();
  }

  loadCampaigns() {
    const isAdmin = this.userEmail === 'admin@somar.com';
    
    if (this.userType === 'ong' || isAdmin) {
      // ONG ou Admin vê suas campanhas (admin vê todas)
      this.campaignsService.getCampaignsByOng(this.userEmail).subscribe(campaigns => {
        this.allCampaigns = campaigns;
        this.filteredCampaigns = [...this.allCampaigns];
      });
    } else {
      // Doador vê apenas campanhas ativas
      this.campaignsService.getAllCampaigns().subscribe(campaigns => {
        this.allCampaigns = campaigns;
        this.filteredCampaigns = [...this.allCampaigns];
      });
    }
  }

  applyFilters() {
    this.filteredCampaigns = this.allCampaigns.filter(campaign => {
      const matchesSearch = !this.searchQuery || 
        campaign.titulo.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        campaign.descricao.toLowerCase().includes(this.searchQuery.toLowerCase());
      
      const matchesCategory = !this.selectedCategory || campaign.category === this.selectedCategory;
      const matchesStatus = !this.selectedStatus || campaign.status === this.selectedStatus;
      const matchesUrgency = !this.selectedUrgency || campaign.urgency === this.selectedUrgency;

      return matchesSearch && matchesCategory && matchesStatus && matchesUrgency;
    });
  }

  clearFilters() {
    this.searchQuery = '';
    this.selectedCategory = '';
    this.selectedStatus = '';
    this.selectedUrgency = '';
    this.applyFilters();
  }

  getProgressPercentage(campaign: Campaign): number {
    if (!campaign.meta || campaign.meta === 0) return 0;
    return Math.min(Math.round((campaign.current || 0 / campaign.meta) * 100), 100);
  }

  getUrgencyColor(urgency?: string): string {
    switch(urgency) {
      case 'high': return '#e74c3c';
      case 'medium': return '#f39c12';
      case 'low': return '#3498db';
      default: return '#95a5a6';
    }
  }

  getUrgencyLabel(urgency?: string): string {
    switch(urgency) {
      case 'high': return 'Urgente';
      case 'medium': return 'Importante';
      case 'low': return 'Normal';
      default: return 'Indefinida';
    }
  }

  getStatusLabel(status: string): string {
    switch(status) {
      case 'active': return 'Ativa';
      case 'paused': return 'Pausada';
      case 'completed': return 'Concluída';
      default: return status;
    }
  }

  viewCampaign(campaign: Campaign) {
    // Futura implementação do modal de detalhes
    console.log('Ver detalhes da campanha:', campaign);
  }
}
