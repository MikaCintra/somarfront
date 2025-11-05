import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalyticsService, AnalyticsMetrics, CategoryMetrics, TimeSeriesData, TopDonor, CampaignPerformance } from '../../features/analytics/services/analytics.service';
import { ThemeLanguageToggle } from '../../shared/components/theme-language-toggle/theme-language-toggle';
import { MOCK_DONORS, DONORS_STATS, DONORS_BY_STATE, POPULAR_INTERESTS } from '../../shared/data/mock-donors.data';
import { DonorProfile } from '../../shared/models/user.interface';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CommonModule, ThemeLanguageToggle],
  templateUrl: '../../features/analytics/pages/analytics/analytics.html',
  styleUrls: ['../../features/analytics/pages/analytics/analytics.scss']
})
export class AnalyticsComponent implements OnInit {
  metrics: AnalyticsMetrics | null = null;
  categoryMetrics: CategoryMetrics[] = [];
  timeSeriesData: TimeSeriesData[] = [];
  topDonors: TopDonor[] = [];
  campaignPerformance: CampaignPerformance[] = [];
  
  selectedPeriod: number = 30;
  userEmail: string = '';
  userType: string = '';
  
  // Dados para gráficos simplificados (sem biblioteca externa)
  maxDonationsInPeriod: number = 0;
  maxVolunteersInPeriod: number = 0;

  // Dados de doadores reais
  allDonors: DonorProfile[] = MOCK_DONORS;
  donorsStats = DONORS_STATS;
  donorsByState = DONORS_BY_STATE;
  popularInterests = POPULAR_INTERESTS;
  
  // Top doadores ordenados por total de doações
  topRealDonors = MOCK_DONORS
    .sort((a, b) => b.totalDonations - a.totalDonations)
    .slice(0, 10);

  constructor(private analyticsService: AnalyticsService) {}

  ngOnInit() {
    this.userEmail = sessionStorage.getItem('user-email') || '';
    this.userType = sessionStorage.getItem('user-type') || '';
    this.loadAnalytics();
  }

  loadAnalytics() {
    const ongEmail = this.userType === 'ong' ? this.userEmail : undefined;
    
    this.metrics = this.analyticsService.getOverallMetrics(ongEmail);
    this.categoryMetrics = this.analyticsService.getCategoryMetrics(ongEmail);
    this.timeSeriesData = this.analyticsService.getTimeSeriesData(this.selectedPeriod, ongEmail);
    this.topDonors = this.analyticsService.getTopDonors(10, ongEmail);
    this.campaignPerformance = this.analyticsService.getCampaignPerformance(ongEmail);
    
    // Calcular valores máximos para normalização dos gráficos
    this.maxDonationsInPeriod = Math.max(...this.timeSeriesData.map(d => d.donations), 1);
    this.maxVolunteersInPeriod = Math.max(...this.timeSeriesData.map(d => d.volunteers), 1);
  }

  changePeriod(days: number) {
    this.selectedPeriod = days;
    this.loadAnalytics();
  }

  getBarHeight(value: number, max: number): number {
    return (value / max) * 100;
  }

  getImpactLevel(): string {
    if (!this.metrics) return 'baixo';
    if (this.metrics.impactScore >= 75) return 'alto';
    if (this.metrics.impactScore >= 40) return 'médio';
    return 'baixo';
  }

  getGrowthClass(): string {
    if (!this.metrics) return 'neutral';
    if (this.metrics.growthRate > 0) return 'positive';
    if (this.metrics.growthRate < 0) return 'negative';
    return 'neutral';
  }

  downloadReport() {
    const ongEmail = this.userType === 'ong' ? this.userEmail : undefined;
    this.analyticsService.downloadCSV(ongEmail);
  }

  formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    return `${date.getDate()}/${date.getMonth() + 1}`;
  }

  getStatusLabel(status: string): string {
    const labels: { [key: string]: string } = {
      'excellent': 'Excelente',
      'good': 'Boa',
      'needs-attention': 'Precisa Atenção'
    };
    return labels[status] || status;
  }

  getDonorInitials(name: string): string {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  }

  // Métodos para trabalhar com dados reais de doadores
  getTotalActiveDonors(): number {
    return this.allDonors.filter(d => d.isActive).length;
  }

  getAverageDonationsPerDonor(): number {
    return Math.round(this.donorsStats.averageDonationsPerDonor);
  }

  getTopDonorsByHours() {
    return this.allDonors
      .sort((a, b) => b.totalVolunteerHours - a.totalVolunteerHours)
      .slice(0, 5);
  }

  getDonorLevelDistribution() {
    const distribution: { [key: string]: number } = {
      'Iniciante (1-3)': 0,
      'Intermediário (4-7)': 0,
      'Avançado (8-10)': 0,
      'Expert (11+)': 0
    };

    this.allDonors.forEach(donor => {
      if (donor.level <= 3) distribution['Iniciante (1-3)']++;
      else if (donor.level <= 7) distribution['Intermediário (4-7)']++;
      else if (donor.level <= 10) distribution['Avançado (8-10)']++;
      else distribution['Expert (11+)']++;
    });

    return distribution;
  }
}
