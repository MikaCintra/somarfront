import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReportsService, ReportConfig } from '../../services/reports.service';
import { ThemeLanguageToggle } from '../../../../shared/components/theme-language-toggle/theme-language-toggle';

interface GeneratedReport {
  id: number;
  name: string;
  type: string;
  format: string;
  fileUrl?: string;
  generatedAt?: Date;
  fileSize?: number;
  recordsCount?: number;
  sentAt?: Date;
}

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, FormsModule, ThemeLanguageToggle],
  templateUrl: './reports.html',
  styleUrl: './reports.scss'
})
export class ReportsComponent implements OnInit {
  // Lists
  scheduledReports: ReportConfig[] = [];
  generatedReports: GeneratedReport[] = [];
  
  // View state
  activeTab: 'scheduled' | 'generated' = 'scheduled';
  
  // Modal state
  showCreateModal: boolean = false;
  
  // New report config
  newReport: {
    name?: string;
    type?: 'daily' | 'weekly' | 'monthly' | 'custom';
    format?: 'csv' | 'pdf' | 'excel';
    recipients?: string[];
    includeMetrics?: boolean;
    includeCampaigns?: boolean;
    includeVolunteers?: boolean;
    includeDonations?: boolean;
  } = {
    type: 'weekly',
    format: 'csv',
    recipients: [],
    includeMetrics: true,
    includeCampaigns: true,
    includeVolunteers: false,
    includeDonations: false
  };
  
  newRecipient: string = '';
  
  // Report types
  reportTypes = [
    { value: 'daily', label: 'Relatório Diário', icon: '�', description: 'Relatório gerado todos os dias' },
    { value: 'weekly', label: 'Relatório Semanal', icon: '�', description: 'Relatório gerado semanalmente' },
    { value: 'monthly', label: 'Relatório Mensal', icon: '🗓️', description: 'Relatório gerado mensalmente' },
    { value: 'custom', label: 'Relatório Personalizado', icon: '⚙️', description: 'Configure seu próprio relatório' }
  ];
  
  // Frequencies
  frequencies = [
    { value: 'daily', label: 'Diário', icon: '📅' },
    { value: 'weekly', label: 'Semanal', icon: '📆' },
    { value: 'monthly', label: 'Mensal', icon: '🗓️' },
    { value: 'custom', label: 'Personalizado', icon: '⚙️' }
  ];
  
  // Formats
  formats = [
    { value: 'csv', label: 'CSV', icon: '📄', description: 'Planilha Excel' },
    { value: 'pdf', label: 'PDF', icon: '📕', description: 'Documento formatado' },
    { value: 'excel', label: 'Excel', icon: '�', description: 'Planilha completa' }
  ];

  constructor(private reportsService: ReportsService) {}

  ngOnInit() {
    this.loadScheduledReports();
    this.loadGeneratedReports();
  }
  
  loadScheduledReports() {
    const ongId = this.getONGId();
    if (ongId) {
      this.scheduledReports = this.reportsService.getReportConfigs();
    }
  }
  
  loadGeneratedReports() {
    // Mock generated reports
    this.generatedReports = [
      {
        id: 1,
        name: 'Relatório Semanal de Doações',
        type: 'weekly',
        format: 'csv',
        generatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        fileSize: 15360,
        recordsCount: 45,
        fileUrl: '#',
        sentAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
      }
    ];
  }
  
  getONGId(): string {
    const userSession = sessionStorage.getItem('userSession');
    if (userSession) {
      const session = JSON.parse(userSession);
      return session.userId;
    }
    return '';
  }
  
  getReportTypeInfo(type: string) {
    return this.reportTypes.find(t => t.value === type) || this.reportTypes[0];
  }
  
  getFrequencyInfo(frequency: string) {
    return this.frequencies.find(f => f.value === frequency) || this.frequencies[0];
  }
  
  getFormatInfo(format: string) {
    return this.formats.find(f => f.value === format) || this.formats[0];
  }
  
  getNextRunDate(report: ReportConfig): string {
    if (!report.nextGeneration) return 'N/A';
    const date = new Date(report.nextGeneration);
    return date.toLocaleDateString('pt-BR');
  }
  
  getStatusColor(active: boolean): string {
    return active ? '#10b981' : '#f59e0b';
  }
  
  getStatusLabel(active: boolean): string {
    return active ? '✅ Ativo' : '⏸️ Pausado';
  }
  
  setReportType(value: string) {
    this.newReport.type = value as 'daily' | 'weekly' | 'monthly' | 'custom';
  }
  
  openCreateModal() {
    this.showCreateModal = true;
    this.resetForm();
  }
  
  closeCreateModal() {
    this.showCreateModal = false;
  }
  
  resetForm() {
    this.newReport = {
      type: 'weekly',
      format: 'csv',
      recipients: [],
      includeMetrics: true,
      includeCampaigns: true,
      includeVolunteers: false,
      includeDonations: false
    };
    this.newRecipient = '';
  }
  
  addRecipient() {
    if (this.newRecipient && this.isValidEmail(this.newRecipient)) {
      if (!this.newReport.recipients) {
        this.newReport.recipients = [];
      }
      if (!this.newReport.recipients.includes(this.newRecipient)) {
        this.newReport.recipients.push(this.newRecipient);
        this.newRecipient = '';
      }
    } else {
      alert('Por favor, insira um email válido.');
    }
  }
  
  removeRecipient(email: string) {
    if (this.newReport.recipients) {
      this.newReport.recipients = this.newReport.recipients.filter(r => r !== email);
    }
  }
  
  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  scheduleReport() {
    if (!this.newReport.name) {
      alert('Por favor, dê um nome ao relatório.');
      return;
    }
    
    const ongId = this.getONGId();
    if (!ongId) {
      alert('Erro ao identificar ONG.');
      return;
    }
    
    const report = this.reportsService.createReportConfig({
      name: this.newReport.name!,
      type: this.newReport.type || 'weekly',
      format: this.newReport.format || 'csv',
      recipients: this.newReport.recipients || [],
      includeMetrics: this.newReport.includeMetrics || true,
      includeCampaigns: this.newReport.includeCampaigns || true,
      includeVolunteers: this.newReport.includeVolunteers || false,
      includeDonations: this.newReport.includeDonations || false,
      active: true
    });
    
    alert('Relatório agendado com sucesso! 📊');
    this.closeCreateModal();
    this.loadScheduledReports();
  }
  
  pauseReport(report: ReportConfig) {
    // Toggle between active and paused
    this.reportsService.updateReportConfig(report.id, { active: !report.active });
    alert(`Relatório ${!report.active ? 'ativado' : 'pausado'}.`);
    this.loadScheduledReports();
  }
  
  deleteReport(report: ReportConfig) {
    if (confirm(`Tem certeza que deseja excluir o relatório "${report.name}"?`)) {
      this.reportsService.deleteReportConfig(report.id);
      alert('Relatório excluído.');
      this.loadScheduledReports();
    }
  }
  
  generateNow(report: ReportConfig) {
    const data = this.reportsService.generateReport(report.id);
    alert('Relatório gerado com sucesso! 📄');
    this.loadGeneratedReports();
  }
  
  downloadReport(report: GeneratedReport) {
    if (report.fileUrl) {
      window.open(report.fileUrl, '_blank');
    } else {
      alert('Arquivo não disponível.');
    }
  }
  
  sendReport(report: GeneratedReport) {
    alert('Relatório enviado por email! 📧');
  }
  
  getFileSize(bytes: number = 0): string {
    if (bytes === 0) return '0 KB';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  }
}
