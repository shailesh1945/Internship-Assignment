import API from './axios';

export const getStoresAPI = (params?: any) =>
  API.get('/stores', { params });

export const createStoreAPI = (data: any) =>
  API.post('/admin/stores', data);

export const getOwnerDashboardAPI = () =>
  API.get('/stores/owner/dashboard');