import { createBrowserRouter } from 'react-router'
import Login from './pages/Login'
import Logout from './pages/Logout'
import Callback from './pages/Callback'
import Admin from './pages/Admin'
import PrivateRoute from './pages/PrivateRoute'

const router = createBrowserRouter([
  {
    path: 'login',
    element: <Login />
  },
  {
    path: 'logout',
    element: <Logout />
  },
  {
    path: 'callback',
    element: <Callback />
  },
  {
    path: 'admin',
    element: <PrivateRoute><Admin /></PrivateRoute>
  }
])

export default router
