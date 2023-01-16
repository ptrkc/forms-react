import { QueryClient, QueryClientProvider } from 'react-query';
import { UserProvider } from './contexts/UserContext';
import CssBaseline from '@mui/material/CssBaseline';
import { Router } from './components/Routes';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CssBaseline />
      <UserProvider>
        <Router />
      </UserProvider>
    </QueryClientProvider>
  );
}

export default App;
