export interface User {
  id: string;
  username: string;
  role: 'manager' | 'store_keeper';
  name: string;
  email?: string;
  phone?: string;
  avatar?: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
  category: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  isAuthenticated: boolean;
}

export interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export interface DashboardStats {
  totalProducts: number;
  totalValue: number;
  lowStock: number;
  categories: number;
}