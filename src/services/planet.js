import Vue from 'vue';
import axios from 'axios';

Vue.prototype.$planetService = {
  getPlanets() {
    return axios.get(`http://swapi.dev/api/planets/`);
  }
};
