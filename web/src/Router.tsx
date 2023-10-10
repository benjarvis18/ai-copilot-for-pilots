import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/Home.page';
import { Briefing } from './pages/Briefing.page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/briefing/:departure/:arrival',
    element: <Briefing />,
  }
]);

export function Router() {
  return <RouterProvider router={router} />;
}
