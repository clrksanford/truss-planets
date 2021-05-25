import Vue from 'vue';
import axios from 'axios';
import { isNum, calcSphereSurfaceArea } from '../utils/math';

Vue.prototype.$planetService = {
  getPlanets() {
    return axios.get(`http://swapi.dev/api/planets/`);
  },
  transformResults(results) {
    return results.map(planet => {
      return {
        ...planet,
        numResidents: planet.residents ? planet.residents.length : '?',
        waterArea: this.calculateWaterArea(planet)
      }
    }).sort((planet1, planet2) =>  planet1.name > planet2.name ? 1 : -1);
  },
  calculateWaterArea(planet) {
    if (!isNum(planet.diameter) || !isNum(planet.surface_water)) {
      return '?';
    }
    return Math.round(
        calcSphereSurfaceArea(planet.diameter / 2) * (planet.surface_water / 100)
    );
  }
};
