import API from './axios';

export const getUsersAPI = (params?: any) =>
  API.get('/admin/users', { params });