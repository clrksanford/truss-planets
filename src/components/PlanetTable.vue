<template>
  <div>
    <h1>Planet Info</h1>

    <div v-if="loading">
      <p>Loading planet data...</p>
    </div>
    <div v-else-if="error">
      <p>There was an error loading the data.</p>
    </div>
    <div v-else>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Climate</th>
            <th># Residents</th>
            <th>Terrain(s)</th>
            <th>Population</th>
            <th>Surface Area Covered by Water (km<sup>2</sup>)</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="planet of planets" :key="planet.id">
            <td>
              <a :href="planet.url" target="_blank" rel="noopener noreferrer">
                {{ formatUnknownValues(planet.name) }}
              </a>
            </td>
            <td>{{ formatUnknownValues(planet.climate) }}</td>
            <td>{{ formatNumericValue(planet.numResidents) }}</td>
            <td>{{ formatUnknownValues(planet.terrain) }}</td>
            <td>{{ formatNumericValue(formatUnknownValues(planet.population)) }}</td>
            <td>{{ formatNumericValue(planet.waterArea) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { UNKNOWN } from '../constants';

export default {
  name: 'PlanetTable',
  data() {
    return {
      error: false,
      loading: false,
      planets: []
    };
  },
  created() {
    this.getPlanets();
  },
  methods: {
    formatUnknownValues(value) {
      return value === UNKNOWN ? '?' : value;
    },
    formatNumericValue(value) {
      if (!this.isNum(value) || parseInt(value) <= 999) {
        return value;
      }
      return new Intl.NumberFormat('en-US').format(value).replace(/,/g, ' ');
    },
    getPlanets() {
      this.loading = true;
      this.$planetService.getPlanets().then(response => {
        this.loading = false;
        this.planets = response.data.results.map(planet => {
          return {
            ...planet,
            numResidents: planet.residents ? planet.residents.length : '?',
            waterArea: this.calculateWaterArea(planet)
          }
        }).sort((planet1, planet2) =>  planet1.name > planet2.name ? 1 : -1);
      }).catch(error => {
          this.loading = false;
          console.error(error);
          this.error = true;
      });
    },
    calculateWaterArea(planet) {
      if (!this.isNum(planet.diameter) || !this.isNum(planet.surface_water)) {
        return '?';
      }
      return Math.round(4 * Math.PI * Math.pow(planet.diameter/2, 2) * (planet.surface_water/100));
    },
    isNum(val) {
      return /^\d+$/.test(val);
    }
  }
}
</script>

<style>
table {
  border-collapse: collapse;
  border: 1px solid gray;
}
th, td {
  border: 1px solid gray;
  padding: 5px;
}
</style>
