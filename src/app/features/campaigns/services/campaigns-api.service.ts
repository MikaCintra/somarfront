import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { ApiService } from '../../../core/services/api.service';
import { Campaign, Donation } from './campaigns.service';

/**
 * Serviço HTTP para gerenciar campanhas via API
 * Substitui o CampaignsService quando backend estiver pronto
 */
@Injectable({
  providedIn: 'root'
})
export class CampaignsApiService {

  constructor(private apiService: ApiService) {}

  /**
   * Buscar todas as campanhas
   */
  getAllCampaigns(): Observable<Campaign[]> {
    return this.apiService.get<Campaign[]>('campaigns');
  }

  /**
   * Buscar campanhas de uma ONG específica
   */
  getCampaignsByOng(ongEmail: string): Observable<Campaign[]> {
    return this.apiService.get<Campaign[]>(`campaigns/ong/${ongEmail}`);
  }

  /**
   * Buscar campanha por ID
   */
  getCampaignById(id: string): Observable<Campaign> {
    return this.apiService.get<Campaign>(`campaigns/${id}`);
  }

  /**
   * Criar nova campanha
   */
  createCampaign(campaign: Partial<Campaign>): Observable<Campaign> {
    return this.apiService.post<Campaign>('campaigns', campaign);
  }

  /**
   * Atualizar campanha existente
   */
  updateCampaign(id: string, campaign: Partial<Campaign>): Observable<Campaign> {
    return this.apiService.put<Campaign>(`campaigns/${id}`, campaign);
  }

  /**
   * Deletar campanha
   */
  deleteCampaign(id: string): Observable<void> {
    return this.apiService.delete<void>(`campaigns/${id}`);
  }

  /**
   * Buscar doações de uma campanha
   */
  getCampaignDonations(campaignId: string): Observable<Donation[]> {
    return this.apiService.get<Donation[]>(`campaigns/${campaignId}/donations`);
  }

  /**
   * Fazer uma doação
   */
  makeDonation(donation: Partial<Donation>): Observable<Donation> {
    return this.apiService.post<Donation>('donations', donation);
  }

  /**
   * Buscar doações de um usuário
   */
  getUserDonations(userEmail: string): Observable<Donation[]> {
    return this.apiService.get<Donation[]>(`users/${userEmail}/donations`);
  }

  /**
   * Buscar campanhas por categoria
   */
  getCampaignsByCategory(category: string): Observable<Campaign[]> {
    return this.apiService.get<Campaign[]>(`campaigns/category/${category}`);
  }

  /**
   * Buscar campanhas urgentes
   */
  getUrgentCampaigns(): Observable<Campaign[]> {
    return this.apiService.get<Campaign[]>('campaigns/urgent');
  }

  /**
   * Upload de imagem da campanha
   */
  uploadCampaignImage(campaignId: string, file: File): Observable<{ imageUrl: string }> {
    return this.apiService.uploadFile<{ imageUrl: string }>(
      `campaigns/${campaignId}/image`,
      file
    );
  }

  /**
   * Buscar estatísticas de uma campanha
   */
  getCampaignStats(campaignId: string): Observable<{
    totalDonations: number;
    uniqueDonors: number;
    itemsReceived: number;
    progressPercentage: number;
  }> {
    return this.apiService.get(`campaigns/${campaignId}/stats`);
  }
}
