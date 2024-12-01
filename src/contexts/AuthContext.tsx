import React, { createContext, useContext, useState } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'diner' | 'owner';
  restaurantName?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  userType: 'diner' | 'restaurant';
}

// Simulated user database
const users: Array<User & { password: string }> = [
  {
    id: '1',
    email: 'demo@example.com',
    password: 'demo123',
    name: 'Demo User',
    role: 'diner'
  },
  {
    id: '2',
    email: 'restaurant@example.com',
    password: 'rest123',
    name: 'Restaurant Demo',
    role: 'owner',
    restaurantName: 'Demo Restaurant'
  }
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    const foundUser = users.find(u => u.email === email && u.password === password);
    if (!foundUser) {
      throw new Error('Invalid email or password');
    }

    const { password: _, ...userWithoutPassword } = foundUser;
    setUser(userWithoutPassword);
    setIsAuthenticated(true);
  };

  const register = async (userData: RegisterData) => {
    if (users.some(u => u.email === userData.email)) {
      throw new Error('Email already exists');
    }

    const newUser = {
      id: (users.length + 1).toString(),
      email: userData.email,
      password: userData.password,
      name: userData.name,
      role: userData.userType === 'restaurant' ? 'owner' : 'diner',
      restaurantName: userData.userType === 'restaurant' ? userData.name : undefined
    };

    users.push(newUser);

    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    setIsAuthenticated(true);
  };

  const logout = async () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      user, 
      login, 
      register, 
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};