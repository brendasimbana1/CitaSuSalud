import axios from 'axios';

const API_URL = 'http://localhost:3000/api/auth';

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials, { withCredentials: true });
    return response.data;
  } catch (error) {
    if (error.response) {
      return { message: error.response.data.message }; 
    } else {
      return { message: 'Error en el servidor. Intenta nuevamente más tarde.' };
    }
  }
};
