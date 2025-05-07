import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('userToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const loginUser = async (email, password, role) => {
  try {
    const { data } = await api.post('/users/login', { email, password, role });
    localStorage.setItem('userToken', data.token);
    localStorage.setItem('userData', JSON.stringify(data));
    return data;
  } catch (error) {
    throw error.response?.data?.message || 'An error occurred during login';
  }
};

export const registerUser = async (userData) => {
  try {
    const { data } = await api.post('/users', userData);
    localStorage.setItem('userToken', data.token);
    localStorage.setItem('userData', JSON.stringify(data));
    return data;
  } catch (error) {
    throw error.response?.data?.message || 'An error occurred during registration';
  }
};

export const logoutUser = () => {
  localStorage.removeItem('userToken');
  localStorage.removeItem('userData');
};

export const getUserProfile = async () => {
  try {
    const { data } = await api.get('/users/profile');
    return data;
  } catch (error) {
    throw error.response?.data?.message || 'An error occurred while fetching profile';
  }
};

export const updateUserProfile = async (userData) => {
  try {
    const { data } = await api.put('/users/profile', userData);
    return data;
  } catch (error) {
    throw error.response?.data?.message || 'An error occurred while updating profile';
  }
};