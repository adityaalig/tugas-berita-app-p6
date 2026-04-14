import axios from 'axios';
import Constants from 'expo-constants';

const api = axios.create({
  baseURL: Constants.expoConfig?.extra?.newsApiBaseUrl, // Mengambil dari app.config.js [cite: 68, 560]
  headers: {
    'X-Api-Key': Constants.expoConfig?.extra?.newsApiKey, // Harus tepat begini tulisannya 
  },
});

export default api;