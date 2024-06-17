import { lazy } from 'react';
const Index = lazy(() => import('../views/Index'));

const routes = [
    // dashboard
    {
        path: '/',
        element: <Index />,
        layout: 'default',
    },

];

export { routes };
