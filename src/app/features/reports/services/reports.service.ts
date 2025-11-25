import { Injectable } from '@angular/core';
import { AnalyticsService } from '../../analytics/services/analytics.service';
import { CampaignsService } from '../../campaigns/services/campaigns.service';
import { VolunteerService } from '../../volunteers/services/volunteer.service';

export interface ReportConfig {
  id: number;
  name: string;
  type: 'daily' | 'weekly' | 'monthly' | 'custom';
  format: 'csv' | 'pdf' | 'excel';
  recipients: string[];
  includeMetrics: boolean;
  includeCampaigns: boolean;
  includeVolunteers: boolean;
  includeDonations: boolean;
  active: boolean;
  lastGenerated?: Date;
  nextGeneration?: Date;
}

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  private storageKey = 'somar-report-configs';

  constructor(
    private analyticsService: AnalyticsService,
    private campaignsService: CampaignsService,
    private volunteerService: VolunteerService
  ) {}

  private getAllConfigs(): ReportConfig[] {
    const data = sessionStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  private saveConfigs(configs: ReportConfig[]) {
    sessionStorage.setItem(this.storageKey, JSON.stringify(configs));
  }

  getReportConfigs(ongEmail?: string): ReportConfig[] {
    // TODO: Filtrar por ONG quando implementar no backend
    return this.getAllConfigs();
  }

  createReportConfig(config: Omit<ReportConfig, 'id' | 'lastGenerated' | 'nextGeneration'>): ReportConfig {
    const configs = this.getAllConfigs();
    const newConfig: ReportConfig = {
      ...config,
      id: configs.length > 0 ? Math.max(...configs.map(c => c.id)) + 1 : 1,
      nextGeneration: this.calculateNextGeneration(config.type)
    };
    configs.push(newConfig);
    this.saveConfigs(configs);
    return newConfig;
  }

  updateReportConfig(id: number, updates: Partial<ReportConfig>) {
    const configs = this.getAllConfigs();
    const index = configs.findIndex(c => c.id === id);
    if (index !== -1) {
      configs[index] = { ...configs[index], ...updates };
      if (updates.type) {
        configs[index].nextGeneration = this.calculateNextGeneration(updates.type);
      }
      this.saveConfigs(configs);
    }
  }

  deleteReportConfig(id: number) {
    const configs = this.getAllConfigs().filter(c => c.id !== id);
    this.saveConfigs(configs);
  }

  private calculateNextGeneration(type: ReportConfig['type']): Date {
    const now = new Date();
    const next = new Date(now);

    switch (type) {
      case 'daily':
        next.setDate(next.getDate() + 1);
        next.setHours(8, 0, 0, 0);
        break;
      case 'weekly':
        next.setDate(next.getDate() + (7 - next.getDay())); // Próxima segunda
        next.setHours(8, 0, 0, 0);
        break;
      case 'monthly':
        next.setMonth(next.getMonth() + 1, 1);
        next.setHours(8, 0, 0, 0);
        break;
      case 'custom':
        next.setDate(next.getDate() + 7); // Default 7 dias
        break;
    }

    return next;
  }

  generateReport(configId: number, ongEmail?: string): string {
    const config = this.getAllConfigs().find(c => c.id === configId);
    if (!config) {
      throw new Error('Config not found');
    }

    let report = `RELATÓRIO - ${config.name}\n`;
    report += `Gerado em: ${new Date().toLocaleString('pt-BR')}\n`;
    report += `==================================================\n\n`;

    if (config.includeMetrics) {
      const metrics = this.analyticsService.getOverallMetrics(ongEmail);
      report += `MÉTRICAS GERAIS\n`;
      report += `---------------\n`;
      report += `Total de Doações: ${metrics.totalDonations}\n`;
      report += `Doadores Únicos: ${metrics.totalDonors}\n`;
      report += `Itens Arrecadados: ${metrics.totalItems}\n`;
      report += `Campanhas Ativas: ${metrics.activeCampaigns}/${metrics.totalCampaigns}\n`;
      report += `Voluntários: ${metrics.totalVolunteers}\n`;
      report += `Score de Impacto: ${metrics.impactScore}/100\n`;
      report += `Taxa de Crescimento: ${metrics.growthRate}%\n\n`;
    }

    if (config.includeCampaigns) {
      const campaigns = ongEmail 
        ? this.campaignsService.getCampaignsByOng(ongEmail)
        : this.campaignsService.getAllCampaigns();
      
      report += `CAMPANHAS (${campaigns.length})\n`;
      report += `---------------\n`;
      campaigns.forEach(campaign => {
        const progress = campaign.goal > 0 
          ? Math.round((campaign.current / campaign.goal) * 100) 
          : 0;
        report += `- ${campaign.title}\n`;
        report += `  ONG: ${campaign.ongName}\n`;
        report += `  Categoria: ${campaign.category}\n`;
        report += `  Progresso: ${campaign.current}/${campaign.goal} (${progress}%)\n`;
        report += `  Doações: ${campaign.donations?.length || 0}\n`;
        report += `  Status: ${campaign.status}\n\n`;
      });
    }

    if (config.includeVolunteers) {
      const opportunities = ongEmail
        ? this.volunteerService.getOpportunitiesByOng(ongEmail)
        : this.volunteerService.getAllOpportunities();
      
      report += `OPORTUNIDADES DE VOLUNTARIADO (${opportunities.length})\n`;
      report += `---------------\n`;
      opportunities.forEach(opp => {
        const registrations = this.volunteerService.getRegistrationsByOpportunity(opp.id);
        report += `- ${opp.title}\n`;
        report += `  Data: ${opp.date} às ${opp.time}\n`;
        report += `  Local: ${opp.location}\n`;
        report += `  Vagas: ${opp.currentVolunteers}/${opp.vacancies}\n`;
        report += `  Inscrições: ${registrations.length}\n`;
        report += `  Status: ${opp.status}\n\n`;
      });
    }

    if (config.includeDonations) {
      const campaigns = ongEmail 
        ? this.campaignsService.getCampaignsByOng(ongEmail)
        : this.campaignsService.getAllCampaigns();
      
      const allDonations = campaigns.flatMap(c => 
        (c.donations || []).map(d => ({ ...d, campaignTitle: c.title }))
      );

      report += `DOAÇÕES RECENTES (${allDonations.length})\n`;
      report += `---------------\n`;
      allDonations
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 50) // Top 50
        .forEach(donation => {
          report += `- ${donation.donorName} (${donation.donorEmail})\n`;
          report += `  Campanha: ${(donation as any).campaignTitle}\n`;
          report += `  Item: ${donation.item} (${donation.quantity} unidades)\n`;
          report += `  Data: ${new Date(donation.date).toLocaleDateString('pt-BR')}\n\n`;
        });
    }

    report += `==================================================\n`;
    report += `Relatório gerado automaticamente por SOMAR\n`;

    // Atualizar config
    this.updateReportConfig(configId, {
      lastGenerated: new Date(),
      nextGeneration: this.calculateNextGeneration(config.type)
    });

    return report;
  }

  downloadReport(configId: number, ongEmail?: string) {
    const config = this.getAllConfigs().find(c => c.id === configId);
    if (!config) return;

    const content = this.generateReport(configId, ongEmail);
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    const fileName = `relatorio-${config.name.toLowerCase().replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.txt`;

    link.setAttribute('href', url);
    link.setAttribute('download', fileName);
    link.style.visibility = 'hidden';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  scheduleReport(configId: number) {
    // Esta função seria implementada no backend para enviar emails agendados
    // Por enquanto, apenas simula o agendamento
    const config = this.getAllConfigs().find(c => c.id === configId);
    if (config) {
      config.active = true;
      this.updateReportConfig(configId, { active: true });
      // Relatório agendado para: config.nextGeneration
    }
  }

  checkScheduledReports() {
    // Verifica se há relatórios agendados que devem ser gerados
    const configs = this.getAllConfigs().filter(c => c.active);
    const now = new Date();

    configs.forEach(config => {
      if (config.nextGeneration && new Date(config.nextGeneration) <= now) {
        // Gerando relatório agendado: config.name
        // Aqui seria chamada a função para enviar por email
        this.generateReport(config.id);
      }
    });
  }
}
