import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FormsPage } from './components/pages/FormsPage';
import { Layout } from './components/pages/Layout';
import { NotFound } from './components/pages/NotFound';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<FormsPage />} />
          {/* <Route path="questionarios/novo" element={<NewForm />} />
          <Route path="questionarios/:id" element={<AnswerForms />} />
          <Route path="questionarios/:id/editar" element={<EditForm />} />
          <Route path="login" element={<LogIn />} />
          <Route path="signup" element={<SignUp />} /> */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
