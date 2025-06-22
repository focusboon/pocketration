 
import { createContext, useContext, useState } from 'react';

export const AuthContext = createContext(null);



export function AuthProvider({ children }) {
  const [user, setuser] = useState('focus');
  const [loading, setLoading] = useState(false);

  const values = {
    user,
    setuser,
    loading,
    setLoading,
  }

  return (
    <AuthContext.Provider value={{ user, loading, values }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};