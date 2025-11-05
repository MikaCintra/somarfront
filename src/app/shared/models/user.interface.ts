export interface User {
  id: string;
  email: string;
  name: string;
  userType: 'admin' | 'ong' | 'doador';
  avatarUrl?: string;
  phoneNumber?: string;
  createdAt: Date;
  lastLogin: Date;
  isActive: boolean;
}

export interface OngProfile extends User {
  userType: 'ong';
  cnpj?: string;
  description?: string;
  website?: string;
  address?: Address;
  socialMedia?: SocialMedia;
  causes: string[];
  verified: boolean;
  rating: number;
  totalCampaigns: number;
  totalDonationsReceived: number;
}

export interface DonorProfile extends User {
  userType: 'doador';
  cpf?: string;
  address?: Address;
  interests: string[];
  totalDonations: number;
  totalVolunteerHours: number;
  badges: Badge[];
  level: number;
  points: number;
}

export interface Address {
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface SocialMedia {
  facebook?: string;
  instagram?: string;
  twitter?: string;
  linkedin?: string;
  youtube?: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt: Date;
  category: 'donation' | 'volunteer' | 'engagement' | 'special';
}
