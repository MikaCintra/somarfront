export interface VolunteerOpportunity {
  id: string;
  title: string;
  description: string;
  ongName: string;
  ongEmail: string;
  category: string;
  location: string;
  schedule: string;
  duration: string;
  skillsRequired: string[];
  spotsAvailable: number;
  currentVolunteers: number;
  startDate: Date;
  endDate?: Date;
  isRemote: boolean;
  urgency: 'low' | 'medium' | 'high';
  status: 'active' | 'completed' | 'cancelled';
  imageUrl?: string;
  tags?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface VolunteerRegistration {
  id: string;
  opportunityId: string;
  volunteerName: string;
  volunteerEmail: string;
  skills: string[];
  availability: string;
  message?: string;
  registeredAt: Date;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  hours?: number;
  rating?: number;
  feedback?: string;
}

export interface VolunteerProfile {
  email: string;
  name: string;
  skills: string[];
  interests: string[];
  availability: string[];
  totalHours: number;
  completedOpportunities: number;
  rating: number;
  badges: string[];
  joinedAt: Date;
}
