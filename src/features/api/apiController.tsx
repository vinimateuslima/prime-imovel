import axios from "axios";

class ApiController {
  private baseURL = "https://desafio-engeman.onrender.com/api";

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
    const response = await axios.get(this.baseURL + route, {
      params,
      headers: this.getHeaders(),
    });

    return response.data;
  }

  async post(route: string, body?: object) {
    const response = await axios.post(
      this.baseURL + route,
      body,
      {
        headers: this.getHeaders(),
      }
    );

    return response.data;
  }

  async put(route: string, body?: object) {
    const response = await axios.put(
      this.baseURL + route,
      body,
      {
        headers: this.getHeaders(),
      }
    );

    return response.data;
  }

  async delete(route: string) {
    const response = await axios.delete(
      this.baseURL + route,
      {
        headers: this.getHeaders(),
      }
    );

    return response.data;
  }
}

export const apiController = new ApiController();
