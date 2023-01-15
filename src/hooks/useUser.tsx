import { useContext } from 'react';
import { UserContext, UserProvider } from '../contexts/UserContext';

export { UserContext, UserProvider };

export default function useUser() {
  const { user } = useContext(UserContext);
  return user;
}
