import jwtDecode, { JwtPayload } from 'jwt-decode';
import { createContext, useState } from 'react';

interface User {
  token: string;
  id: number;
  role: string;
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
  const decoded = jwtDecode<{ sub: number; role: string }>(token);
  const newUser = {
    token: token,
    id: decoded.sub,
    role: decoded.role,
  };
  return newUser;
};

export function UserProvider({ children }: Props) {
  const initialToken = localStorage.getItem('token');

  const [user, setUser] = useState<User | null>(
    initialToken ? decodeUserFromJwt(initialToken) : null
  );

  const handleSetUser = (token: string | null) => {
    if (!token) {
      localStorage.removeItem('token');
      return setUser(null);
    }

    localStorage.setItem('token', token);
    setUser(decodeUserFromJwt(token));
  };

  return (
    <UserContext.Provider value={{ user, setUser: handleSetUser }}>
      {children}
    </UserContext.Provider>
  );
}
