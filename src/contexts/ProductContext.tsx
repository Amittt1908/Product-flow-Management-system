import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '../types';

interface ProductContextType {
  products: Product[];
  addProduct: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  getProduct: (id: string) => Product | undefined;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

// Mock initial products
const initialProducts: Product[] = [
  {
    id: '1',
    name: 'Wireless Bluetooth Headphones',
    price: 199.99,
    quantity: 45,
    category: 'Electronics',
    description: 'High-quality wireless headphones with noise cancellation.',
    createdAt: '2025-01-01T10:00:00Z',
    updatedAt: '2025-01-01T10:00:00Z',
  },
  {
    id: '2',
    name: 'Ergonomic Office Chair',
    price: 299.99,
    quantity: 12,
    category: 'Furniture',
    description: 'Comfortable office chair with lumbar support.',
    createdAt: '2025-01-01T11:00:00Z',
    updatedAt: '2025-01-01T11:00:00Z',
  },
  {
    id: '3',
    name: 'Stainless Steel Water Bottle',
    price: 24.99,
    quantity: 8,
    category: 'Accessories',
    description: 'Insulated water bottle that keeps drinks cold for 24 hours.',
    createdAt: '2025-01-01T12:00:00Z',
    updatedAt: '2025-01-01T12:00:00Z',
  },
  {
    id: '4',
    name: 'Gaming Mechanical Keyboard',
    price: 149.99,
    quantity: 23,
    category: 'Electronics',
    description: 'RGB backlit mechanical keyboard for gaming.',
    createdAt: '2025-01-01T13:00:00Z',
    updatedAt: '2025-01-01T13:00:00Z',
  },
  {
    id: '5',
    name: 'Yoga Exercise Mat',
    price: 39.99,
    quantity: 5,
    category: 'Fitness',
    description: 'Non-slip yoga mat perfect for all types of workouts.',
    createdAt: '2025-01-01T14:00:00Z',
    updatedAt: '2025-01-01T14:00:00Z',
  }
];

interface ProductProviderProps {
  children: ReactNode;
}

export const ProductProvider: React.FC<ProductProviderProps> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Load products from localStorage or use initial data
    const savedProducts = localStorage.getItem('products');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    } else {
      setProducts(initialProducts);
      localStorage.setItem('products', JSON.stringify(initialProducts));
    }
  }, []);

  useEffect(() => {
    // Save products to localStorage whenever products change
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  const addProduct = (productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newProduct: Product = {
      ...productData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setProducts(prev => [...prev, newProduct]);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(prev => prev.map(product => 
      product.id === id 
        ? { ...product, ...updates, updatedAt: new Date().toISOString() }
        : product
    ));
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(product => product.id !== id));
  };

  const getProduct = (id: string) => {
    return products.find(product => product.id === id);
  };

  return (
    <ProductContext.Provider value={{
      products,
      addProduct,
      updateProduct,
      deleteProduct,
      getProduct
    }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};