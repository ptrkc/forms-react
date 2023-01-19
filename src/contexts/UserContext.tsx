import jwtDecode from 'jwt-decode';
import { createContext, useState } from 'react';

export interface User {
  token: string;
  id: number;
  role: string;
  name: string;
}

interface UserContextProps {
  user: User | null;
  setUser: (token: string | null) => void;
}

export const UserContext = createContext<UserContextProps>({
  user: null,
  setUser: () => {},
});

interface Props {
  children: React.ReactNode;
}

const decodeUserFromJwt = (token: string) => {
  const decoded = jwtDecode<{ sub: number; role: string; name: string }>(token);
  const newUser = {
    token: token,
    id: decoded.sub,
    role: decoded.role,
    name: decoded.name,
  };
  return newUser;
};

export function UserProvider({ children }: Props) {
  const initialToken = localStorage.getItem('token');

  const [user, setStateUser] = useState<User | null>(
    initialToken ? decodeUserFromJwt(initialToken) : null
  );

  const setUser = (token: string | null) => {
    if (!token) {
      localStorage.removeItem('token');
      return setStateUser(null);
    }

    localStorage.setItem('token', token);
    setStateUser(decodeUserFromJwt(token));
  };

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
