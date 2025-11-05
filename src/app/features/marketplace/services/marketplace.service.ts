import { Injectable } from '@angular/core';

export interface MarketplaceItem {
  id: number;
  title: string;
  description: string;
  category: string;
  quantity: number;
  condition: 'new' | 'used' | 'any';
  urgency: 'high' | 'medium' | 'low';
  ongEmail: string;
  ongName: string;
  location: string;
  imageUrl?: string;
  status: 'available' | 'reserved' | 'fulfilled';
  createdAt: Date;
  reservedBy?: string;
  reservedUntil?: Date;
}

export interface ItemReservation {
  id: number;
  itemId: number;
  donorEmail: string;
  donorName: string;
  quantity: number;
  message: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  createdAt: Date;
}

@Injectable({
  providedIn: 'root'
})
export class MarketplaceService {
  private itemsKey = 'somar-marketplace-items';
  private reservationsKey = 'somar-marketplace-reservations';

  constructor() {
    this.initializeMockData();
  }

  private initializeMockData() {
    const existing = this.getAllItems();
    if (existing.length === 0) {
      const mockItems: MarketplaceItem[] = [
        {
          id: 1,
          title: 'Roupas de Inverno',
          description: 'Precisamos de casacos, blusas e calças de inverno para distribuir em nossa campanha do agasalho',
          category: 'Roupas',
          quantity: 50,
          condition: 'used',
          urgency: 'high',
          ongEmail: 'ong@somar.com',
          ongName: 'ONG Esperança',
          location: 'São Paulo, SP',
          status: 'available',
          createdAt: new Date('2024-11-01')
        },
        {
          id: 2,
          title: 'Alimentos Não Perecíveis',
          description: 'Arroz, feijão, macarrão, óleo e outros alimentos não perecíveis para cestas básicas',
          category: 'Alimentos',
          quantity: 100,
          condition: 'new',
          urgency: 'high',
          ongEmail: 'ong@somar.com',
          ongName: 'ONG Esperança',
          location: 'São Paulo, SP',
          status: 'available',
          createdAt: new Date('2024-11-02')
        },
        {
          id: 3,
          title: 'Material Escolar',
          description: 'Cadernos, lápis, canetas, mochilas para o ano letivo',
          category: 'Educação',
          quantity: 30,
          condition: 'new',
          urgency: 'medium',
          ongEmail: 'admin@somar.com',
          ongName: 'Lar Feliz',
          location: 'Porto Alegre, RS',
          status: 'available',
          createdAt: new Date('2024-11-03')
        }
      ];
      this.saveItems(mockItems);
    }
  }

  private getAllItems(): MarketplaceItem[] {
    const data = sessionStorage.getItem(this.itemsKey);
    return data ? JSON.parse(data) : [];
  }

  private saveItems(items: MarketplaceItem[]) {
    sessionStorage.setItem(this.itemsKey, JSON.stringify(items));
  }

  private getAllReservations(): ItemReservation[] {
    const data = sessionStorage.getItem(this.reservationsKey);
    return data ? JSON.parse(data) : [];
  }

  private saveReservations(reservations: ItemReservation[]) {
    sessionStorage.setItem(this.reservationsKey, JSON.stringify(reservations));
  }

  getItems(filters?: {
    category?: string;
    urgency?: string;
    condition?: string;
    ongEmail?: string;
    search?: string;
  }): MarketplaceItem[] {
    let items = this.getAllItems();

    if (filters) {
      if (filters.category && filters.category !== 'all') {
        items = items.filter(i => i.category === filters.category);
      }
      if (filters.urgency && filters.urgency !== 'all') {
        items = items.filter(i => i.urgency === filters.urgency);
      }
      if (filters.condition && filters.condition !== 'all') {
        items = items.filter(i => i.condition === filters.condition);
      }
      if (filters.ongEmail) {
        items = items.filter(i => i.ongEmail === filters.ongEmail);
      }
      if (filters.search) {
        const search = filters.search.toLowerCase();
        items = items.filter(i => 
          i.title.toLowerCase().includes(search) ||
          i.description.toLowerCase().includes(search) ||
          i.ongName.toLowerCase().includes(search)
        );
      }
    }

    return items.filter(i => i.status === 'available');
  }

