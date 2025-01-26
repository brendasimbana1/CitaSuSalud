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

export const registerUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/register`, credentials, { withCredentials: true });
    return response.data;
  } catch (error) {
    if (error.response) {
      return { message: error.response.data.message };
    } else {
      return { message: 'Error en el servidor. Intenta nuevamente más tarde.' };
    }
  }
};

export const registerEspecialidad = async (especialidad) => {
  try {
    const response = await axios.post(`${API_URL}/register-especialidad`, especialidad, { withCredentials: true });
    return response.data;
  } catch (error) {
    if (error.response) {
      return { message: error.response.data.message };
    } else {
      return { message: 'Error en el servidor. Intenta nuevamente más tarde.' };
    }
  }
};
export const registerHorario = async (horario) => {
  try {
    const response = await axios.post(`${API_URL}/register-horario`, horario, { withCredentials: true });
    return response.data;
  } catch (error) {
    if (error.response) {
      return { message: error.response.data.message };
    } else {
      return { message: 'Error en el servidor. Intenta nuevamente más tarde.' };
    }
  }
};

export const fetchEspecialidades = async () => {
  try {
    const response = await axios.get(`${API_URL}/get-especialidades`, { withCredentials: true });
    return response.data;
  } catch (error) {
    if (error.response) {
      return { message: error.response.data.message };
    } else {
      return { message: 'Error en el servidor. Intenta nuevamente más tarde.' };
    }
  }
};

export const fetchDoctores = async (especialidad) => {
  try {
    const response = await axios.get(`${API_URL}/get-doctores/${especialidad}`, { withCredentials: true });
    return response.data;
  } catch (error) {
    if (error.response) {
      return { message: error.response.data.message };
    } else {
      return { message: 'Error en el servidor. Intenta nuevamente más tarde.' };
    }
  }
};
