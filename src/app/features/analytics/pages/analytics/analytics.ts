import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalyticsService, AnalyticsMetrics, CategoryMetrics, TimeSeriesData, TopDonor, CampaignPerformance } from '../../services/analytics.service';
import { ThemeLanguageToggle } from '../../../../shared/components/theme-language-toggle/theme-language-toggle';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CommonModule, ThemeLanguageToggle],
  templateUrl: './analytics.html',
  styleUrls: ['./analytics.scss']
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
}
