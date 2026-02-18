import axios from "axios";
import config from "../config";

export const be_api = {
  articles: {
    getGrouped: async (preferences) => {
      const res = await axios.post(
        `${config.BASE_URL}/articles/grouped`,
        { preferences: preferences }
      );
      return res.data.data;
    },
    getDetails: async (articleId) => {
      const res = await axios.get(
        `${config.BASE_URL}/articles/${articleId}`
      );
      return res.data.data;
    },
  },
  topics: {
    getAll: async () => {
      const res = await axios.get(`${config.BASE_URL}/topics/getAll`);
      return res.data.data;
    },
    getDetails: async (slug) => {
      const res = await axios.get(`${config.BASE_URL}/topics/${slug}`);
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
    savePreferences: async (topics) => {
        const res = await axios.post(`${config.BASE_URL}/user/updatePreferences`, {
            topics
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("authorization_token")}`
            }
        });
        return res.data;
    }
  }
};
