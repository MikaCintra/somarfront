export interface MarketplaceItem {
  id: string;
  title: string;
  description: string;
  category: string;
  condition: 'new' | 'used' | 'any';
  quantity: number;
  location: string;
  imageUrl?: string;
  donorEmail?: string;
  donorName?: string;
  ongEmail?: string;
  ongName?: string;
  status: 'available' | 'reserved' | 'fulfilled';
  tags?: string[];
  createdAt: Date;
  updatedAt?: Date;
  expiresAt?: Date;
}

export interface ItemReservation {
  id: string;
  itemId: string;
  donorEmail: string;
  ongEmail: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  reservedAt: Date;
  expiresAt?: Date;
  completedAt?: Date;
  notes?: string;
  // Computed properties
  itemName?: string;
  ongName?: string;
}

export interface MarketplaceFilters {
  category?: string;
  condition?: 'new' | 'used' | 'any';
  location?: string;
  status?: 'available' | 'reserved' | 'fulfilled';
  search?: string;
}
