import { createContext, PropsWithChildren, useState } from 'react';

interface User {
  id: number;
  role: 'admin' | 'user';
  token: string;
}

interface UserContextProps {
  user: User | null;
  setUser: (user: User) => void;
}

export const UserContext = createContext<UserContextProps>({
  user: null,
  setUser: (user: User) => {},
});

export function UserProvider({ children }: PropsWithChildren) {
  const stringUser = localStorage.getItem('user');
  const initialUser = stringUser ? JSON.parse(stringUser) : null;
  const [user, setUser] = useState(initialUser);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
