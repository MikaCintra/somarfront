import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Campaign, Donation } from '../../services/campaigns.service';
import { VolunteerRegistration } from '../../../volunteers/services/volunteer.service';

@Component({
  selector: 'app-campaign-details-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './campaign-details-modal.html',
  styleUrl: './campaign-details-modal.scss'
})
export class CampaignDetailsModal implements OnInit {
  @Input() campaign: Campaign | null = null;
  @Input() isOpen: boolean = false;
  @Output() close = new EventEmitter<void>();

  activeTab: 'details' | 'donations' | 'volunteers' | 'gallery' = 'details';
  
  // Dados mockados para demonstração
  volunteers: VolunteerRegistration[] = [];
  galleryImages: string[] = [];

  ngOnInit() {
    this.loadVolunteers();
    this.loadGallery();
  }

  ngOnChanges() {
    if (this.campaign) {
      this.loadVolunteers();
      this.loadGallery();
    }
  }

  loadVolunteers() {
    // Mock: Buscar voluntários relacionados à campanha
    this.volunteers = [
      {
        id: 1,
        opportunityId: Number(this.campaign?.id) || 0,
        volunteerEmail: 'joao@email.com',
        volunteerName: 'João Silva',
        phone: '(11) 99999-1111',
        message: 'Gostaria de ajudar na distribuição',
        status: 'confirmed',
        registeredAt: new Date('2025-11-01')
      },
      {
        id: 2,
        opportunityId: Number(this.campaign?.id) || 0,
        volunteerEmail: 'maria@email.com',
        volunteerName: 'Maria Santos',
        phone: '(11) 99999-2222',
        message: 'Disponível aos finais de semana',
        status: 'confirmed',
        registeredAt: new Date('2025-11-02')
      }
    ];
  }

  loadGallery() {
    // Mock: Imagens da campanha
    this.galleryImages = [
      'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800',
      'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800',
      'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800',
      'https://images.unsplash.com/photo-1509099652299-30938b0aeb63?w=800'
    ];
  }

  onClose() {
    this.close.emit();
  }

  onBackdropClick(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      this.onClose();
    }
  }

  setActiveTab(tab: 'details' | 'donations' | 'volunteers' | 'gallery') {
    this.activeTab = tab;
  }

  getProgressPercentage(): number {
    if (!this.campaign || !this.campaign.donations || this.campaign.donations.length === 0) {
      return 0;
    }
    
    const itemsReceived = this.campaign.donations.reduce((sum, donation) => {
      const quantity = Number(donation.quantity) || 0;
      return sum + quantity;
    }, 0);
    
    // Assumindo meta de 100 itens (adaptar conforme necessário)
    const goalItems = 100;
    return Math.min(Math.round((itemsReceived / goalItems) * 100), 100);
  }

  getTotalDonations(): number {
    return this.campaign?.donations?.length || 0;
  }

  getUniqueDonors(): number {
    if (!this.campaign?.donations) return 0;
    const uniqueEmails = new Set(this.campaign.donations.map(d => d.donorEmail));
    return uniqueEmails.size;
  }

  getTotalItems(): number {
    if (!this.campaign?.donations) return 0;
    return this.campaign.donations.reduce((sum, donation) => {
      const quantity = Number(donation.quantity) || 0;
      return sum + quantity;
    }, 0);
  }

  getCategoryIcon(): string {
    const icons: { [key: string]: string } = {
      'alimentos': '🍎',
      'roupas': '👕',
      'brinquedos': '🧸',
      'moveis': '🛋️',
      'medicamentos': '💊',
      'outros': '📦'
    };
    return icons[this.campaign?.category || 'outros'] || '📦';
  }

  getCategoryLabel(): string {
    const labels: { [key: string]: string } = {
      'alimentos': 'Alimentos',
      'roupas': 'Roupas e Vestuário',
      'brinquedos': 'Brinquedos',
      'moveis': 'Móveis e Eletrodomésticos',
      'medicamentos': 'Medicamentos',
      'outros': 'Outros'
    };
    return labels[this.campaign?.category || 'outros'] || 'Outros';
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  }

  formatDateTime(date: Date): string {
    return new Date(date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  shareCampaign() {
    const url = window.location.href;
    const text = `Confira essa campanha: ${this.campaign?.title}`;
    
    if (navigator.share) {
      navigator.share({
        title: this.campaign?.title,
        text: text,
        url: url
      }).catch(err => {
        // Fallback se share API não estiver disponível
      });
    } else {
      // Fallback: copiar para clipboard
      navigator.clipboard.writeText(`${text} - ${url}`);
      alert('Link copiado para a área de transferência!');
    }
  }

  downloadReport() {
    alert('Funcionalidade de download de relatório será implementada em breve!');
    // Futuramente: gerar PDF com dados da campanha
  }
}