  getItemById(id: number): MarketplaceItem | undefined {
    return this.getAllItems().find(i => i.id === id);
  }

  createItem(item: Omit<MarketplaceItem, 'id' | 'createdAt' | 'status'>): MarketplaceItem {
    const items = this.getAllItems();
    const newItem: MarketplaceItem = {
      ...item,
      id: items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1,
      status: 'available',
      createdAt: new Date()
    };
    items.push(newItem);
    this.saveItems(items);
    return newItem;
  }

  updateItem(id: number, updates: Partial<MarketplaceItem>) {
    const items = this.getAllItems();
    const index = items.findIndex(i => i.id === id);
    if (index !== -1) {
      items[index] = { ...items[index], ...updates };
      this.saveItems(items);
    }
  }

  deleteItem(id: number) {
    const items = this.getAllItems().filter(i => i.id !== id);
    this.saveItems(items);
  }

  reserveItem(itemId: number, reservation: Omit<ItemReservation, 'id' | 'createdAt' | 'status'>): boolean {
    const item = this.getItemById(itemId);
    if (!item || item.status !== 'available') {
      return false;
    }

    const reservations = this.getAllReservations();
    const newReservation: ItemReservation = {
      ...reservation,
      id: reservations.length > 0 ? Math.max(...reservations.map(r => r.id)) + 1 : 1,
      status: 'pending',
      createdAt: new Date()
    };

    reservations.push(newReservation);
    this.saveReservations(reservations);

    // Atualizar status do item
    const reservedUntil = new Date();
    reservedUntil.setHours(reservedUntil.getHours() + 48); // 48h para confirmar

    this.updateItem(itemId, {
      status: 'reserved',
      reservedBy: reservation.donorEmail,
      reservedUntil
    });

    return true;
  }

  getReservationsByDonor(donorEmail: string): ItemReservation[] {
    return this.getAllReservations().filter(r => r.donorEmail === donorEmail);
  }

  getReservationsByOng(ongEmail: string): ItemReservation[] {
    const items = this.getAllItems().filter(i => i.ongEmail === ongEmail);
    const itemIds = items.map(i => i.id);
    return this.getAllReservations().filter(r => itemIds.includes(r.itemId));
  }

  updateReservationStatus(reservationId: number, status: ItemReservation['status']) {
    const reservations = this.getAllReservations();
    const reservation = reservations.find(r => r.id === reservationId);
    
    if (!reservation) return;
    
    reservation.status = status;
    this.saveReservations(reservations);

    // Se cancelado ou completado, liberar item
    if (status === 'cancelled' || status === 'completed') {
      const item = this.getItemById(reservation.itemId);
      if (item) {
        this.updateItem(item.id, {
          status: status === 'completed' ? 'fulfilled' : 'available',
          reservedBy: undefined,
          reservedUntil: undefined
        });
      }
    }
  }

  checkExpiredReservations() {
    const items = this.getAllItems();
    const now = new Date();

    items.forEach(item => {
      if (item.status === 'reserved' && item.reservedUntil && new Date(item.reservedUntil) < now) {
        this.updateItem(item.id, {
          status: 'available',
          reservedBy: undefined,
          reservedUntil: undefined
        });
      }
    });
  }

  getMatchingItems(donorPreferences: { categories: string[] }): MarketplaceItem[] {
    return this.getItems().filter(item => 
      donorPreferences.categories.includes(item.category)
    ).sort((a, b) => {
      // Priorizar por urgência
      const urgencyOrder = { high: 3, medium: 2, low: 1 };
      return urgencyOrder[b.urgency] - urgencyOrder[a.urgency];
    });
  }
}
