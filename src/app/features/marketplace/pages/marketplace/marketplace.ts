import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MarketplaceService, MarketplaceItem, ItemReservation } from '../../services/marketplace.service';
import { ThemeLanguageToggle } from '../../../../shared/components/theme-language-toggle/theme-language-toggle';

@Component({
  selector: 'app-marketplace',
  standalone: true,
  imports: [CommonModule, FormsModule, ThemeLanguageToggle],
  templateUrl: './marketplace.html',
  styleUrl: './marketplace.scss'
})
export class MarketplaceComponent implements OnInit {
  // Lists
  availableItems: MarketplaceItem[] = [];
  myWishlist: MarketplaceItem[] = [];
  myReservations: Array<ItemReservation & { itemName?: string; ongName?: string; reservedAt?: Date; expiresAt?: Date; completedAt?: Date }> = [];
  
  // Filters
  selectedCategory: string = 'all';
  selectedUrgency: string = 'all';
  selectedCondition: string = 'all';
  searchTerm: string = '';
  
  // View state
  activeTab: 'available' | 'wishlist' | 'reservations' = 'available';
  isONG: boolean = false;
  
  // Modal state
  showAddItemModal: boolean = false;
  showMatchModal: boolean = false;
  selectedItem: MarketplaceItem | null = null;
  
  // New item form
  newItem: {
    title?: string;
    description?: string;
    category?: string;
    urgency?: 'high' | 'medium' | 'low';
    condition?: 'new' | 'used' | 'any';
    quantity?: number;
  } = {
    category: 'food',
    urgency: 'medium',
    condition: 'new',
    quantity: 1
  };
  
  // Categories
  categories = [
    { value: 'all', label: 'Todas Categorias', icon: '📦' },
    { value: 'food', label: 'Alimentos', icon: '🍎' },
    { value: 'clothing', label: 'Roupas', icon: '👕' },
    { value: 'hygiene', label: 'Higiene', icon: '🧼' },
    { value: 'furniture', label: 'Móveis', icon: '🪑' },
    { value: 'electronics', label: 'Eletrônicos', icon: '💻' },
    { value: 'toys', label: 'Brinquedos', icon: '🧸' },
    { value: 'books', label: 'Livros', icon: '📚' },
    { value: 'other', label: 'Outros', icon: '📦' }
  ];
  
  urgencyLevels = [
    { value: 'all', label: 'Todas Urgências' },
    { value: 'high', label: 'Alta', color: '#ef4444' },
    { value: 'medium', label: 'Média', color: '#f59e0b' },
    { value: 'low', label: 'Baixa', color: '#10b981' }
  ];
  
  conditions = [
    { value: 'all', label: 'Todas Condições' },
    { value: 'new', label: 'Novo', icon: '✨' },
    { value: 'used-good', label: 'Usado - Bom', icon: '👍' },
    { value: 'used-fair', label: 'Usado - Regular', icon: '👌' }
  ];

  constructor(private marketplaceService: MarketplaceService) {}

  ngOnInit() {
    // Check user type from session
    const userSession = sessionStorage.getItem('userSession');
    if (userSession) {
      const session = JSON.parse(userSession);
      this.isONG = session.type === 'ong';
    }
    
    this.loadData();
  }
  
  loadData() {
    this.loadAvailableItems();
    this.loadWishlist();
    this.loadReservations();
  }
  
  loadAvailableItems() {
    const items = this.marketplaceService.getItems({
      category: this.selectedCategory !== 'all' ? this.selectedCategory : undefined,
      urgency: this.selectedUrgency !== 'all' ? this.selectedUrgency as any : undefined,
      condition: this.selectedCondition !== 'all' ? this.selectedCondition as any : undefined,
      search: this.searchTerm
    });
    this.availableItems = items;
  }
  
  loadWishlist() {
    if (this.isONG) {
      const userSession = sessionStorage.getItem('userSession');
      if (userSession) {
        const session = JSON.parse(userSession);
        // Filter items by ONG email
        this.myWishlist = this.marketplaceService.getItems({ ongEmail: session.email });
      }
    }
  }
  
  loadReservations() {
    if (!this.isONG) {
      const userSession = sessionStorage.getItem('userSession');
      if (userSession) {
        const session = JSON.parse(userSession);
        // Get reservations by donor email
        const reservations = this.marketplaceService.getReservationsByDonor(session.email);
        // Map to expected format
        this.myReservations = reservations.map(r => ({
          ...r,
          itemName: this.marketplaceService.getItemById(r.itemId)?.title || 'Item',
          ongName: this.marketplaceService.getItemById(r.itemId)?.ongName || 'ONG',
          reservedAt: r.createdAt,
          expiresAt: this.calculateExpirationDate(r.createdAt),
          completedAt: r.status === 'completed' ? new Date() : undefined
        }));
      }
    }
  }
  
