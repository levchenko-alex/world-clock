import Vue from 'vue';
import Vuex from 'vuex';

import http from '@/utils/http';

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
  },
  SORT(state, clocks) {
    state.clocks = clocks;
  }
};

const actions = {
  async fetchClocks({ commit }) {
    const { clocks } = await http.get('api/clocks');
    commit('FETCH_CLOCKS', clocks);
  },
  async fetchTimezones({ commit }) {
    if (!state.timezones.length) {
      const { timezones } = await http.get('api/timezones');
      commit('FETCH_TIMEZONES', timezones);
    }
  },
  sortClocks({ commit }, sortBy) {
    let sortedClocks = [];
    switch(sortBy) {
      case 'timezone':
        sortedClocks = state.clocks.sort((a, b) => a.offset - b.offset);
        break;
      case 'description':
        sortedClocks = state.clocks.sort((a, b) => {
          if (a.description < b.description) {
            return -1;
          }

          if (a.description > b.description) {
            return 1;
          }

          return 0;
        });
        break;
    }
    commit('SORT', sortedClocks);
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
