# 🤝 Somar - Conectando Solidariedade

<div align="center">
  <img src="public/svg/logo-somar.svg" alt="Logo Somar" width="120"/>
  
  ### Plataforma que conecta ONGs, doadores e voluntários
  
  [![Angular](https://img.shields.io/badge/Angular-20.3-red)](https://angular.io/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)](https://www.typescriptlang.org/)
  [![SCSS](https://img.shields.io/badge/SCSS-Powered-pink)](https://sass-lang.com/)
  [![API Ready](https://img.shields.io/badge/API-Ready-green)](./API-SPECIFICATION.md)
</div>

---

## 📖 Sobre o Projeto

A **Somar** é uma plataforma web que facilita a conexão entre organizações sociais e pessoas que desejam contribuir para um mundo melhor. Através dela, ONGs podem divulgar suas necessidades e campanhas, enquanto doadores e voluntários encontram oportunidades para fazer a diferença.

### 🎯 Problema/Necessidade

Muitas ONGs enfrentam dificuldades para:
- Divulgar suas necessidades de forma centralizada
- Engajar doadores e voluntários
- Gerenciar campanhas de arrecadação
- Mensurar o impacto social

### 💡 Solução

A Somar oferece uma plataforma completa com:
- ✅ Landing page informativa
- ✅ Sistema de autenticação (com suporte a API backend)
- ✅ Cadastro diferenciado (ONG / Doador / Admin)
- ✅ Dashboard específico para ONGs gerenciarem campanhas
- ✅ Dashboard para doadores explorarem oportunidades
- ✅ Sistema de voluntariado completo
- ✅ Chat entre ONGs e doadores
- ✅ Página de configurações com 4 abas
- ✅ Perfil de administrador com acesso total
- ✅ Interface moderna e intuitiva
- ✅ Design responsivo
- ✅ **Pronto para integração com API REST**

---

## 🚀 Início Rápido

### Pré-requisitos
- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- npm (incluído no Node.js)

### Instalação

1. **Clone o repositório**
```bash
git clone https://github.com/etmamate/somar-front.git
cd somar-front
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure o ambiente**

O projeto está configurado para usar **dados mockados** por padrão. Quando seu backend estiver pronto:

```typescript
// src/environments/environment.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api', // ← URL do seu backend
  websocketUrl: 'ws://localhost:3000',
  enableMockData: false, // ← Mudar para false
};
```

4. **Execute o servidor de desenvolvimento**
```bash
npm start
```

5. **Acesse no navegador**
```
http://localhost:4200
```

### 👤 Usuários de Teste (Modo Mock)

| Tipo | Email | Senha |
|------|-------|-------|
| Admin | admin@somar.com | admin123 |
| ONG | ong@somar.com | ong123 |
| Doador | doador@somar.com | doador123 |

---

## 📁 Estrutura do Projeto

```
somar-front/
├── public/svg/                    # Imagens e ícones SVG
├── src/
│   ├── environments/              # Configurações de ambiente
│   │   ├── environment.ts         # Desenvolvimento
│   │   └── environment.prod.ts    # Produção
│   ├── app/
│   │   ├── components/            # Componentes reutilizáveis
│   │   │   ├── default-login-layout/
│   │   │   ├── modal/             # Modal base
│   │   │   ├── primary-input/
│   │   │   └── user-type-selector/
│   │   ├── pages/                 # Páginas da aplicação
│   │   │   ├── home/              # Landing page
│   │   │   ├── login/             # Autenticação
│   │   │   ├── signup/            # Cadastro
│   │   │   ├── dashboard-ong/     # Dashboard ONGs
│   │   │   ├── dashboard-doador/  # Dashboard Doadores
│   │   │   ├── overview/          # Visão geral
│   │   │   ├── campanhas/         # Gerenciar campanhas
│   │   │   ├── voluntarios/       # Oportunidades voluntariado
│   │   │   ├── doacoes/           # Histórico doações
│   │   │   ├── chat/              # Mensagens
│   │   │   └── configuracoes/     # Configurações perfil
│   │   ├── services/              # Serviços
│   │   │   ├── api.service.ts              # Comunicação HTTP base
│   │   │   ├── login.service.ts            # Autenticação
│   │   │   ├── campaigns.service.ts        # Campanhas (mock)
│   │   │   ├── campaigns-api.service.ts    # Campanhas (API)
│   │   │   ├── volunteer.service.ts        # Voluntariado (mock)
│   │   │   ├── volunteer-api.service.ts    # Voluntariado (API)
│   │   │   ├── chat.service.ts             # Chat (mock)
│   │   │   └── chat-api.service.ts         # Chat (API)
│   │   ├── interceptors/          # Interceptadores HTTP
│   │   │   └── auth.interceptor.ts # JWT token automático
│   │   └── types/                 # Tipos TypeScript
│   └── styles/                    # Estilos globais
├── API-SPECIFICATION.md           # Especificação da API backend
├── MIGRATION-GUIDE.md             # Guia de migração Mock → API
├── FEATURES.md                    # Documentação funcionalidades
└── README.md                      # Este arquivo
```

---

## 🎨 Funcionalidades

### 🏠 Landing Page
- Hero section com apresentação da plataforma
- Seção de recursos principais
- Como funciona (passo a passo visual)
- Call-to-action estratégicos
- Footer informativo

### 🔐 Sistema de Autenticação
- Login com validação
- Cadastro diferenciado (ONG/Doador)
- **Modo Mock** (desenvolvimento) e **Modo API** (produção)
- JWT token authentication
- Interceptor automático para adicionar token em requisições
- Tratamento de erros 401/403/500

### 📊 Dashboard para ONGs
- **Visão Geral:** Estatísticas, campanhas ativas, voluntários
- **Campanhas:** CRUD completo com modal
- **Voluntários:** Gerenciar oportunidades e inscritos
- **Doações:** Histórico de doações recebidas
- **Chat:** Comunicação com doadores
- **Configurações:** Perfil, senha, notificações, privacidade

### 💝 Dashboard para Doadores
- **Explorar Campanhas:** Filtros por categoria e urgência
- **Voluntariado:** Inscrever-se em oportunidades
- **Histórico:** Acompanhar contribuições
- **Chat:** Falar com ONGs
- **Configurações:** Gerenciar perfil completo

### 👨‍💼 Perfil Admin
- Acesso completo a todas as informações
- Ver todas as campanhas de todas as ONGs
- Ver todas as oportunidades de voluntariado
- Ver todas as doações
- Ver todas as conversas no chat
- Ideal para testes e supervisão da plataforma

### 💬 Sistema de Chat
- Conversas entre ONGs e doadores
- Mensagens relacionadas a campanhas/voluntariado
- Contador de mensagens não lidas
- Interface moderna com sidebar
- **Preparado para WebSocket** (tempo real)

### 📊 Dashboard Analytics Avançado (NOVO! ⭐)
- **Métricas completas:** Doações, doadores, itens, campanhas, voluntários
- **Score de Impacto:** Cálculo de impacto social (0-100)
- **Taxa de Crescimento:** Análise temporal de engajamento
- **Gráficos interativos:** Timeline de doações e voluntários
- **Distribuição por categoria:** Percentuais e totais
- **Top Doadores:** Ranking com estatísticas
- **Performance de campanhas:** Status visual (Excelente/Boa/Precisa Atenção)
- **Exportação CSV:** Relatórios completos downloadáveis
- **Períodos customizáveis:** 7, 30 ou 90 dias

### ⭐ Sistema de Avaliações (NOVO!)
- **Ratings 1-5 estrelas** para campanhas
- **Comentários detalhados** dos doadores
- **Sistema "útil"** com votos
- **Moderação** (pendente/aprovado/rejeitado)
- **Estatísticas:** Média, distribuição, taxa de recomendação

### 🌙 Dark Mode (NOVO!)
- **Toggle** entre tema claro/escuro
- **Detecção automática** de preferência do sistema
- **Persistência** em localStorage
- **Transições suaves** entre temas

### 🌍 Internacionalização (NOVO!)
- **3 idiomas:** Português, Inglês, Espanhol
- **Detecção automática** do idioma do navegador
- **Troca dinâmica** de idioma
- **Traduções** para componentes principais

### 🎮 Gamificação (NOVO!)
- **10 Badges** diferentes (Bronze, Prata, Ouro, Platina)
- **Sistema de níveis** baseado em pontos
- **Pontos por atividade:** Doação (50), Voluntariado (100), Review (25)
- **Streaks diários** para engajamento
- **Leaderboard** com ranking
- **Conquistas desbloqueáveis**

### 🛍️ Marketplace de Doações (NOVO!)
- **Wishlist de itens** necessários (ONGs)
- **Matching inteligente** doador-necessidade
- **Sistema de reserva** (48h para confirmação)
- **Expiração automática** de reservas
- **Filtros avançados** (categoria, urgência, condição)
- **Status tracking** (disponível/reservado/concluído)

### 📊 Relatórios Automatizados (NOVO!)
- **Agendamento:** Diário, semanal, mensal
- **Múltiplos formatos:** CSV, PDF, Excel (preparado)
- **Envio por email:** Múltiplos destinatários
- **Configurações personalizadas**
- **Inclusão seletiva:** Métricas, campanhas, voluntários, doações
- **Download sob demanda**

---

## 🛠️ Tecnologias

- **[Angular 20](https://angular.io/)** - Framework web moderno
- **[TypeScript 5.9](https://www.typescriptlang.org/)** - Superset JavaScript com tipagem
- **[SCSS](https://sass-lang.com/)** - Pré-processador CSS
- **[RxJS](https://rxjs.dev/)** - Programação reativa
- **[Angular Router](https://angular.io/guide/router)** - Navegação SPA
- **[HttpClient](https://angular.io/guide/http)** - Comunicação com API
- **JWT** - Autenticação via token (preparado)
- **WebSocket** - Chat em tempo real (preparado)

---

## � Integração com Backend

O projeto está **100% preparado** para integração com API backend REST.

### Modo Atual: Mock (Desenvolvimento)
- Dados armazenados em `sessionStorage`
- Autenticação mockada
- Ideal para desenvolvimento sem backend

### Modo API (Produção)
Quando seu backend estiver pronto:

1. **Configure a URL da API:**
```typescript
// src/environments/environment.ts
enableMockData: false // ← Mudar para false
apiUrl: 'http://localhost:3000/api' // ← URL do backend
```

2. **Serviços prontos para uso:**
- ✅ `ApiService` - Serviço HTTP base
- ✅ `AuthInterceptor` - Adiciona token automaticamente
- ✅ `CampaignsApiService` - Gerenciar campanhas
- ✅ `VolunteerApiService` - Gerenciar voluntariado
- ✅ `ChatApiService` - Gerenciar mensagens
- ✅ `WebsocketService` - Chat em tempo real (estrutura pronta)

3. **Consulte a documentação:**
- 📄 **[API-SPECIFICATION.md](API-SPECIFICATION.md)** - Especificação completa da API backend
- 📄 **[MIGRATION-GUIDE.md](MIGRATION-GUIDE.md)** - Guia passo a passo de migração

### Endpoints da API (Backend)

Todos os endpoints estão documentados em [API-SPECIFICATION.md](API-SPECIFICATION.md):

- **Autenticação:** `/api/auth/login`, `/api/auth/signup`, `/api/auth/logout`
- **Campanhas:** `/api/campaigns/*`
- **Voluntariado:** `/api/volunteer/*`
- **Chat:** `/api/chat/*`
- **Usuários:** `/api/users/*`
- **WebSocket:** `ws://localhost:3000` (dev) / `wss://api.somar.com.br` (prod)

---

## 📚 Documentação Adicional

- **[API-SPECIFICATION.md](API-SPECIFICATION.md)** - Especificação completa da API REST backend
- **[MIGRATION-GUIDE.md](MIGRATION-GUIDE.md)** - Guia de migração Mock → API
- **[FEATURES.md](FEATURES.md)** - Documentação de todas as funcionalidades
- **[FEATURES-ADVANCED.md](FEATURES-ADVANCED.md)** - 📊 **NOVO!** Analytics, Reviews, Dark Mode, i18n, Gamificação, Marketplace, Relatórios
- **[GUIDE.md](GUIDE.md)** - Guia rápido de uso e teste

---

## 🧪 Scripts Disponíveis

```bash
npm start          # Inicia servidor de desenvolvimento (http://localhost:4200)
npm run build      # Build de produção
npm test           # Executa testes unitários
npm run watch      # Build em modo watch
```

---

## 🎨 Design System

### Paleta de Cores
```scss
$primary-color: #2ECC71;      // Verde esperança e solidariedade
$secundary-color: #3498DB;    // Azul confiança e conexão
$accent-color: #E67E22;       // Laranja caloroso para CTAs
$text-color: #2C3E50;         // Azul escuro para textos
$bg-color: #F8F9FA;           // Fundo claro e acolhedor
```

### Componentes Reutilizáveis
- **UserTypeSelector** - Seleção visual de tipo de usuário
- **PrimaryInput** - Input customizado com ícones
- **DefaultLoginLayout** - Layout padrão de autenticação
- **Modal** - Modal base reutilizável (small/medium/large)

---

## 🚀 Próximas Evoluções Sugeridas

### ✅ Completas (Novembro 2025)
1. ✅ **Dashboard Analytics Avançado** - Métricas, gráficos, exportação CSV
2. ✅ **Sistema de Avaliações** - Ratings, comentários, moderação
3. ✅ **Dark Mode** - Tema escuro com toggle
4. ✅ **Internacionalização** - PT-BR, EN, ES
5. ✅ **Gamificação** - Badges, níveis, leaderboard
6. ✅ **Marketplace** - Wishlist, matching, reservas
7. ✅ **Relatórios Automatizados** - Agendamento, múltiplos formatos
8. ✅ **Modal de Detalhes** - Campanha completa com 4 abas

### Alta Prioridade
9. ⏳ **Backend API** - Implementar API REST seguindo [API-SPECIFICATION.md](API-SPECIFICATION.md)
10. ⏳ **Upload de Imagens** - Campanhas e perfis com fotos
11. ⏳ **WebSocket Chat** - Mensagens em tempo real
12. ⏳ **Notificações Push** - Alertas de novas doações/mensagens

### Média Prioridade
13. ⏳ **Geolocalização** - Mapa de ONGs próximas
14. ⏳ **PWA** - Aplicativo instalável
15. ⏳ **Chart.js Integration** - Gráficos mais avançados
16. ⏳ **Acessibilidade (A11y)** - ARIA labels, navegação por teclado

### Baixa Prioridade
17. ⏳ **Testes E2E** - Playwright/Cypress
18. ⏳ **Migração SCSS** - @use ao invés de @import
19. ⏳ **Mais idiomas** - FR, IT, DE
20. ⏳ **Mais temas** - Além de light/dark

**📊 Veja [FEATURES-ADVANCED.md](FEATURES-ADVANCED.md) para detalhes completos das funcionalidades avançadas!**

---

## 🗺️ Rotas

| Rota | Componente | Descrição |
|------|-----------|-----------|
| `/` | Home | Landing page pública |
| `/login` | Login | Página de autenticação |
| `/signup` | Signup | Cadastro de usuários |
| `/dashboard/ong` | DashboardOng | Painel para ONGs |
| `/dashboard/doador` | DashboardDoador | Painel para doadores |

---

## 🔮 Próximos Passos

- [ ] Integração com API backend
- [ ] Sistema de chat em tempo real
- [ ] Upload de imagens
- [ ] Geolocalização de campanhas
- [ ] Sistema de notificações
- [ ] Gamificação (badges, rankings)
- [ ] Relatórios de impacto
- [ ] PWA (Progressive Web App)

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

---

## 👨‍💻 Desenvolvido por

**Equipe Somar**

---

## 📄 Licença

Este projeto é parte de um trabalho acadêmico/pessoal.

---

<div align="center">
  <p><strong>Desenvolvido com ❤️ para conectar solidariedade</strong></p>
  <p>Somar - Transformando boas intenções em ações concretas</p>
</div>

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
#
