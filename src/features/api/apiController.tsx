import axios from "axios";
import { Bounce, toast } from "react-toastify";
import Swal from "sweetalert2";



const api = axios.create({
  baseURL: "https://desafio-engeman.onrender.com/api",
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 403 || error.response?.status === 401) {




      localStorage.removeItem("token");


      window.location.href = "/sessao-expirada";



    }

    return Promise.reject(error);
  }
);

class ApiController {

  private getHeaders() {
    const token = localStorage.getItem("token");

    if (token) {
      return {
        Authorization: `Bearer ${token}`,
      };
    }

    return {};
  }

  async get(route: string, params?: object) {
    const response = await api.get(route, {
      params,
      headers: this.getHeaders(),
    });

    return response.data;
  }

  async post(route: string, body?: object) {
    const response = await api.post(route, body, {
      headers: this.getHeaders(),
    });

    return response.data;
  }

  async put(route: string, body?: object) {
    const response = await api.put(route, body, {
      headers: this.getHeaders(),
    });

    return response.data;
  }

  async delete(route: string) {
    const response = await api.delete(route, {
      headers: this.getHeaders(),
    });



    return response.data;
  }

  async patch(route: string, body?: object) {
    const response = await api.patch(route, body, {
      headers: this.getHeaders(),
    });

    return response.data;
  }
}

export const apiController = new ApiController();
