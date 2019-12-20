import API from '@/http';

export const getHomeInfo = () => API.get('/api/home/info');