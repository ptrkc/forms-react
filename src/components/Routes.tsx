import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useUser } from '../hooks/useUser';
import { AnswerForm } from './pages/AnswerForm';
import { FormsPage } from './pages/FormsPage';
import { Layout } from './pages/Layout';
import { NewForm } from './pages/NewForm';
import { LogIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';
import { UsersPage } from './pages/UsersPage';

export function Router() {
  const { user } = useUser();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* {Public}  */}
          <Route index element={<LogIn />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="questionarios" element={<FormsPage />} />
          {/* {User}  */}
          {user && (
            <>
              <Route path="questionario/novo" element={<NewForm />} />
              <Route path="questionario/:id" element={<AnswerForm />} />
              <Route path="questionario/:id/editar" element={<AnswerForm />} />
            </>
          )}
          {/* {Admin}  */}
          {user?.role === 'admin' && (
            <Route path="usuarios" element={<UsersPage />} />
          )}
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
