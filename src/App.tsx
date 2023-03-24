import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider, ProjectProvider } from './context';
import { AuthLayout, PrivateRoute } from './layouts';
import {
  ConfirmAccount,
  EditProject,
  Login,
  NewCollaborator,
  NewPassword,
  NewProject,
  Project,
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

            <Route path='/projects' element={<PrivateRoute />}>
              <Route index element={<Projects />} />
              <Route path='new-project' element={<NewProject />} />
              <Route
                path='new-collaborator/:id'
                element={<NewCollaborator />}
              />
              <Route path='edit/:id' element={<EditProject />} />
              <Route path=':id' element={<Project />} />
            </Route>
          </Routes>
        </ProjectProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
