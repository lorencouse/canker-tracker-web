import React from 'react';
import type { PathRouteProps } from 'react-router-dom';

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
];

export const privateRoutes: Array<PathRouteProps> = [];
