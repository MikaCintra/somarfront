import { DonorProfile } from '../models/user.interface';

/**
 * Lista fictícia de doadores para desenvolvimento e testes
 */
export const MOCK_DONORS: DonorProfile[] = [
  {
    id: '1',
    email: 'maria.silva@email.com',
    name: 'Maria Silva',
    userType: 'doador',
    avatarUrl: 'https://i.pravatar.cc/150?img=1',
    phoneNumber: '(11) 98765-4321',
    createdAt: new Date('2024-01-15'),
    lastLogin: new Date('2025-11-03'),
    isActive: true,
    cpf: '123.456.789-00',
    address: {
      street: 'Rua das Flores',
      number: '123',
      complement: 'Apto 45',
      neighborhood: 'Jardim Primavera',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01234-567',
      country: 'Brasil'
    },
    interests: ['Educação', 'Saúde', 'Meio Ambiente'],
    totalDonations: 45,
    totalVolunteerHours: 120,
    badges: [
      {
        id: 'badge-1',
        name: 'Primeira Doação',
        description: 'Realizou sua primeira doação',
        icon: '🎁',
        earnedAt: new Date('2024-01-20'),
        category: 'donation'
      },
      {
        id: 'badge-2',
        name: 'Voluntário Dedicado',
        description: 'Completou 100 horas de voluntariado',
        icon: '⭐',
        earnedAt: new Date('2024-08-15'),
        category: 'volunteer'
      }
    ],
    level: 8,
    points: 4250
  },
  {
    id: '2',
    email: 'joao.santos@email.com',
    name: 'João Santos',
    userType: 'doador',
    avatarUrl: 'https://i.pravatar.cc/150?img=12',
    phoneNumber: '(21) 99876-5432',
    createdAt: new Date('2024-03-10'),
    lastLogin: new Date('2025-11-04'),
    isActive: true,
    cpf: '987.654.321-00',
    address: {
      street: 'Av. Atlântica',
      number: '500',
      neighborhood: 'Copacabana',
      city: 'Rio de Janeiro',
      state: 'RJ',
      zipCode: '22070-000',
      country: 'Brasil'
    },
    interests: ['Alimentação', 'Moradia', 'Cultura'],
    totalDonations: 28,
    totalVolunteerHours: 65,
    badges: [
      {
        id: 'badge-3',
        name: 'Doador Bronze',
        description: 'Realizou 10 doações',
        icon: '🥉',
        earnedAt: new Date('2024-06-20'),
        category: 'donation'
      }
    ],
    level: 5,
    points: 2180
  },
  {
    id: '3',
    email: 'ana.costa@email.com',
    name: 'Ana Costa',
    userType: 'doador',
    avatarUrl: 'https://i.pravatar.cc/150?img=5',
    phoneNumber: '(31) 98123-4567',
    createdAt: new Date('2023-11-05'),
    lastLogin: new Date('2025-11-02'),
    isActive: true,
    cpf: '456.789.123-00',
    address: {
      street: 'Rua da Bahia',
      number: '789',
      complement: 'Sala 12',
      neighborhood: 'Centro',
      city: 'Belo Horizonte',
      state: 'MG',
      zipCode: '30160-011',
      country: 'Brasil'
    },
    interests: ['Animais', 'Meio Ambiente', 'Vestuário'],
    totalDonations: 89,
    totalVolunteerHours: 245,
    badges: [
      {
        id: 'badge-4',
        name: 'Doador Ouro',
        description: 'Realizou 50 doações',
        icon: '🥇',
        earnedAt: new Date('2024-09-10'),
        category: 'donation'
      },
      {
        id: 'badge-5',
        name: 'Super Voluntário',
        description: 'Completou 200 horas de voluntariado',
        icon: '🌟',
        earnedAt: new Date('2024-10-25'),
        category: 'volunteer'
      },
      {
        id: 'badge-6',
        name: 'Engajamento Máximo',
        description: 'Ativo por 12 meses consecutivos',
        icon: '🔥',
        earnedAt: new Date('2024-11-05'),
        category: 'engagement'
      }
    ],
    level: 12,
    points: 7850
  },
  {
    id: '4',
    email: 'pedro.oliveira@email.com',
    name: 'Pedro Oliveira',
    userType: 'doador',
    avatarUrl: 'https://i.pravatar.cc/150?img=15',
    phoneNumber: '(41) 99234-5678',
    createdAt: new Date('2024-05-20'),
    lastLogin: new Date('2025-10-30'),
    isActive: true,
    cpf: '321.654.987-00',
    address: {
      street: 'Rua XV de Novembro',
      number: '1500',
      neighborhood: 'Centro',
      city: 'Curitiba',
      state: 'PR',
      zipCode: '80060-000',
      country: 'Brasil'
    },
    interests: ['Esporte', 'Educação', 'Tecnologia'],
    totalDonations: 15,
    totalVolunteerHours: 30,
    badges: [
      {
        id: 'badge-7',
        name: 'Primeira Doação',
        description: 'Realizou sua primeira doação',
        icon: '🎁',
        earnedAt: new Date('2024-05-25'),
        category: 'donation'
      }
    ],
    level: 3,
    points: 980
  },
  {
    id: '5',
    email: 'julia.ferreira@email.com',
    name: 'Júlia Ferreira',
    userType: 'doador',
    avatarUrl: 'https://i.pravatar.cc/150?img=9',
    phoneNumber: '(51) 98345-6789',
    createdAt: new Date('2024-02-14'),
    lastLogin: new Date('2025-11-04'),
    isActive: true,
    cpf: '654.321.987-00',
    address: {
      street: 'Av. Borges de Medeiros',
      number: '2500',
      neighborhood: 'Centro Histórico',
      city: 'Porto Alegre',
      state: 'RS',
      zipCode: '90110-150',
      country: 'Brasil'
    },
    interests: ['Saúde', 'Alimentação', 'Moradia'],
    totalDonations: 52,
    totalVolunteerHours: 95,
    badges: [
      {
        id: 'badge-8',
        name: 'Doador Prata',
        description: 'Realizou 25 doações',
        icon: '🥈',
        earnedAt: new Date('2024-07-18'),
        category: 'donation'
      },
      {
        id: 'badge-9',
        name: 'Voluntário Ativo',
        description: 'Completou 50 horas de voluntariado',
        icon: '💪',
        earnedAt: new Date('2024-09-05'),
        category: 'volunteer'
      }
    ],
    level: 7,
    points: 3640
  },
  {
    id: '6',
    email: 'carlos.mendes@email.com',
    name: 'Carlos Mendes',
    userType: 'doador',
    avatarUrl: 'https://i.pravatar.cc/150?img=13',
    phoneNumber: '(71) 99456-7890',
    createdAt: new Date('2023-09-08'),
    lastLogin: new Date('2025-11-01'),
    isActive: true,
    cpf: '789.123.456-00',
    address: {
      street: 'Av. Sete de Setembro',
      number: '3200',
      neighborhood: 'Barra',
      city: 'Salvador',
      state: 'BA',
      zipCode: '40140-110',
      country: 'Brasil'
    },
    interests: ['Cultura', 'Meio Ambiente', 'Educação'],
    totalDonations: 67,
    totalVolunteerHours: 180,
    badges: [
      {
        id: 'badge-10',
        name: 'Doador Ouro',
        description: 'Realizou 50 doações',
        icon: '🥇',
        earnedAt: new Date('2024-05-22'),
        category: 'donation'
      },
      {
        id: 'badge-11',
        name: 'Voluntário Dedicado',
        description: 'Completou 100 horas de voluntariado',
        icon: '⭐',
        earnedAt: new Date('2024-08-30'),
        category: 'volunteer'
      }
    ],
    level: 10,
    points: 5920
  },
  {
    id: '7',
    email: 'fernanda.alves@email.com',
    name: 'Fernanda Alves',
    userType: 'doador',
    avatarUrl: 'https://i.pravatar.cc/150?img=20',
    phoneNumber: '(81) 98567-8901',
    createdAt: new Date('2024-06-12'),
    lastLogin: new Date('2025-11-03'),
    isActive: true,
    cpf: '147.258.369-00',
    address: {
      street: 'Rua do Cupim',
      number: '150',
      neighborhood: 'Boa Viagem',
      city: 'Recife',
      state: 'PE',
      zipCode: '51020-280',
      country: 'Brasil'
    },
    interests: ['Animais', 'Vestuário', 'Alimentação'],
    totalDonations: 22,
    totalVolunteerHours: 48,
    badges: [
      {
        id: 'badge-12',
        name: 'Doador Bronze',
        description: 'Realizou 10 doações',
        icon: '🥉',
        earnedAt: new Date('2024-08-20'),
        category: 'donation'
      }
    ],
    level: 4,
    points: 1560
  },
  {
    id: '8',
    email: 'ricardo.lima@email.com',
    name: 'Ricardo Lima',
    userType: 'doador',
    avatarUrl: 'https://i.pravatar.cc/150?img=33',
    phoneNumber: '(85) 99678-9012',
    createdAt: new Date('2023-12-01'),
    lastLogin: new Date('2025-11-04'),
    isActive: true,
    cpf: '258.369.147-00',
    address: {
      street: 'Av. Beira Mar',
      number: '4500',
      neighborhood: 'Meireles',
      city: 'Fortaleza',
      state: 'CE',
      zipCode: '60165-121',
      country: 'Brasil'
    },
    interests: ['Esporte', 'Saúde', 'Tecnologia'],
    totalDonations: 78,
    totalVolunteerHours: 210,
    badges: [
      {
        id: 'badge-13',
        name: 'Doador Ouro',
        description: 'Realizou 50 doações',
        icon: '🥇',
        earnedAt: new Date('2024-07-10'),
        category: 'donation'
      },
      {
        id: 'badge-14',
        name: 'Super Voluntário',
        description: 'Completou 200 horas de voluntariado',
        icon: '🌟',
        earnedAt: new Date('2024-09-28'),
        category: 'volunteer'
      },
      {
        id: 'badge-15',
        name: 'MVP',
        description: 'Doador destaque do mês',
        icon: '👑',
        earnedAt: new Date('2024-10-01'),
        category: 'special'
      }
    ],
    level: 11,
    points: 6890
  },
  {
    id: '9',
    email: 'patricia.rocha@email.com',
    name: 'Patrícia Rocha',
    userType: 'doador',
    avatarUrl: 'https://i.pravatar.cc/150?img=23',
    phoneNumber: '(62) 98789-0123',
    createdAt: new Date('2024-04-25'),
    lastLogin: new Date('2025-10-28'),
    isActive: true,
    cpf: '369.147.258-00',
    address: {
      street: 'Rua T-37',
      number: '680',
      neighborhood: 'Setor Bueno',
      city: 'Goiânia',
      state: 'GO',
      zipCode: '74215-130',
      country: 'Brasil'
    },
    interests: ['Educação', 'Cultura', 'Moradia'],
    totalDonations: 34,
    totalVolunteerHours: 72,
    badges: [
      {
        id: 'badge-16',
        name: 'Doador Prata',
        description: 'Realizou 25 doações',
        icon: '🥈',
        earnedAt: new Date('2024-09-12'),
        category: 'donation'
      },
      {
        id: 'badge-17',
        name: 'Voluntário Ativo',
        description: 'Completou 50 horas de voluntariado',
        icon: '💪',
        earnedAt: new Date('2024-10-05'),
        category: 'volunteer'
      }
    ],
    level: 6,
    points: 2890
  },
  {
    id: '10',
    email: 'roberto.cardoso@email.com',
    name: 'Roberto Cardoso',
    userType: 'doador',
    avatarUrl: 'https://i.pravatar.cc/150?img=52',
    phoneNumber: '(92) 99890-1234',
    createdAt: new Date('2024-01-30'),
    lastLogin: new Date('2025-11-02'),
    isActive: true,
    cpf: '741.852.963-00',
    address: {
      street: 'Av. Eduardo Ribeiro',
      number: '920',
      neighborhood: 'Centro',
      city: 'Manaus',
      state: 'AM',
      zipCode: '69010-001',
      country: 'Brasil'
    },
    interests: ['Meio Ambiente', 'Animais', 'Alimentação'],
    totalDonations: 41,
    totalVolunteerHours: 88,
    badges: [
      {
        id: 'badge-18',
        name: 'Doador Prata',
        description: 'Realizou 25 doações',
        icon: '🥈',
        earnedAt: new Date('2024-08-05'),
        category: 'donation'
      }
    ],
    level: 6,
    points: 3120
  }
];

