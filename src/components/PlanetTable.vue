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
                {{ $filters.formatUnknownValue(planet.name) }}
              </a>
            </td>
            <td>{{ $filters.formatUnknownValue(planet.climate) }}</td>
            <td>{{ $filters.formatNumericValue(planet.numResidents) }}</td>
            <td>{{ $filters.formatUnknownValue(planet.terrain) }}</td>
            <td>{{ $filters.formatNumericValue($filters.formatUnknownValue(planet.population)) }}</td>
            <td>{{ $filters.formatNumericValue(planet.waterArea) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
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
