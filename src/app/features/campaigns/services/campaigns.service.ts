import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { CampaignResponse } from '../../../shared';
import { ApiService } from '../../../core/services/api.service';

export interface Donation {
  donorEmail: string;
  donorName: string;
  item: string;
  quantity: number;
  date: Date;
  collectionAddress?: string;
  contactPhone?: string;
  observations?: string;
}

export interface Campaign {
  id: number;
  ongEmail: string;
  ongName: string;
  title: string;
  description: string;
  goal: number;
  current: number;
  category: string;
  urgency?: 'high' | 'medium' | 'low';
  urgent?: boolean;
  location?: string;
  status: string;
  createdAt: Date;
  donations?: Donation[];
}

interface SaveCampaignRequest{
  titulo: string;
  descricao: string;
  meta: number;
  localizacao: string;
}

@Injectable({
  providedIn: 'root'
})
export class CampaignsService {
  private storageKey = 'somar-campaigns';

  constructor(
    private apiService: ApiService
  ) {
    this.initializeMockCampaigns();
    
  }

  private initializeMockCampaigns() {
    const existing = this.getAllCampaigns();
    if (existing.length === 0) {
      // Campanhas mockadas iniciais
      const mockCampaigns: Campaign[] = [
        {
          id: 1,
          ongEmail: 'ong@somar.com',
          ongName: 'ONG Esperança',
          title: 'Campanha do Agasalho 2025',
          description: 'Arrecadação de roupas de inverno para famílias carentes',
          goal: 500,
          current: 320,
          category: 'Roupas',
          urgency: 'high',
          location: 'São Paulo, SP',
          status: 'active',
          createdAt: new Date('2024-10-15')
        },
        {
          id: 2,
          ongEmail: 'ong@somar.com',
          ongName: 'ONG Esperança',
          title: 'Alimentos Não Perecíveis',
          description: 'Doação de alimentos para cestas básicas',
          goal: 1000,
          current: 750,
          category: 'Alimentos',
          urgency: 'medium',
          location: 'São Paulo, SP',
          status: 'active',
          createdAt: new Date('2024-10-20')
        },
        {
          id: 3,
          ongEmail: 'ong@somar.com',
          ongName: 'ONG Esperança',
          title: 'Material Escolar',
          description: 'Itens escolares para crianças carentes',
          goal: 300,
          current: 180,
          category: 'Educação',
          urgency: 'high',
          location: 'São Paulo, SP',
          status: 'active',
          createdAt: new Date('2024-11-01')
        },
        {
          id: 4,
          ongEmail: 'admin@somar.com',
          ongName: 'Lar Feliz',
          title: 'Móveis e Eletrodomésticos',
          description: 'Doação de móveis e eletrodomésticos para famílias que perderam tudo em enchentes',
          goal: 150,
          current: 45,
          category: 'Móveis',
          urgency: 'high',
          location: 'Porto Alegre, RS',
          status: 'active',
          createdAt: new Date('2024-10-25')
        },
        {
          id: 5,
          ongEmail: 'admin@somar.com',
          ongName: 'Infância Feliz',
          title: 'Brinquedos para o Dia das Crianças',
          description: 'Arrecadação de brinquedos para distribuir no Dia das Crianças',
          goal: 400,
          current: 290,
          category: 'Brinquedos',
          urgency: 'low',
          location: 'Brasília, DF',
          status: 'active',
          createdAt: new Date('2024-09-10')
        },
        {
          id: 6,
          ongEmail: 'admin@somar.com',
          ongName: 'Saúde para Todos',
          title: 'Produtos de Higiene',
          description: 'Kits de higiene pessoal para comunidades carentes',
          goal: 600,
          current: 380,
          category: 'Higiene',
          urgency: 'medium',
          location: 'Salvador, BA',
          status: 'active',
          createdAt: new Date('2024-10-05')
        }
      ];

      sessionStorage.setItem(this.storageKey, JSON.stringify(mockCampaigns));
    }
  }

  getAllCampaigns(): Campaign[] {
    const campaigns = sessionStorage.getItem(this.storageKey);
    return campaigns ? JSON.parse(campaigns) : [];
  }

  getCampaignsByOng(ongEmail: string): Campaign[] {
    // Admin tem acesso a todas as campanhas
    if (ongEmail === 'admin@somar.com') {
      return this.getAllCampaigns();
    }
    return this.getAllCampaigns().filter(c => c.ongEmail === ongEmail);
  }

  getActiveCampaigns(): Campaign[] {
    return this.getAllCampaigns().filter(c => c.status === 'active');
  }

  getCampaignById(id: number): Campaign | undefined {
    return this.getAllCampaigns().find(c => c.id === id);
  }

  createCampaign(campaign: Omit<Campaign, 'id' | 'createdAt'>): Campaign {
    const campaigns = this.getAllCampaigns();
    const newId = campaigns.length > 0 ? Math.max(...campaigns.map(c => c.id)) + 1 : 1;
    
    const newCampaign: Campaign = {
      ...campaign,
      id: newId,
      createdAt: new Date()
    };

    campaigns.push(newCampaign);
    sessionStorage.setItem(this.storageKey, JSON.stringify(campaigns));
    
    return newCampaign;
  }

  saveCampaign(titulo: string, descricao: string, meta: number, localizacao: string): Observable<CampaignResponse> {

    const request: SaveCampaignRequest = { titulo, descricao, meta, localizacao };

    return this.apiService.post<CampaignResponse>('campanha/cadastrar', request).pipe(
      tap((response) => {
        //salvar dados da sessão
        sessionStorage.setItem('titulo', response.titulo);
        sessionStorage.setItem('descricao', response.descricao);
        sessionStorage.setItem('meta', response.meta.toString());
        sessionStorage.setItem('localizao', response.localizacao);
        
      }),
      catchError((error) => {
        console.error('Erro ao cadastrar campanha: ', error);
        return throwError(() => new Error('Erro ao criar uma campanha. Tente novamente'));
      })

    );
  }

  updateCampaign(id: number, updates: Partial<Campaign>): boolean {
    const campaigns = this.getAllCampaigns();
    const index = campaigns.findIndex(c => c.id === id);
    
    if (index !== -1) {
      campaigns[index] = { ...campaigns[index], ...updates };
      sessionStorage.setItem(this.storageKey, JSON.stringify(campaigns));
      return true;
    }
    
    return false;
  }

  deleteCampaign(id: number): boolean {
    const campaigns = this.getAllCampaigns();
    const filtered = campaigns.filter(c => c.id !== id);
    
    if (filtered.length !== campaigns.length) {
      sessionStorage.setItem(this.storageKey, JSON.stringify(filtered));
      return true;
    }
    
    return false;
  }

  addDonation(campaignId: number, quantity: number): boolean {
    const campaign = this.getCampaignById(campaignId);
    
    if (campaign) {
      return this.updateCampaign(campaignId, {
        current: campaign.current + quantity
      });
    }
    
    return false;
  }
}
