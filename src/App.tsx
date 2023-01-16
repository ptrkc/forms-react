import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AnswerForm } from './components/pages/AnswerForm';
import { FormsPage } from './components/pages/FormsPage';
import { Layout } from './components/pages/Layout';
import { NewForm } from './components/pages/NewForm';
import { NotFound } from './components/pages/NotFound';
import { LogIn } from './components/pages/SignIn';
import { SignUp } from './components/pages/SignUp';
import { UserProvider } from './contexts/UserContext';
import CssBaseline from '@mui/material/CssBaseline';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CssBaseline />
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<LogIn />} />
              <Route path="signup" element={<SignUp />} />
              <Route path="questionario/novo" element={<NewForm />} />
              <Route path="questionario/:id" element={<AnswerForm />} />
              <Route path="questionario/:id/editar" element={<AnswerForm />} />
              <Route path="questionarios" element={<FormsPage />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </QueryClientProvider>
  );
}

export default App;
