import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Home from '../pages/Home'
import EmployeeList from '../pages/EmployeeList'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // layout avec Header + <Outlet />
    children: [
      { index: true, element: <Home /> },   // équivaut à path: '/'
      { path: 'employees', element: <EmployeeList /> }
    ],
  },
  // Option : 404
  // { path: '*', element: <NotFound /> }
])