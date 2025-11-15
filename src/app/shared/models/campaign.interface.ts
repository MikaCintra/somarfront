export interface Campaign {
  id: string;
  title: string;
  description: string;
  category: string;
  goal: number;
  goalType: 'items' | 'monetary';
  currentAmount?: number;
  itemsNeeded?: string[];
  imageUrl?: string;
  status: 'active' | 'completed' | 'cancelled';
  startDate: Date;
  endDate: Date;
  ongName: string;
  ongEmail: string;
  location: string;
  urgency: 'low' | 'medium' | 'high';
  tags?: string[];
  donations?: Donation[];
  volunteers?: VolunteerRegistration[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Donation {
  id: string;
  campaignId: string;
  donorName: string;
  donorEmail: string;
  item: string;
  quantity: number;
  date: Date;
  status: 'pending' | 'confirmed' | 'delivered';
  message?: string;
}

export interface VolunteerRegistration {
  id: string;
  campaignId: string;
  volunteerName: string;
  volunteerEmail: string;
  skills: string[];
  availability: string;
  registeredAt: Date;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  hours?: number;
}

export type CampaignResponse = {
  titulo: string;
  descricao: string;
  meta: number;
  localizacao: string;
}