/**
 * Estatísticas gerais dos doadores
 */
export const DONORS_STATS = {
  total: MOCK_DONORS.length,
  active: MOCK_DONORS.filter(d => d.isActive).length,
  totalDonations: MOCK_DONORS.reduce((sum, d) => sum + d.totalDonations, 0),
  totalVolunteerHours: MOCK_DONORS.reduce((sum, d) => sum + d.totalVolunteerHours, 0),
  averageDonationsPerDonor: Math.round(
    MOCK_DONORS.reduce((sum, d) => sum + d.totalDonations, 0) / MOCK_DONORS.length
  ),
  averageVolunteerHoursPerDonor: Math.round(
    MOCK_DONORS.reduce((sum, d) => sum + d.totalVolunteerHours, 0) / MOCK_DONORS.length
  ),
  topDonor: MOCK_DONORS.reduce((prev, current) => 
    (prev.totalDonations > current.totalDonations) ? prev : current
  ),
  mostActiveVolunteer: MOCK_DONORS.reduce((prev, current) => 
    (prev.totalVolunteerHours > current.totalVolunteerHours) ? prev : current
  )
};

/**
 * Doadores por estado
 */
export const DONORS_BY_STATE = MOCK_DONORS.reduce((acc, donor) => {
  const state = donor.address?.state;
  if (state) {
    acc[state] = (acc[state] || 0) + 1;
  }
  return acc;
}, {} as Record<string, number>);

/**
 * Doadores por nível
 */
export const DONORS_BY_LEVEL = MOCK_DONORS.reduce((acc, donor) => {
  const level = donor.level;
  acc[level] = (acc[level] || 0) + 1;
  return acc;
}, {} as Record<number, number>);

/**
 * Interesses mais populares
 */
export const POPULAR_INTERESTS = MOCK_DONORS
  .flatMap(d => d.interests)
  .reduce((acc, interest) => {
    acc[interest] = (acc[interest] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
