import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CampaignsService, Campaign, Donation } from '../../../campaigns/services/campaigns.service';
import { ThemeLanguageToggle } from '../../../../shared/components/theme-language-toggle/theme-language-toggle';

@Component({
  selector: 'app-doacoes',
  imports: [CommonModule, RouterModule, FormsModule, ThemeLanguageToggle],
  templateUrl: './doacoes.html',
  styleUrl: './doacoes.scss'
})
export class Doacoes implements OnInit {
  title = 'Doações';
  userType: string = '';
  userEmail: string = '';
  userName: string = '';

  allCampaigns: Campaign[] = [];
  myDonations: Donation[] = [];
  donationsWithCampaign: Array<{donation: Donation, campaign: Campaign}> = [];

  searchQuery = '';
  selectedCategory = '';

  categories = ['Roupas', 'Alimentos', 'Educação', 'Móveis', 'Brinquedos', 'Higiene', 'Outros'];

  // Estatísticas
  totalDonations = 0;
  totalItems = 0;
  categoriesCount: {[key: string]: number} = {};
  Object = Object; // Para usar Object.keys no template

  constructor(
    public router: Router,
    private campaignsService: CampaignsService
  ) {}

  ngOnInit() {
    this.userType = sessionStorage.getItem('user-type') || '';
    this.userEmail = sessionStorage.getItem('user-email') || '';
    this.userName = sessionStorage.getItem('username') || '';
    this.loadDonations();
  }

  loadDonations() {
    this.allCampaigns = this.campaignsService.getAllCampaigns();
    const isAdmin = this.userEmail === 'admin@somar.com';

    if (this.userType === 'ong' || isAdmin) {
      // ONG vê doações em suas campanhas, Admin vê todas
      const campaigns = isAdmin 
        ? this.allCampaigns 
        : this.campaignsService.getCampaignsByOng(this.userEmail);
        
      campaigns.forEach(campaign => {
        if (campaign.donations) {
          campaign.donations.forEach(donation => {
            this.donationsWithCampaign.push({ donation, campaign });
          });
        }
      });
    } else {
      // Doador vê suas próprias doações
      this.allCampaigns.forEach(campaign => {
        if (campaign.donations) {
          campaign.donations
            .filter(d => d.donorEmail === this.userEmail)
            .forEach(donation => {
              this.donationsWithCampaign.push({ donation, campaign });
            });
        }
      });
    }

    // Ordenar por data mais recente
    this.donationsWithCampaign.sort((a, b) => 
      new Date(b.donation.date).getTime() - new Date(a.donation.date).getTime()
    );

    this.calculateStatistics();
  }

  calculateStatistics() {
    this.totalDonations = this.donationsWithCampaign.length;
    this.totalItems = this.donationsWithCampaign.reduce((sum, item) => 
      sum + item.donation.quantity, 0
    );

    // Contar por categoria
    this.categoriesCount = {};
    this.donationsWithCampaign.forEach(item => {
      const category = item.campaign.category;
      this.categoriesCount[category] = (this.categoriesCount[category] || 0) + 1;
    });
  }

  getFilteredDonations() {
    return this.donationsWithCampaign.filter(item => {
      const matchesSearch = !this.searchQuery ||
        item.donation.item.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        item.campaign.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        item.donation.donorName.toLowerCase().includes(this.searchQuery.toLowerCase());

      const matchesCategory = !this.selectedCategory || 
        item.campaign.category === this.selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }

  clearFilters() {
    this.searchQuery = '';
    this.selectedCategory = '';
  }

  getCategoryPercentage(category: string): number {
    if (this.totalDonations === 0) return 0;
    return Math.round((this.categoriesCount[category] / this.totalDonations) * 100);
  }

  getTopCategories() {
    return Object.entries(this.categoriesCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
  }
}
