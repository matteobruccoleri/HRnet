import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import CreateEmployee from '../pages/CreateEmployee'
import EmployeeList from '../pages/EmployeeList'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,                 // layout
    children: [
      { index: true, element: <CreateEmployee /> },   // équivaut à path: '/'
      { path: 'employees', element: <EmployeeList /> }
    ],
  },
  // Option : 404
  // { path: '*', element: <NotFound /> }
])