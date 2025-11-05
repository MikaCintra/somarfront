import { Injectable } from '@angular/core';

export interface Review {
  id: number;
  campaignId: number;
  reviewerEmail: string;
  reviewerName: string;
  rating: number; // 1-5
  comment: string;
  createdAt: Date;
  status: 'pending' | 'approved' | 'rejected';
  helpful: number; // contador de "útil"
  helpfulVotes: string[]; // emails que votaram
}

export interface ReviewStats {
  averageRating: number;
  totalReviews: number;
  ratingDistribution: { [key: number]: number };
  recommendationRate: number;
}

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {
  private storageKey = 'somar-reviews';

  constructor() {
    this.initializeMockReviews();
  }

  private initializeMockReviews() {
    const existing = this.getAllReviews();
    if (existing.length === 0) {
      const mockReviews: Review[] = [
        {
          id: 1,
          campaignId: 1,
          reviewerEmail: 'joao@email.com',
          reviewerName: 'João Silva',
          rating: 5,
          comment: 'Excelente iniciativa! A ONG é muito organizada e transparente.',
          createdAt: new Date('2024-11-01'),
          status: 'approved',
          helpful: 12,
          helpfulVotes: []
        },
        {
          id: 2,
          campaignId: 1,
          reviewerEmail: 'maria@email.com',
          reviewerName: 'Maria Santos',
          rating: 4,
          comment: 'Muito boa campanha, consegui doar facilmente.',
          createdAt: new Date('2024-11-02'),
          status: 'approved',
          helpful: 8,
          helpfulVotes: []
        }
      ];
      this.saveReviews(mockReviews);
    }
  }

  private getAllReviews(): Review[] {
    const data = sessionStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  private saveReviews(reviews: Review[]) {
    sessionStorage.setItem(this.storageKey, JSON.stringify(reviews));
  }

  getReviewsByCampaign(campaignId: number, status?: 'pending' | 'approved' | 'rejected'): Review[] {
    const reviews = this.getAllReviews().filter(r => r.campaignId === campaignId);
    return status ? reviews.filter(r => r.status === status) : reviews;
  }

  getReviewStats(campaignId: number): ReviewStats {
    const reviews = this.getReviewsByCampaign(campaignId, 'approved');
    
    if (reviews.length === 0) {
      return {
        averageRating: 0,
        totalReviews: 0,
        ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
        recommendationRate: 0
      };
    }

    const totalRating = reviews.reduce((sum, r) => sum + r.rating, 0);
    const averageRating = totalRating / reviews.length;

    const ratingDistribution: { [key: number]: number } = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    reviews.forEach(r => {
      ratingDistribution[r.rating] = (ratingDistribution[r.rating] || 0) + 1;
    });

    const positiveReviews = reviews.filter(r => r.rating >= 4).length;
    const recommendationRate = (positiveReviews / reviews.length) * 100;

    return {
      averageRating: Math.round(averageRating * 10) / 10,
      totalReviews: reviews.length,
      ratingDistribution,
      recommendationRate: Math.round(recommendationRate)
    };
  }

  addReview(review: Omit<Review, 'id' | 'createdAt' | 'helpful' | 'helpfulVotes'>): Review {
    const reviews = this.getAllReviews();
    const newReview: Review = {
      ...review,
      id: reviews.length > 0 ? Math.max(...reviews.map(r => r.id)) + 1 : 1,
      createdAt: new Date(),
      helpful: 0,
      helpfulVotes: []
    };
    reviews.push(newReview);
    this.saveReviews(reviews);
    return newReview;
  }

  updateReviewStatus(reviewId: number, status: 'approved' | 'rejected') {
    const reviews = this.getAllReviews();
    const review = reviews.find(r => r.id === reviewId);
    if (review) {
      review.status = status;
      this.saveReviews(reviews);
    }
  }

  markAsHelpful(reviewId: number, userEmail: string): boolean {
    const reviews = this.getAllReviews();
    const review = reviews.find(r => r.id === reviewId);
    
    if (!review) return false;
    
    if (review.helpfulVotes.includes(userEmail)) {
      // Remove vote
      review.helpfulVotes = review.helpfulVotes.filter(e => e !== userEmail);
      review.helpful = Math.max(0, review.helpful - 1);
    } else {
      // Add vote
      review.helpfulVotes.push(userEmail);
      review.helpful += 1;
    }
    
    this.saveReviews(reviews);
    return true;
  }

  hasUserVoted(reviewId: number, userEmail: string): boolean {
    const review = this.getAllReviews().find(r => r.id === reviewId);
    return review ? review.helpfulVotes.includes(userEmail) : false;
  }

  canUserReview(campaignId: number, userEmail: string): boolean {
    const reviews = this.getReviewsByCampaign(campaignId);
    return !reviews.some(r => r.reviewerEmail === userEmail);
  }

  deleteReview(reviewId: number) {
    const reviews = this.getAllReviews().filter(r => r.id !== reviewId);
    this.saveReviews(reviews);
  }
}
