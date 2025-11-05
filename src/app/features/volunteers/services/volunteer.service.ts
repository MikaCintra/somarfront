import { Injectable } from '@angular/core';

export interface VolunteerOpportunity {
  id: number;
  ongEmail: string;
  ongName: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  vacancies: number;
  currentVolunteers: number;
  category: string;
  skills?: string[];
  status: 'open' | 'full' | 'closed';
  createdAt: Date;
}

export interface VolunteerRegistration {
  id: number;
  opportunityId: number;
  volunteerEmail: string;
  volunteerName: string;
  phone: string;
  message: string;
  registeredAt: Date;
  status: 'pending' | 'confirmed' | 'cancelled';
}

@Injectable({
  providedIn: 'root'
})
export class VolunteerService {
  private opportunitiesKey = 'somar-volunteer-opportunities';
  private registrationsKey = 'somar-volunteer-registrations';

  constructor() {
    this.initializeMockData();
  }

  private initializeMockData() {
    const existing = this.getAllOpportunities();
    if (existing.length === 0) {
      const mockOpportunities: VolunteerOpportunity[] = [
        {
          id: 1,
          ongEmail: 'ong@somar.com',
          ongName: 'ONG Esperança',
          title: 'Distribuição de Cestas Básicas',
          description: 'Ajude na separação e distribuição de cestas básicas para famílias em situação de vulnerabilidade. Atividade física leve, ambiente colaborativo.',
          date: '2025-11-10',
          time: '09:00 - 13:00',
          location: 'Centro - São Paulo, SP',
          vacancies: 15,
          currentVolunteers: 8,
          category: 'Alimentos',
          skills: ['Trabalho em equipe', 'Organização', 'Empatia'],
          status: 'open',
          createdAt: new Date('2024-10-25')
        },
        {
          id: 2,
          ongEmail: 'ong@somar.com',
          ongName: 'ONG Esperança',
          title: 'Preparação de Refeições Comunitárias',
          description: 'Auxilie na cozinha preparando refeições para pessoas em situação de rua. Experiência em cozinha é um diferencial mas não é obrigatória.',
          date: '2025-11-15',
          time: '06:00 - 10:00',
          location: 'Mooca - São Paulo, SP',
          vacancies: 8,
          currentVolunteers: 3,
          category: 'Alimentos',
          skills: ['Culinária', 'Higiene', 'Pontualidade'],
          status: 'open',
          createdAt: new Date('2024-10-28')
        },
        {
          id: 3,
          ongEmail: 'admin@somar.com',
          ongName: 'Educação Transforma',
          title: 'Aulas de Reforço Escolar - Matemática',
          description: 'Professores voluntários para dar aulas de reforço de matemática para alunos do ensino fundamental. Comprometimento semanal necessário.',
          date: '2025-11-12',
          time: '15:00 - 17:00',
          location: 'Savassi - Belo Horizonte, MG',
          vacancies: 5,
          currentVolunteers: 4,
          category: 'Educação',
          skills: ['Ensino', 'Paciência', 'Matemática', 'Didática'],
          status: 'open',
          createdAt: new Date('2024-10-20')
        },
        {
          id: 4,
          ongEmail: 'admin@somar.com',
          ongName: 'Educação Transforma',
          title: 'Oficina de Leitura para Crianças',
          description: 'Conte histórias e incentive a leitura com crianças de 6 a 10 anos. Atividade lúdica e muito gratificante! Material fornecido pela ONG.',
          date: '2025-11-18',
          time: '14:00 - 16:00',
          location: 'Pampulha - Belo Horizonte, MG',
          vacancies: 6,
          currentVolunteers: 2,
          category: 'Educação',
          skills: ['Comunicação', 'Criatividade', 'Paciência com crianças'],
          status: 'open',
          createdAt: new Date('2024-11-01')
        },
        {
          id: 5,
          ongEmail: 'ong@somar.com',
          ongName: 'Saúde Para Todos',
          title: 'Campanha de Vacinação Comunitária',
          description: 'Apoio logístico em campanha de vacinação: controle de filas, orientação ao público, distribuição de senhas. Profissionais de saúde terão prioridade.',
          date: '2025-11-08',
          time: '08:00 - 16:00',
          location: 'Vila Mariana - São Paulo, SP',
          vacancies: 20,
          currentVolunteers: 12,
          category: 'Saúde',
          skills: ['Organização', 'Atendimento ao público', 'Trabalho sob pressão'],
          status: 'open',
          createdAt: new Date('2024-10-15')
        },
        {
          id: 6,
          ongEmail: 'admin@somar.com',
          ongName: 'Saúde Para Todos',
          title: 'Visita a Idosos em Asilos',
          description: 'Faça companhia para idosos institucionalizados. Converse, jogue, leia ou simplesmente esteja presente. Experiência emocionante e transformadora.',
          date: '2025-11-14',
          time: '10:00 - 12:00',
          location: 'Botafogo - Rio de Janeiro, RJ',
          vacancies: 10,
          currentVolunteers: 7,
          category: 'Saúde',
          skills: ['Empatia', 'Escuta ativa', 'Paciência'],
          status: 'open',
          createdAt: new Date('2024-10-18')
        },
        {
          id: 7,
          ongEmail: 'ong@somar.com',
          ongName: 'Verde Vida',
          title: 'Plantio de Árvores em Área Degradada',
          description: 'Participe de mutirão de reflorestamento! Plantaremos 200 mudas nativas. Traga protetor solar, boné e disposição! Lanche será fornecido.',
          date: '2025-11-20',
          time: '07:00 - 12:00',
          location: 'Parque Estadual - Cotia, SP',
          vacancies: 30,
          currentVolunteers: 18,
          category: 'Meio Ambiente',
          skills: ['Disposição física', 'Consciência ambiental', 'Trabalho em equipe'],
          status: 'open',
          createdAt: new Date('2024-10-22')
        },
        {
          id: 8,
          ongEmail: 'admin@somar.com',
          ongName: 'Verde Vida',
          title: 'Limpeza de Praia',
          description: 'Ação de limpeza na praia da Enseada. Colete lixo, resíduos plásticos e conscientize banhistas. Material de coleta será fornecido.',
          date: '2025-11-09',
          time: '06:30 - 10:30',
          location: 'Praia da Enseada - Guarujá, SP',
          vacancies: 25,
          currentVolunteers: 25,
          category: 'Meio Ambiente',
          skills: ['Consciência ambiental', 'Disposição física'],
          status: 'full',
          createdAt: new Date('2024-10-12')
        },
        {
          id: 9,
          ongEmail: 'ong@somar.com',
          ongName: 'ONG Esperança',
          title: 'Torneio de Futebol Solidário',
          description: 'Organize e arbitre torneio de futebol para jovens da comunidade. Procuramos árbitros, organizadores e apoio geral. Experiência com eventos esportivos é um plus.',
          date: '2025-11-22',
          time: '08:00 - 18:00',
          location: 'Campo do Pacaembu - São Paulo, SP',
          vacancies: 12,
          currentVolunteers: 5,
          category: 'Esportes',
          skills: ['Conhecimento de esportes', 'Organização de eventos', 'Liderança'],
          status: 'open',
          createdAt: new Date('2024-11-02')
        },
        {
          id: 10,
          ongEmail: 'admin@somar.com',
          ongName: 'Educação Transforma',
          title: 'Bazar Beneficente - Organização',
          description: 'Ajude a organizar bazar beneficente! Separação de roupas, precificação, atendimento e caixa. Toda renda será revertida para projetos educacionais.',
          date: '2025-11-16',
          time: '09:00 - 17:00',
          location: 'Centro Cultural - Campinas, SP',
          vacancies: 15,
          currentVolunteers: 9,
          category: 'Eventos',
          skills: ['Atendimento', 'Organização', 'Vendas', 'Trabalho em equipe'],
          status: 'open',
          createdAt: new Date('2024-10-30')
        }
      ];

      sessionStorage.setItem(this.opportunitiesKey, JSON.stringify(mockOpportunities));
      
      // Criar algumas inscrições mockadas para o doador de teste
      const mockRegistrations: VolunteerRegistration[] = [
        {
          id: 1,
          opportunityId: 1,
          volunteerEmail: 'doador@somar.com',
          volunteerName: 'Doador Teste',
          phone: '(11) 98765-4321',
          message: 'Tenho grande interesse em ajudar na distribuição de alimentos. Já participei de ações similares.',
          registeredAt: new Date('2024-11-01T10:30:00'),
          status: 'confirmed'
        },
        {
          id: 2,
          opportunityId: 4,
          volunteerEmail: 'doador@somar.com',
          volunteerName: 'Doador Teste',
          phone: '(11) 98765-4321',
          message: 'Adoro ler para crianças! Seria uma honra participar desta oficina.',
          registeredAt: new Date('2024-11-02T14:15:00'),
          status: 'pending'
        },
        {
          id: 3,
          opportunityId: 7,
          volunteerEmail: 'doador@somar.com',
          volunteerName: 'Doador Teste',
          phone: '(11) 98765-4321',
          message: 'Sou apaixonado por meio ambiente. Estou disponível e preparado fisicamente.',
          registeredAt: new Date('2024-11-03T09:00:00'),
          status: 'confirmed'
        }
      ];
      
      sessionStorage.setItem(this.registrationsKey, JSON.stringify(mockRegistrations));
    }
  }

