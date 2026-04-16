import API from './axios';

export const getDashboardAPI = () =>
  API.get('/admin/dashboard');

export const createUserAPI = (data: any) =>
  API.post('/admin/users', data);

export const createStoreAPI = (data: any) =>
  API.post('/admin/stores', data);