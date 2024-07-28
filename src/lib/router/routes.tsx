import React from 'react';
import type { PathRouteProps } from 'react-router-dom';

import DailyLogView from '../pages/dailyLog';
import LandingPage from '../pages/landingPage';
import SignInPage from '../pages/SignInPage';
import SettingsPage from '@/components/userDashboard/settingsPage';

const Home = React.lazy(() => import('@/lib/pages/home'));

export const routes: Array<PathRouteProps> = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/sign-in',
    element: <SignInPage signIn />,
  },
  {
    path: '/settings',
    element: <SettingsPage />,
  },
  {
    path: '/daily-log',
    element: <DailyLogView />,
  },
  {
    path: '/get-started',
    element: <LandingPage />,
  },
];

export const privateRoutes: Array<PathRouteProps> = [];