  // Oportunidades de Voluntariado
  getAllOpportunities(): VolunteerOpportunity[] {
    const opportunities = sessionStorage.getItem(this.opportunitiesKey);
    return opportunities ? JSON.parse(opportunities) : [];
  }

  getOpportunitiesByOng(ongEmail: string): VolunteerOpportunity[] {
    // Admin tem acesso a todas as oportunidades
    if (ongEmail === 'admin@somar.com') {
      return this.getAllOpportunities();
    }
    return this.getAllOpportunities().filter(o => o.ongEmail === ongEmail);
  }

  getOpenOpportunities(): VolunteerOpportunity[] {
    return this.getAllOpportunities().filter(o => o.status === 'open');
  }

  getOpportunityById(id: number): VolunteerOpportunity | undefined {
    return this.getAllOpportunities().find(o => o.id === id);
  }

  createOpportunity(opportunity: Omit<VolunteerOpportunity, 'id' | 'createdAt'>): VolunteerOpportunity {
    const opportunities = this.getAllOpportunities();
    const newId = opportunities.length > 0 ? Math.max(...opportunities.map(o => o.id)) + 1 : 1;
    
    const newOpportunity: VolunteerOpportunity = {
      ...opportunity,
      id: newId,
      createdAt: new Date()
    };

    opportunities.push(newOpportunity);
    sessionStorage.setItem(this.opportunitiesKey, JSON.stringify(opportunities));
    
    return newOpportunity;
  }

