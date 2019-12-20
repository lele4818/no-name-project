import API from '@/http';

export const doLogin = params => API.get('/api/login/doLogin', { params });