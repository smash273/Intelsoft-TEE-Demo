import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach token automatically
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

export const auth = {

  signup: async (name: string, email: string, password: string) => {

    const response = await api.post('/auth/signup', {
      name,
      email,
      password,
    });

    return response.data;
  },

  login: async (email: string, password: string) => {

    const formData = new FormData();
    formData.append('username', email);
    formData.append('password', password);

    const response = await api.post('/auth/login', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (response.data.access_token) {

      const token = response.data.access_token;

      localStorage.setItem('token', token);

      // Decode JWT token
      const payload = JSON.parse(atob(token.split('.')[1]));

      const user = {
        email: payload.sub,
        name: payload.sub.split('@')[0]
      };

      localStorage.setItem('user', JSON.stringify(user));
    }

    return response.data;
  },

  logout: () => {

    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
};

export const chat = {

  sendMessage: async (message: string) => {

    const response = await api.post('/chat', { message });

    return response.data;
  },
};

export const incidents = {

  getRecent: async (limit: number = 10) => {

    const response = await api.get(`/incidents/recent?limit=${limit}`);

    return response.data;
  },

  getById: async (id: string) => {

    const response = await api.get(`/incidents/${id}`);

    return response.data;
  },
};

export const playbooks = {

  getAll: async () => {

    const response = await api.get('/playbooks');

    return response.data;
  },
};

export default api;