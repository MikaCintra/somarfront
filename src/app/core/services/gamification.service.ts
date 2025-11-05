import { Injectable } from '@angular/core';

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  requirement: number;
  type: 'bronze' | 'silver' | 'gold' | 'platinum';
}

export interface Achievement {
  badgeId: string;
  unlockedAt: Date;
  progress: number;
}

export interface UserGamification {
  userEmail: string;
  level: number;
  points: number;
  achievements: Achievement[];
  totalDonations: number;
  totalVolunteerHours: number;
  streakDays: number;
  lastActivityDate: Date;
}

@Injectable({
  providedIn: 'root'
})
export class GamificationService {
  private storageKey = 'somar-gamification';

  private badges: Badge[] = [
    {
      id: 'first-donation',
      name: 'Primeira Doação',
      description: 'Realize sua primeira doação',
      icon: '🎁',
      requirement: 1,
      type: 'bronze'
    },
    {
      id: 'generous-donor',
      name: 'Doador Generoso',
      description: 'Realize 10 doações',
      icon: '💝',
      requirement: 10,
      type: 'silver'
    },
    {
      id: 'super-donor',
      name: 'Super Doador',
      description: 'Realize 50 doações',
      icon: '⭐',
      requirement: 50,
      type: 'gold'
    },
    {
      id: 'donation-legend',
      name: 'Lenda das Doações',
      description: 'Realize 100 doações',
      icon: '👑',
      requirement: 100,
      type: 'platinum'
    },
    {
      id: 'volunteer-starter',
      name: 'Voluntário Iniciante',
      description: 'Participe de 1 ação voluntária',
      icon: '🤝',
      requirement: 1,
      type: 'bronze'
    },
    {
      id: 'dedicated-volunteer',
      name: 'Voluntário Dedicado',
      description: 'Complete 20 horas de voluntariado',
      icon: '💪',
      requirement: 20,
      type: 'silver'
    },
    {
      id: 'streak-7',
      name: 'Semana de Impacto',
      description: 'Mantenha 7 dias consecutivos de atividade',
      icon: '🔥',
      requirement: 7,
      type: 'bronze'
    },
    {
      id: 'streak-30',
      name: 'Mês de Impacto',
      description: 'Mantenha 30 dias consecutivos de atividade',
      icon: '🚀',
      requirement: 30,
      type: 'gold'
    },
    {
      id: 'category-master',
      name: 'Especialista em Categorias',
      description: 'Doe para 5 categorias diferentes',
      icon: '🎯',
      requirement: 5,
      type: 'silver'
    },
    {
      id: 'community-hero',
      name: 'Herói da Comunidade',
      description: 'Alcance 1000 pontos',
      icon: '🦸',
      requirement: 1000,
      type: 'platinum'
    }
  ];

  constructor() {}

  getUserGamification(userEmail: string): UserGamification {
    const data = sessionStorage.getItem(this.storageKey);
    const all: UserGamification[] = data ? JSON.parse(data) : [];
    
    let user = all.find(u => u.userEmail === userEmail);
    if (!user) {
      user = {
        userEmail,
        level: 1,
        points: 0,
        achievements: [],
        totalDonations: 0,
        totalVolunteerHours: 0,
        streakDays: 0,
        lastActivityDate: new Date()
      };
      all.push(user);
      this.saveAll(all);
    }
    
    return user;
  }

  private saveAll(data: UserGamification[]) {
    sessionStorage.setItem(this.storageKey, JSON.stringify(data));
  }

  addPoints(userEmail: string, points: number, activity: 'donation' | 'volunteer' | 'review') {
    const data = sessionStorage.getItem(this.storageKey);
    const all: UserGamification[] = data ? JSON.parse(data) : [];
    let user = all.find(u => u.userEmail === userEmail);
    
    if (!user) {
      user = this.getUserGamification(userEmail);
      all.push(user);
    }

    user.points += points;
    user.level = this.calculateLevel(user.points);
    
    // Atualizar streak
    this.updateStreak(user);
    
    // Atualizar contadores
    if (activity === 'donation') {
      user.totalDonations += 1;
    }
    
    // Verificar conquistas
    this.checkAchievements(user);
    
    this.saveAll(all);
    return user;
  }

  private calculateLevel(points: number): number {
    // Cada nível requer 100 pontos a mais que o anterior
    return Math.floor(Math.sqrt(points / 50)) + 1;
  }

  private updateStreak(user: UserGamification) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const lastActivity = new Date(user.lastActivityDate);
    lastActivity.setHours(0, 0, 0, 0);
    
    const diffTime = today.getTime() - lastActivity.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      // Mesma data, mantém streak
      return;
    } else if (diffDays === 1) {
      // Dia consecutivo, incrementa streak
      user.streakDays += 1;
    } else {
      // Quebrou o streak
      user.streakDays = 1;
    }
    
    user.lastActivityDate = new Date();
  }

  private checkAchievements(user: UserGamification) {
    this.badges.forEach(badge => {
      const hasAchievement = user.achievements.some(a => a.badgeId === badge.id);
      if (hasAchievement) return;

      let progress = 0;
      let unlocked = false;

      switch (badge.id) {
        case 'first-donation':
        case 'generous-donor':
        case 'super-donor':
        case 'donation-legend':
          progress = user.totalDonations;
          unlocked = user.totalDonations >= badge.requirement;
          break;
          
        case 'volunteer-starter':
        case 'dedicated-volunteer':
          progress = user.totalVolunteerHours;
          unlocked = user.totalVolunteerHours >= badge.requirement;
          break;
          
        case 'streak-7':
        case 'streak-30':
          progress = user.streakDays;
          unlocked = user.streakDays >= badge.requirement;
          break;
          
        case 'community-hero':
          progress = user.points;
          unlocked = user.points >= badge.requirement;
          break;
      }

      if (unlocked) {
        user.achievements.push({
          badgeId: badge.id,
          unlockedAt: new Date(),
          progress: badge.requirement
        });
      }
    });
  }

  getBadges(): Badge[] {
    return this.badges;
  }

  getUserBadges(userEmail: string): { badge: Badge; achievement: Achievement | null }[] {
    const user = this.getUserGamification(userEmail);
    
    return this.badges.map(badge => {
      const achievement = user.achievements.find(a => a.badgeId === badge.id) || null;
      return { badge, achievement };
    });
  }

  getLeaderboard(limit: number = 10): Array<{ userEmail: string; level: number; points: number; rank: number }> {
    const data = sessionStorage.getItem(this.storageKey);
    const all: UserGamification[] = data ? JSON.parse(data) : [];
    
    return all
      .sort((a, b) => b.points - a.points)
      .slice(0, limit)
      .map((user, index) => ({
        userEmail: user.userEmail,
        level: user.level,
        points: user.points,
        rank: index + 1
      }));
  }

  getPointsForActivity(activity: 'donation' | 'volunteer' | 'review' | 'share'): number {
    const points: { [key: string]: number } = {
      'donation': 50,
      'volunteer': 100,
      'review': 25,
      'share': 10
    };
    return points[activity] || 0;
  }
}