  updateOpportunity(id: number, updates: Partial<VolunteerOpportunity>): boolean {
    const opportunities = this.getAllOpportunities();
    const index = opportunities.findIndex(o => o.id === id);
    
    if (index !== -1) {
      opportunities[index] = { ...opportunities[index], ...updates };
      
      // Atualiza status baseado nas vagas
      if (opportunities[index].currentVolunteers >= opportunities[index].vacancies) {
        opportunities[index].status = 'full';
      } else if (opportunities[index].status === 'full') {
        opportunities[index].status = 'open';
      }
      
      sessionStorage.setItem(this.opportunitiesKey, JSON.stringify(opportunities));
      return true;
    }
    
    return false;
  }

  deleteOpportunity(id: number): boolean {
    const opportunities = this.getAllOpportunities();
    const filtered = opportunities.filter(o => o.id !== id);
    
    if (filtered.length !== opportunities.length) {
      sessionStorage.setItem(this.opportunitiesKey, JSON.stringify(filtered));
      
      // Remove também as inscrições associadas
      this.deleteRegistrationsByOpportunity(id);
      return true;
    }
    
    return false;
  }

  // Inscrições de Voluntários
  getAllRegistrations(): VolunteerRegistration[] {
    const registrations = sessionStorage.getItem(this.registrationsKey);
    return registrations ? JSON.parse(registrations) : [];
  }

  getRegistrationsByOpportunity(opportunityId: number): VolunteerRegistration[] {
    return this.getAllRegistrations().filter(r => r.opportunityId === opportunityId);
  }

  getRegistrationsByVolunteer(volunteerEmail: string): VolunteerRegistration[] {
    return this.getAllRegistrations().filter(r => r.volunteerEmail === volunteerEmail);
  }

  createRegistration(registration: Omit<VolunteerRegistration, 'id' | 'registeredAt'>): VolunteerRegistration | null {
    const opportunity = this.getOpportunityById(registration.opportunityId);
    
    if (!opportunity || opportunity.currentVolunteers >= opportunity.vacancies) {
      return null; // Sem vagas disponíveis
    }

    const registrations = this.getAllRegistrations();
    const newId = registrations.length > 0 ? Math.max(...registrations.map(r => r.id)) + 1 : 1;
    
    const newRegistration: VolunteerRegistration = {
      ...registration,
      id: newId,
      registeredAt: new Date()
    };

    registrations.push(newRegistration);
    sessionStorage.setItem(this.registrationsKey, JSON.stringify(registrations));
    
    // Atualiza contador de voluntários
    this.updateOpportunity(registration.opportunityId, {
      currentVolunteers: opportunity.currentVolunteers + 1
    });
    
    return newRegistration;
  }

  updateRegistration(id: number, updates: Partial<VolunteerRegistration>): boolean {
    const registrations = this.getAllRegistrations();
    const index = registrations.findIndex(r => r.id === id);
    
    if (index !== -1) {
      const oldStatus = registrations[index].status;
      registrations[index] = { ...registrations[index], ...updates };
      
      // Se cancelou, libera vaga
      if (oldStatus !== 'cancelled' && updates.status === 'cancelled') {
        const opportunity = this.getOpportunityById(registrations[index].opportunityId);
        if (opportunity) {
          this.updateOpportunity(opportunity.id, {
            currentVolunteers: Math.max(0, opportunity.currentVolunteers - 1)
          });
        }
      }
      
      sessionStorage.setItem(this.registrationsKey, JSON.stringify(registrations));
      return true;
    }
    
    return false;
  }

  deleteRegistrationsByOpportunity(opportunityId: number): void {
    const registrations = this.getAllRegistrations();
    const filtered = registrations.filter(r => r.opportunityId !== opportunityId);
    sessionStorage.setItem(this.registrationsKey, JSON.stringify(filtered));
  }

  // Verifica se voluntário já está inscrito
  isVolunteerRegistered(opportunityId: number, volunteerEmail: string): boolean {
    return this.getAllRegistrations().some(
      r => r.opportunityId === opportunityId && 
           r.volunteerEmail === volunteerEmail &&
           r.status !== 'cancelled'
    );
  }

  // Pega registros de um voluntário específico
  getUserRegistrations(volunteerEmail: string): VolunteerRegistration[] {
    return this.getAllRegistrations().filter(r => r.volunteerEmail === volunteerEmail);
  }
}
