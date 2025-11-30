import { Injectable } from '@angular/core';
import { CampaignsService, Campaign, Donation } from '../../campaigns/services/campaigns.service';
import { VolunteerService, VolunteerRegistration } from '../../volunteers/services/volunteer.service';

export interface AnalyticsMetrics {
  totalDonations: number;
  totalDonors: number;
  totalItems: number;
  totalCampaigns: number;
  activeCampaigns: number;
  totalVolunteers: number;
  impactScore: number;
  growthRate: number;
}

export interface CategoryMetrics {
  category: string;
  count: number;
  percentage: number;
  items: number;
}

export interface TimeSeriesData {
  date: string;
  donations: number;
  volunteers: number;
  campaigns: number;
}

export interface TopDonor {
  name: string;
  email: string;
  totalDonations: number;
  totalItems: number;
}

export interface CampaignPerformance {
  id: number;
  title: string;
  donationsCount: number;
  progress: number;
  status: 'excellent' | 'good' | 'needs-attention';
}

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  constructor(
    private campaignsService: CampaignsService,
    private volunteerService: VolunteerService
  ) { }

  getOverallMetrics(ongEmail?: string): AnalyticsMetrics {
    const campaigns = ongEmail 
      ? this.campaignsService.getCampaignsByOng(ongEmail)
      : this.campaignsService.getAllCampaigns();
    
    const allDonations = campaigns.flatMap(c => c.donations || []);
    const uniqueDonors = new Set(allDonations.map(d => d.donorEmail));
    const totalItems = allDonations.reduce((sum, d) => sum + d.quantity, 0);
    
    const activeCampaigns = campaigns.filter(c => c.status === 'active').length;
    
    const allRegistrations = this.volunteerService.getAllRegistrations();
    const relevantRegistrations = ongEmail
      ? allRegistrations.filter(r => {
          const opp = this.volunteerService.getOpportunityById(r.opportunityId);
          return opp?.ongEmail === ongEmail;
        })
      : allRegistrations;
    
    // Calcular taxa de crescimento (últimos 30 dias vs 30 dias anteriores)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const sixtyDaysAgo = new Date();
    sixtyDaysAgo.setDate(sixtyDaysAgo.getDate() - 60);
    
    const recentDonations = allDonations.filter(d => new Date(d.date) >= thirtyDaysAgo).length;
    const previousDonations = allDonations.filter(d => {
      const date = new Date(d.date);
      return date >= sixtyDaysAgo && date < thirtyDaysAgo;
    }).length;
    
    const growthRate = previousDonations > 0 
      ? ((recentDonations - previousDonations) / previousDonations) * 100 
      : 0;
    
    // Calcular score de impacto (0-100)
    const impactScore = Math.min(100, Math.round(
      (totalItems * 0.4) + 
      (uniqueDonors.size * 0.3) + 
      (relevantRegistrations.length * 0.2) + 
      (activeCampaigns * 0.1)
    ));
    
    return {
      totalDonations: allDonations.length,
      totalDonors: uniqueDonors.size,
      totalItems,
      totalCampaigns: campaigns.length,
      activeCampaigns,
      totalVolunteers: relevantRegistrations.length,
      impactScore,
      growthRate: Math.round(growthRate)
    };
  }

  getCategoryMetrics(ongEmail?: string): CategoryMetrics[] {
    const campaigns = ongEmail 
      ? this.campaignsService.getCampaignsByOng(ongEmail)
      : this.campaignsService.getAllCampaigns();
    
    const categoryMap = new Map<string, { count: number; items: number }>();
    
    campaigns.forEach(campaign => {
      const category = campaign.category;
      const donations = campaign.donations || [];
      const items = donations.reduce((sum, d) => sum + d.quantity, 0);
      
      if (categoryMap.has(category || '')) {
        const current = categoryMap.get(category || '')!;
        categoryMap.set(category || '', {
          count: current.count + donations.length,
          items: current.items + items
        });
      } else {
        categoryMap.set(category || '', { count: donations.length, items });
      }
    });
    
    const totalDonations = Array.from(categoryMap.values()).reduce((sum, v) => sum + v.count, 0);
    
    return Array.from(categoryMap.entries()).map(([category, data]) => ({
      category,
      count: data.count,
      items: data.items,
      percentage: totalDonations > 0 ? Math.round((data.count / totalDonations) * 100) : 0
    })).sort((a, b) => b.count - a.count);
  }

  getTimeSeriesData(days: number = 30, ongEmail?: string): TimeSeriesData[] {
    const campaigns = ongEmail 
      ? this.campaignsService.getCampaignsByOng(ongEmail)
      : this.campaignsService.getAllCampaigns();
    
    const allDonations = campaigns.flatMap(c => c.donations || []);
    const allRegistrations = this.volunteerService.getAllRegistrations();
    
    const data: TimeSeriesData[] = [];
    const today = new Date();
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      const donations = allDonations.filter(d => {
        const donationDate = new Date(d.date).toISOString().split('T')[0];
        return donationDate === dateStr;
      }).length;
      
      const volunteers = allRegistrations.filter(r => {
        const regDate = new Date(r.registeredAt).toISOString().split('T')[0];
        return regDate === dateStr;
      }).length;
      
      const campaignsCreated = campaigns.filter(c => {
        const createdDate = new Date(c.createdAt).toISOString().split('T')[0];
        return createdDate === dateStr;
      }).length;
      
      data.push({
        date: dateStr,
        donations,
        volunteers,
        campaigns: campaignsCreated
      });
    }
    
    return data;
  }

  getTopDonors(limit: number = 10, ongEmail?: string): TopDonor[] {
    const campaigns = ongEmail 
      ? this.campaignsService.getCampaignsByOng(ongEmail)
      : this.campaignsService.getAllCampaigns();
    
    const allDonations = campaigns.flatMap(c => c.donations || []);
    
    const donorMap = new Map<string, { name: string; count: number; items: number }>();
    
    allDonations.forEach(donation => {
      if (donorMap.has(donation.donorEmail)) {
        const current = donorMap.get(donation.donorEmail)!;
        donorMap.set(donation.donorEmail, {
          name: donation.donorName,
          count: current.count + 1,
          items: current.items + donation.quantity
        });
      } else {
        donorMap.set(donation.donorEmail, {
          name: donation.donorName,
          count: 1,
          items: donation.quantity
        });
      }
    });
    
    return Array.from(donorMap.entries())
      .map(([email, data]) => ({
        email,
        name: data.name,
        totalDonations: data.count,
        totalItems: data.items
      }))
      .sort((a, b) => b.totalDonations - a.totalDonations)
      .slice(0, limit);
  }

  getCampaignPerformance(ongEmail?: string): CampaignPerformance[] {
    const campaigns = ongEmail 
      ? this.campaignsService.getCampaignsByOng(ongEmail)
      : this.campaignsService.getAllCampaigns();
    
    return campaigns.map(campaign => {
      const donationsCount = campaign.donations?.length || 0;
      const progress = campaign.meta > 0 
        ? Math.round((campaign.current || 0/ campaign.meta) * 100) 
        : 0;
      
      let status: 'excellent' | 'good' | 'needs-attention';
      if (progress >= 75) status = 'excellent';
      else if (progress >= 40) status = 'good';
      else status = 'needs-attention';
      
      return {
        id: campaign.id,
        title: campaign.titulo,
        donationsCount,
        progress,
        status
      };
    }).sort((a, b) => b.progress - a.progress);
  }

  exportMetricsToCSV(ongEmail?: string): string {
    const metrics = this.getOverallMetrics(ongEmail);
    const categories = this.getCategoryMetrics(ongEmail);
    const topDonors = this.getTopDonors(10, ongEmail);
    
    let csv = 'RELATÓRIO DE ANALYTICS - SOMAR\n\n';
    csv += 'MÉTRICAS GERAIS\n';
    csv += `Total de Doações,${metrics.totalDonations}\n`;
    csv += `Total de Doadores,${metrics.totalDonors}\n`;
    csv += `Total de Itens,${metrics.totalItems}\n`;
    csv += `Total de Campanhas,${metrics.totalCampaigns}\n`;
    csv += `Campanhas Ativas,${metrics.activeCampaigns}\n`;
    csv += `Total de Voluntários,${metrics.totalVolunteers}\n`;
    csv += `Score de Impacto,${metrics.impactScore}\n`;
    csv += `Taxa de Crescimento,${metrics.growthRate}%\n\n`;
    
    csv += 'MÉTRICAS POR CATEGORIA\n';
    csv += 'Categoria,Doações,Itens,Porcentagem\n';
    categories.forEach(cat => {
      csv += `${cat.category},${cat.count},${cat.items},${cat.percentage}%\n`;
    });
    
    csv += '\nTOP DOADORES\n';
    csv += 'Nome,Email,Total Doações,Total Itens\n';
    topDonors.forEach(donor => {
      csv += `${donor.name},${donor.email},${donor.totalDonations},${donor.totalItems}\n`;
    });
    
    return csv;
  }

  downloadCSV(ongEmail?: string) {
    const csv = this.exportMetricsToCSV(ongEmail);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `analytics-report-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
