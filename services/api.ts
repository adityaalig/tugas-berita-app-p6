import axios from 'axios';
import Constants from 'expo-constants';

const api = axios.create({
  baseURL: Constants.expoConfig?.extra?.newsApiBaseUrl, 
  headers: {
    'X-Api-Key': Constants.expoConfig?.extra?.newsApiKey, 
  },
});

export default api;