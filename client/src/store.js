import Vue from 'vue';
import Vuex from 'vuex';

import http from '@/http';

Vue.use(Vuex);

const state = {
  clocks: [],
  timezones: [],
};

const mutations = {
  FETCH_CLOCKS(state, clocks) {
    state.clocks = clocks;
  },
  FETCH_TIMEZONES(state, timezones) {
    state.timezones = timezones;
  }
};

const actions = {
  async fetchClocks({ commit }) {
    const { clocks } = await http.get('api/clocks');
    commit('FETCH_CLOCKS', clocks);
  },
  async fetchTimezones({ commit }) {
    const { timezones } = await http.get('api/timezones');
    commit('FETCH_TIMEZONES', timezones);
  }
};

const getters = {
  clocks: state => state.clocks,
  timezones: state => state.timezones,
};

export default new Vuex.Store({
  state,
  actions,
  getters,
  mutations,
});
