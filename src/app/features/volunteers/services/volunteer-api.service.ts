import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../core/services/api.service';
import { VolunteerOpportunity, VolunteerRegistration } from './volunteer.service';

/**
 * Serviço HTTP para gerenciar oportunidades de voluntariado via API
 */
@Injectable({
  providedIn: 'root'
})
export class VolunteerApiService {

  constructor(private apiService: ApiService) {}

  /**
   * Buscar todas as oportunidades de voluntariado
   */
  getAllOpportunities(): Observable<VolunteerOpportunity[]> {
    return this.apiService.get<VolunteerOpportunity[]>('volunteer/opportunities');
  }

  /**
   * Buscar oportunidades de uma ONG específica
   */
  getOpportunitiesByOng(ongEmail: string): Observable<VolunteerOpportunity[]> {
    return this.apiService.get<VolunteerOpportunity[]>(`volunteer/opportunities/ong/${ongEmail}`);
  }

  /**
   * Buscar oportunidade por ID
   */
  getOpportunityById(id: string): Observable<VolunteerOpportunity> {
    return this.apiService.get<VolunteerOpportunity>(`volunteer/opportunities/${id}`);
  }

  /**
   * Criar nova oportunidade
   */
  createOpportunity(opportunity: Partial<VolunteerOpportunity>): Observable<VolunteerOpportunity> {
    return this.apiService.post<VolunteerOpportunity>('volunteer/opportunities', opportunity);
  }

  /**
   * Atualizar oportunidade
   */
  updateOpportunity(id: string, opportunity: Partial<VolunteerOpportunity>): Observable<VolunteerOpportunity> {
    return this.apiService.put<VolunteerOpportunity>(`volunteer/opportunities/${id}`, opportunity);
  }

  /**
   * Deletar oportunidade
   */
  deleteOpportunity(id: string): Observable<void> {
    return this.apiService.delete<void>(`volunteer/opportunities/${id}`);
  }

  /**
   * Inscrever-se em uma oportunidade
   */
  registerForOpportunity(registration: Partial<VolunteerRegistration>): Observable<VolunteerRegistration> {
    return this.apiService.post<VolunteerRegistration>('volunteer/registrations', registration);
  }

  /**
   * Cancelar inscrição
   */
  cancelRegistration(opportunityId: string, userEmail: string): Observable<void> {
    return this.apiService.delete<void>(`volunteer/registrations/${opportunityId}/${userEmail}`);
  }

  /**
   * Buscar inscrições de um usuário
   */
  getUserRegistrations(userEmail: string): Observable<VolunteerRegistration[]> {
    return this.apiService.get<VolunteerRegistration[]>(`volunteer/registrations/user/${userEmail}`);
  }

  /**
   * Buscar inscritos em uma oportunidade
   */
  getOpportunityRegistrations(opportunityId: string): Observable<VolunteerRegistration[]> {
    return this.apiService.get<VolunteerRegistration[]>(`volunteer/opportunities/${opportunityId}/registrations`);
  }

  /**
   * Buscar oportunidades por categoria
   */
  getOpportunitiesByCategory(category: string): Observable<VolunteerOpportunity[]> {
    return this.apiService.get<VolunteerOpportunity[]>(`volunteer/opportunities/category/${category}`);
  }

  /**
   * Atualizar status de uma inscrição
   */
  updateRegistrationStatus(
    opportunityId: string,
    userEmail: string,
    status: 'pending' | 'approved' | 'rejected'
  ): Observable<VolunteerRegistration> {
    return this.apiService.patch<VolunteerRegistration>(
      `volunteer/registrations/${opportunityId}/${userEmail}/status`,
      { status }
    );
  }
}
