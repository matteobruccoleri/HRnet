import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Home from '../pages/Home'
import CurrentEmployees from '../pages/CurrentEmployees'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'employees', element: <CurrentEmployees /> }
    ],
  },
  // Option : 404
  // { path: '*', element: <NotFound /> }
])