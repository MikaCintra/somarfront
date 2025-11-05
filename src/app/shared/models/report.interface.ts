export interface ReportConfig {
  id: string;
  name: string;
  type: 'daily' | 'weekly' | 'monthly' | 'custom';
  format: 'pdf' | 'excel' | 'csv';
  recipients: string[];
  active: boolean;
  includeMetrics: boolean;
  includeCampaigns: boolean;
  includeVolunteers: boolean;
  includeDonations: boolean;
  lastGenerated?: Date;
  nextScheduled?: Date;
  createdAt: Date;
  createdBy: string;
}

export interface GeneratedReport {
  id: string;
  configId: string;
  name: string;
  type: string;
  format: string;
  generatedAt: Date;
  fileUrl: string;
  fileSize: number;
  status: 'processing' | 'completed' | 'failed';
}

export interface ReportMetrics {
  totalCampaigns: number;
  activeCampaigns: number;
  completedCampaigns: number;
  totalDonations: number;
  totalVolunteers: number;
  totalHours: number;
  itemsCollected: number;
  period: {
    start: Date;
    end: Date;
  };
}
