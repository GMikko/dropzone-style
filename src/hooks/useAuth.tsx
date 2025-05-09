
import { createContext, useState, useContext, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  register: (name: string, email: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  
  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('dropzone-user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Failed to parse user from localStorage', error);
        localStorage.removeItem('dropzone-user');
      }
    }
  }, []);
  
  const login = (email: string, password: string) => {
    // In a real app, this would validate against a backend
    const users = JSON.parse(localStorage.getItem('dropzone-users') || '[]');
    const foundUser = users.find((u: any) => 
      u.email === email && u.password === password
    );
    
    if (!foundUser) {
      throw new Error('Invalid credentials');
    }
    
    // Create a sanitized user object (without password)
    const authenticatedUser = {
      id: foundUser.id,
      name: foundUser.name,
      email: foundUser.email
    };
    
    setUser(authenticatedUser);
    localStorage.setItem('dropzone-user', JSON.stringify(authenticatedUser));
  };
  
  const register = (name: string, email: string, password: string) => {
    // Get existing users
    const users = JSON.parse(localStorage.getItem('dropzone-users') || '[]');
    
    // Check if email already exists
    if (users.some((user: any) => user.email === email)) {
      throw new Error('Email already in use');
    }
    
    // Create new user
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password
    };
    
    // Save user to "database"
    users.push(newUser);
    localStorage.setItem('dropzone-users', JSON.stringify(users));
    
    // Log in the new user
    const authenticatedUser = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email
    };
    
    setUser(authenticatedUser);
    localStorage.setItem('dropzone-user', JSON.stringify(authenticatedUser));
  };
  
  const logout = () => {
    setUser(null);
    localStorage.removeItem('dropzone-user');
  };
  
  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
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
