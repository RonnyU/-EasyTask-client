import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthLayout from './layouts/AuthLayout';
import Login from './pages/Login';
import SignIn from './pages/SignIn';
import ResetPassword from './pages/ResetPassword';
import NewPassword from './pages/NewPassword';
import ConfirmAccount from './pages/ConfirmAccount';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<AuthLayout />}>
          <Route index element={<Login />} />
          <Route path='sign-in' element={<SignIn />} />
          <Route path='reset-password' element={<ResetPassword />} />
          <Route path='reset-password/:token' element={<NewPassword />} />
          <Route path='confirm-account/:id' element={<ConfirmAccount />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
