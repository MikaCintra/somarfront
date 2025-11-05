import { Routes } from '@angular/router';
import { Login } from './features/auth/pages/login/login';
import { Signup } from './features/auth/pages/signup/signup';
import { Home } from './pages/home/home';
import { DashboardOng } from './pages/dashboard-ong/dashboard-ong';
import { DashboardDoador } from './pages/dashboard-doador/dashboard-doador';
import { Chat } from './features/chat/pages/chat/chat';
import { Overview } from './pages/overview/overview';
import { Campanhas } from './features/campaigns/pages/campanhas/campanhas';
import { Voluntarios } from './features/volunteers/pages/voluntarios/voluntarios';
import { Doacoes } from './features/donations/pages/doacoes/doacoes';
import { Configuracoes } from './pages/configuracoes/configuracoes';
import { AnalyticsComponent } from './features/analytics/pages/analytics/analytics';
import { MarketplaceComponent } from './features/marketplace/pages/marketplace/marketplace';
import { ReportsComponent } from './features/reports/pages/reports/reports';
import { authGuard } from './core/guards/auth.guard';
import { MainLayout } from './layout/main-layout/main-layout';

export const routes: Routes = [
    {
        path: "",
        component: Home
    },
    {
        path: "login",
        component: Login
    },
    {
        path: "signup",
        component: Signup
    },
    // Rotas com layout (menu lateral) - todas as páginas autenticadas
    {
        path: "",
        component: MainLayout,
        canActivate: [authGuard],
        children: [
            {
                path: "dashboard/ong",
                component: DashboardOng
            },
            {
                path: "dashboard/doador",
                component: DashboardDoador
            },
            {
                path: "overview",
                component: Overview
            },
            {
                path: "campanhas",
                component: Campanhas
            },
            {
                path: "voluntarios",
                component: Voluntarios
            },
            {
                path: "doacoes",
                component: Doacoes
            },
            {
                path: "configuracoes",
                component: Configuracoes
            },
            {
                path: "chat",
                component: Chat
            },
            {
                path: "analytics",
                component: AnalyticsComponent
            },
            {
                path: "marketplace",
                component: MarketplaceComponent
            },
            {
                path: "reports",
                component: ReportsComponent
            }
        ]
    }
];
