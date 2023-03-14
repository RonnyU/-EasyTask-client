import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthLayout from './layouts/AuthLayout';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ResetPassword from './pages/ResetPassword';
import NewPassword from './pages/NewPassword';
import ConfirmAccount from './pages/ConfirmAccount';
import { AuthProvider } from './context/Auth';
import PrivateRoute from './layouts/PrivateRoute';
import Projects from './pages/Projects';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<AuthLayout />}>
            <Route index element={<Login />} />
            <Route path='sign-up' element={<SignUp />} />
            <Route path='reset-password' element={<ResetPassword />} />
            <Route path='reset-password/:token' element={<NewPassword />} />
            <Route path='confirm-account/:id' element={<ConfirmAccount />} />
          </Route>
        </Routes>
        <Routes>
          <Route path='/projects' element={<PrivateRoute />}>
            <Route index element={<Projects />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
