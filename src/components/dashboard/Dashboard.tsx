import React from 'react';
import { Package, DollarSign, AlertTriangle, Grid3X3, TrendingUp, Users, Calendar } from 'lucide-react';
import { useProducts } from '../../contexts/ProductContext';
import { DashboardStats } from '../../types';

export const Dashboard: React.FC = () => {
  const { products } = useProducts();

  const stats: DashboardStats = {
    totalProducts: products.length,
    totalValue: products.reduce((sum, product) => sum + (product.price * product.quantity), 0),
    lowStock: products.filter(product => product.quantity < 10).length,
    categories: new Set(products.map(product => product.category)).size,
  };

  const recentProducts = products
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 5);

  const lowStockProducts = products
    .filter(product => product.quantity < 10)
    .sort((a, b) => a.quantity - b.quantity);

  const StatCard = ({ icon: Icon, title, value, subtitle, color, trend }: any) => (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-200 group">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className={`p-3 rounded-xl ${color} group-hover:scale-110 transition-transform duration-200`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
            {subtitle && (
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{subtitle}</p>
            )}
          </div>
        </div>
        {trend && (
          <div className="flex items-center space-x-1 text-green-600 dark:text-green-400">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm font-medium">{trend}</span>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center lg:text-left">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Dashboard Overview
        </h1>
        <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">
          Monitor your inventory performance and key metrics
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={Package}
          title="Total Products"
          value={stats.totalProducts}
          subtitle="Active inventory items"
          color="bg-gradient-to-br from-blue-500 to-blue-600"
          trend="+12%"
        />
        <StatCard
          icon={DollarSign}
          title="Total Value"
          value={`$${stats.totalValue.toLocaleString()}`}
          subtitle="Inventory worth"
          color="bg-gradient-to-br from-green-500 to-green-600"
          trend="+8%"
        />
        <StatCard
          icon={AlertTriangle}
          title="Low Stock Items"
          value={stats.lowStock}
          subtitle="Need attention"
          color="bg-gradient-to-br from-red-500 to-red-600"
        />
        <StatCard
          icon={Grid3X3}
          title="Categories"
          value={stats.categories}
          subtitle="Product types"
          color="bg-gradient-to-br from-purple-500 to-purple-600"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Products */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                    <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Recently Updated Products
                  </h2>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">Last 5 items</span>
              </div>
            </div>
            <div className="p-6">
              {recentProducts.length > 0 ? (
                <div className="space-y-4">
                  {recentProducts.map((product, index) => (
                    <div key={product.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                          <span className="text-white font-semibold text-sm">
                            {index + 1}
                          </span>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white">
                            {product.name}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {product.category}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900 dark:text-white">
                          ${product.price}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Qty: {product.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 dark:text-gray-400">No products available</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Low Stock Alert */}
        <div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-red-100 dark:bg-red-900/20 rounded-lg">
                  <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Low Stock Alert
                </h2>
              </div>
            </div>
            <div className="p-6">
              {lowStockProducts.length > 0 ? (
                <div className="space-y-4">
                  {lowStockProducts.map((product) => (
                    <div key={product.id} className="flex items-center justify-between p-4 bg-red-50 dark:bg-red-900/10 rounded-xl border border-red-200 dark:border-red-800/50">
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {product.name}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {product.category}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                          product.quantity <= 5
                            ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                        }`}>
                          {product.quantity} left
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Package className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 font-medium">All products are well stocked</p>
                  <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">Great job managing inventory!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};