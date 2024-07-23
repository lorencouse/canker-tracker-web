import React from 'react';
import type { PathRouteProps } from 'react-router-dom';

import SignInUp from '@/components/LogInComponents/SignInUp';

const Home = React.lazy(() => import('@/lib/pages/home'));

export const routes: Array<PathRouteProps> = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/signin',
    element: <SignInUp signIn />,
  },
];

export const privateRoutes: Array<PathRouteProps> = [];
