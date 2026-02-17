import axios from "axios";
import config from "../config";

export const be_api = {
  articles: {
    getGrouped: async () => {

      console.log("API response for grouped articles:");
      console.log("Base URL:", config.BASE_URL);   
      console.log(" URL:",  `${config.BASE_URL}/articles/grouped`);
      const res = await axios.get(
        `${config.BASE_URL}/articles/grouped`
      );
      console.log("Full response:", res);
      return res.data.data;
    },
  },
  topics: {
    getAll: async () => {
      const res = await axios.get(`${config.BASE_URL}/topics/getAll`);
      return res.data.data;
    },
  },

  auth: {
    login: async (credentials) => {
      const res = await axios.post(
        `${config.BASE_URL}/auth/login`,
        credentials
      );
      return res.data;
    },

    register: async (data) => {
        console.log("Registering user with data:", data); // Debug log
        console.log("process.env.BASE_URL",config.BASE_URL)
      const res = await axios.post(`${config.BASE_URL}/auth/register`, {
        email: data.email,
        password: data.password,
        name: data.name,
      });

      return res.data;
    },
  },

  user: {
    getProfile: async () => {
        const res = await axios.get(`${config.BASE_URL}/user/me`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("authorization_token")}`
        }
        });
        return res.data;
    },
  }
};
