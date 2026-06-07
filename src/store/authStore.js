import { create } from "zustand";
import { authApi } from "../api/authApi";

const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,
  loading: false,

  login: async (data) => {
    set({ loading: true });

    try {
      const res = await authApi.login(data);

      const token = res.data.token;
      const user = res.data.user;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      set({
        token,
        user,
        loading: false,
      });

      return res.data;
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },

  register: async (data) => {
    set({ loading: true });

    try {
      const res = await authApi.register(data);

      const token = res.data.token;
      const user = res.data.user;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      set({
        token,
        user,
        loading: false,
      });

      return res.data;
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    set({
      token: null,
      user: null,
    });
  },
}));

export default useAuthStore;