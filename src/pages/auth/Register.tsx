import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Mail, AlertCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { getAuthErrorMessage } from '../../config/firebase';
import Navbar from '../../components/Navbar';

const Register = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { register } = useAuth();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'diner',
    terms: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;

    try {
      setError('');
      setIsLoading(true);

      if (!formData.name.trim()) {
        throw new Error('Name is required');
      }

      if (!formData.email.trim()) {
        throw new Error('Email is required');
      }

      if (formData.password.length < 6) {
        throw new Error('Password must be at least 6 characters long');
      }

      if (formData.password !== formData.confirmPassword) {
        throw new Error('Passwords do not match');
      }

      if (!formData.terms) {
        throw new Error('Please accept the terms and conditions');
      }

      await register({
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
        userType: formData.userType as 'diner' | 'restaurant'
      });

      navigate(formData.userType === 'restaurant' ? '/restaurant' : '/');
    } catch (err: any) {
      console.error('Registration error:', err);
      setError(getAuthErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-md mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-center mb-8">
            {t('auth.register.title')}
          </h2>

          {error && (
            <div className="mb-6 p-4 text-sm text-red-700 bg-red-100 rounded-lg flex items-center">
              <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {t('auth.register.name')}
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                {t('auth.register.email')}
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                {t('auth.register.password')}
              </label>
              <input
                type="password"
                required
                minLength={6}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                {t('auth.register.confirmPassword')}
              </label>
              <input
                type="password"
                required
                minLength={6}
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('auth.register.userType.label')}
              </label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="diner"
                    checked={formData.userType === 'diner'}
                    onChange={(e) => setFormData({ ...formData, userType: e.target.value })}
                    className="mr-2"
                    disabled={isLoading}
                  />
                  {t('auth.register.userType.diner')}
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="restaurant"
                    checked={formData.userType === 'restaurant'}
                    onChange={(e) => setFormData({ ...formData, userType: e.target.value })}
                    className="mr-2"
                    disabled={isLoading}
                  />
                  {t('auth.register.userType.restaurant')}
                </label>
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                required
                checked={formData.terms}
                onChange={(e) => setFormData({ ...formData, terms: e.target.checked })}
                className="h-4 w-4 text-blue-600 rounded border-gray-300"
                disabled={isLoading}
              />
              <label className="ml-2 block text-sm text-gray-900">
                {t('auth.register.terms')}
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {isLoading ? t('auth.register.submitting') : t('auth.register.submit')}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            {t('auth.hasAccount')}{' '}
            <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
              {t('auth.signIn')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;