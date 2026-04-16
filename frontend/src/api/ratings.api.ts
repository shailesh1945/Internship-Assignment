import API from './axios';

export const submitRatingAPI = (data: any) =>
  API.post('/ratings', data);

export const updateRatingAPI = (id: string, data: any) =>
  API.patch(`/ratings/${id}`, data);