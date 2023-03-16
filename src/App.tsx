import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider, ProjectProvider } from './context';
import { AuthLayout, PrivateRoute } from './layouts';
import {
  ConfirmAccount,
  Login,
  NewPassword,
  NewProject,
  Projects,
  ResetPassword,
  SignUp,
} from './pages';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProjectProvider>
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
              <Route path='new-project' element={<NewProject />} />
            </Route>
            <Route path='*' element={<p>Path not resolved</p>} />
          </Routes>
        </ProjectProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
