import axios from '@/instanceHttp';
import headerAuth from '@/services/headerAuth';

export default {
  stateFactory: true,
  namespaced: true,
  state: {
    user: [],
  },
  getters: {
    User: (state) => state.user,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
  },
  actions: {
    getUser({ commit }, iduser) {
      return axios.get(`/auth/user/${iduser}`, { headers: headerAuth() })
        .then((response) => {
          commit('setUser', response.data[0]);
        })
        .catch((error) => {
          return Promise.reject(error.response.data);
        });
    },
    updateUser({ commit }, object) {
      console.log(object)
      return axios.put(`auth/user/${object.iduser}`, object.body, { headers: headerAuth() })
        .then((response) => {
          console.log(response.data[0])
          commit('setUser', response.data[0]);
        })
        .catch((error) => {
          return Promise.reject(error.response.data);
        });
    },
    deleteUser(iduser) {
      return axios.delete(`/auth/${iduser}`, { headers: headerAuth() })
        .then((response) => { Promise.resolve(response) })
        .catch((error) => {
          return Promise.reject(error.response.data);
        });
    },
  }
};
