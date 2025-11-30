import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { CampaignsService, Campaign } from '../../features/campaigns/services/campaigns.service';
import { VolunteerService, VolunteerOpportunity } from '../../features/volunteers/services/volunteer.service';
import { ThemeLanguageToggle } from '../../shared/components/theme-language-toggle/theme-language-toggle';

@Component({
  selector: 'app-overview',
  imports: [CommonModule, RouterModule, ThemeLanguageToggle],
  templateUrl: './overview.html',
  styleUrl: './overview.scss'
})
export class Overview implements OnInit {
  title = 'Visão Geral';
  userType: string = '';
  userName: string = '';
  userEmail: string = '';

  // Métricas
  totalCampaigns: number = 0;
  activeCampaigns: number = 0;
  totalVolunteerOpportunities: number = 0;
  totalDonations: number = 0;
  totalVolunteerHours: number = 0;

  // Listas resumidas
  recentCampaigns: Campaign[] = [];
  recentOpportunities: VolunteerOpportunity[] = [];

  constructor(
    private router: Router,
    private campaignsService: CampaignsService,
    private volunteerService: VolunteerService
  ) {}

  ngOnInit() {
    this.userType = sessionStorage.getItem('user-type') || '';
    this.userName = sessionStorage.getItem('username') || '';
    this.userEmail = sessionStorage.getItem('user-email') || '';

    this.loadMetrics();
  }

  loadMetrics() {
    const isAdmin = this.userEmail === 'admin@somar.com';
    
    if (this.userType === 'ong' || isAdmin) {
      // Métricas da ONG ou Admin (admin vê tudo)
      const ongCampaigns = this.campaignsService.getCampaignsByOng(this.userEmail);
      this.totalCampaigns = ongCampaigns.length;
      this.activeCampaigns = ongCampaigns.filter(c => c.status === 'active').length;
      this.recentCampaigns = ongCampaigns.slice(0, 3);

      const ongOpportunities = this.volunteerService.getOpportunitiesByOng(this.userEmail);
      this.totalVolunteerOpportunities = ongOpportunities.length;
      this.recentOpportunities = ongOpportunities.slice(0, 3);

      // Calcular total de doações recebidas
      this.totalDonations = ongCampaigns.reduce((sum, campaign) => 
        sum + (campaign.donations?.length || 0), 0
      );
      
      // Admin também vê horas de voluntariado total
      if (isAdmin) {
        this.totalVolunteerHours = this.getTotalVolunteerHours();
      }
    } else {
      // Métricas do Doador
      const allCampaigns = this.campaignsService.getActiveCampaigns();
      this.totalCampaigns = allCampaigns.length;
      this.recentCampaigns = allCampaigns.slice(0, 3);

      const opportunities = this.volunteerService.getOpenOpportunities();
      this.totalVolunteerOpportunities = opportunities.length;
      this.recentOpportunities = opportunities.slice(0, 3);

      // Calcular doações do usuário
      this.totalDonations = this.getUserDonationsCount();
      this.totalVolunteerHours = this.getUserVolunteerHours();
    }
  }

  getTotalVolunteerHours(): number {
    // Calcula total de horas de todos os voluntários confirmados
    const allRegistrations = this.volunteerService.getAllRegistrations();
    return allRegistrations.filter((r: any) => r.status === 'confirmed').length * 4;
  }

  getUserDonationsCount(): number {
    const allCampaigns = this.campaignsService.getAllCampaigns();
    let count = 0;
    allCampaigns.forEach(campaign => {
      if (campaign.donations) {
        count += campaign.donations.filter(d => d.donorEmail === this.userEmail).length;
      }
    });
    return count;
  }

  getUserVolunteerHours(): number {
    const registrations = this.volunteerService.getUserRegistrations(this.userEmail);
    return registrations.filter(r => r.status === 'confirmed').length * 4; // 4h por atividade
  }

  getProgressPercentage(campaign: Campaign): number {
    if (!campaign.meta || campaign.meta === 0) return 0;
    return Math.min(Math.round((campaign.current || 0 / campaign.meta) * 100), 100);
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
