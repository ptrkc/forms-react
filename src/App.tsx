import { UserProvider } from './contexts/UserContext';
import CssBaseline from '@mui/material/CssBaseline';
import { Router } from './components/Routes';
import QueryClientDefaultProvider from './contexts/QueryClientDefaultProvider.tsx';

function App() {
  return (
    <UserProvider>
      <QueryClientDefaultProvider>
        <CssBaseline />
        <Router />
      </QueryClientDefaultProvider>
    </UserProvider>
  );
}

export default App;
