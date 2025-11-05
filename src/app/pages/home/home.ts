import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  
  features = [
    {
      icon: '🤝',
      title: 'Conexão Direta',
      description: 'Conecte-se diretamente com ONGs verificadas e projetos sociais da sua região'
    },
    {
      icon: '💝',
      title: 'Doações Transparentes',
      description: 'Doe itens, alimentos, roupas e mais com total transparência sobre o destino'
    },
    {
      icon: '🌟',
      title: 'Voluntariado Ativo',
      description: 'Encontre oportunidades de voluntariado que combinam com suas habilidades'
    },
    {
      icon: '📊',
      title: 'Impacto Mensurável',
      description: 'Acompanhe o impacto real das suas contribuições e ações voluntárias'
    }
  ];

  howItWorks = [
    {
      step: '1',
      title: 'Cadastre-se',
      description: 'Crie sua conta como doador, voluntário ou ONG'
    },
    {
      step: '2',
      title: 'Explore',
      description: 'Descubra campanhas e iniciativas próximas a você'
    },
    {
      step: '3',
      title: 'Contribua',
      description: 'Doe itens ou ofereça seu tempo como voluntário'
    },
    {
      step: '4',
      title: 'Acompanhe',
      description: 'Veja o impacto real da sua contribuição'
    }
  ];

  constructor(private router: Router) {}

  navigateToSignup() {
    this.router.navigate(['/signup']);
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
