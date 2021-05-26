<template>
  <div>
    <h1>Star Wars Planet Info</h1>

    <div v-if="loading">
      <p>Loading planet data...</p>
    </div>
    <div v-else-if="error">
      <p>There was an error loading the data.</p>
    </div>
    <div v-else>
      <table>
        <caption>Info about the various planets from the Star Wars series.</caption>
        <thead>
          <tr>
            <th>Name</th>
            <th>Climate</th>
            <th>Number of Residents</th>
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
import { isNum } from '../utils/math';
import { UNKNOWN_VALS } from '../constants';

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
    formatNumericValue(value) {
      if (!isNum(value) || parseInt(value) <= 999) {
        return value;
      }
      return new Intl.NumberFormat('en-US').format(value).replace(/,/g, ' ');
    },
    formatUnknownValues(value) {
      return UNKNOWN_VALS.indexOf(value) > -1 ? '?' : value;
    },
    getPlanets() {
      this.loading = true;
      this.$planetService.getPlanets().then(response => {
        this.loading = false;
        this.planets = this.$planetService.transformResults(response.data.results);
      }).catch(error => {
        this.loading = false;
        this.error = true;
        console.error(error);
      });
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