  calculateExpirationDate(reservedAt: Date): Date {
    const expiration = new Date(reservedAt);
    expiration.setHours(expiration.getHours() + 48);
    return expiration;
  }
  
  onFilterChange() {
    this.loadAvailableItems();
  }
  
  onSearch() {
    this.loadAvailableItems();
  }
  
  getCategoryIcon(category: string): string {
    return this.categories.find(c => c.value === category)?.icon || '📦';
  }
  
  getUrgencyColor(urgency: string): string {
    return this.urgencyLevels.find(u => u.value === urgency)?.color || '#6b7280';
  }
  
  getConditionIcon(condition: string): string {
    return this.conditions.find(c => c.value === condition)?.icon || '📦';
  }
  
  getTimeRemaining(expiresAt: Date): string {
    const now = new Date();
    const expires = new Date(expiresAt);
    const diff = expires.getTime() - now.getTime();
    
    if (diff <= 0) return 'Expirado';
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hours}h ${minutes}m`;
  }
  
  // Actions for donors
  reserveItem(item: MarketplaceItem) {
    const userSession = sessionStorage.getItem('userSession');
    if (!userSession) return;
    
    const session = JSON.parse(userSession);
    const success = this.marketplaceService.reserveItem(item.id, {
      itemId: item.id,
      donorEmail: session.email,
      donorName: session.name,
      quantity: 1,
      message: ''
    });
    
    if (success) {
      alert(`Item reservado com sucesso! Você tem 48h para completar a doação.`);
      this.loadData();
    } else {
      alert('Erro ao reservar item. Tente novamente.');
    }
  }
  
  completeReservation(reservation: ItemReservation & { itemName?: string; ongName?: string; reservedAt?: Date; expiresAt?: Date; completedAt?: Date }) {
    this.marketplaceService.updateReservationStatus(reservation.id, 'completed');
    alert('Doação completada com sucesso! Obrigado pela sua contribuição! 🎉');
    this.loadData();
  }
  
  cancelReservation(reservation: ItemReservation & { itemName?: string; ongName?: string; reservedAt?: Date; expiresAt?: Date; completedAt?: Date }) {
    if (confirm('Tem certeza que deseja cancelar esta reserva?')) {
      this.marketplaceService.updateReservationStatus(reservation.id, 'cancelled');
      alert('Reserva cancelada.');
      this.loadData();
    }
  }
  
  // Actions for ONGs
  openAddItemModal() {
    this.showAddItemModal = true;
    this.newItem = {
      category: 'food',
      urgency: 'medium',
      condition: 'new',
      quantity: 1
    };
  }
  
  closeAddItemModal() {
    this.showAddItemModal = false;
  }
  
  addItemToWishlist() {
    const userSession = sessionStorage.getItem('userSession');
    if (!userSession) return;
    
    const session = JSON.parse(userSession);
    
    if (!this.newItem.title || !this.newItem.description) {
      alert('Preencha todos os campos obrigatórios.');
      return;
    }
    
    const item = this.marketplaceService.createItem({
      title: this.newItem.title,
      description: this.newItem.description,
      category: this.newItem.category || 'Outros',
      urgency: this.newItem.urgency || 'medium',
      condition: this.newItem.condition || 'any',
      quantity: this.newItem.quantity || 1,
      ongEmail: session.email,
      ongName: session.name,
      location: session.location || 'Não informado'
    });
    
    alert('Item adicionado à lista de necessidades! ✅');
    this.closeAddItemModal();
    this.loadData();
  }
  
  removeFromWishlist(item: MarketplaceItem) {
    if (confirm('Remover este item da lista de necessidades?')) {
      this.marketplaceService.deleteItem(item.id);
      alert('Item removido.');
      this.loadData();
    }
  }
  
  viewMatches(item: MarketplaceItem) {
    this.selectedItem = item;
    this.showMatchModal = true;
  }
  
  closeMatchModal() {
    this.showMatchModal = false;
    this.selectedItem = null;
  }
  
  getMatchPercentage(item: MarketplaceItem): number {
    // Simple matching algorithm based on category and urgency
    return Math.floor(Math.random() * 30) + 70; // 70-100% for demo
  }
}
