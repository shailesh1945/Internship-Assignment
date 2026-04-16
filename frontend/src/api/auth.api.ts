import API from './axios';

export const loginAPI = (data: { email: string; password: string }) =>
  API.post('/auth/login', data);

export const registerAPI = (data: any) =>
  API.post('/auth/register', data);

export const updatePasswordAPI = (data: any) =>
  API.patch('/auth/password', data);