<template>
  <div>
    <h1>Planet Info</h1>

    <div v-if="loading">
      <p>Loading planet data...</p>
    </div>
    <div v-else>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Climate</th>
            <th># Residents</th>
            <th>Terrain</th>
            <th>Population</th>
            <th>Surface Area Covered by Water</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="planet of planets" :key="planet.id">
            <td>{{ planet.name }}</td>
            <td>{{ planet.climate }}</td>
            <td>{{ planet.residents.length }}</td>
            <td>{{ planet.terrain }}</td>
            <td>{{ planet.population }}</td>
            <td>?</td>
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
        this.planets = response.data.results;
      });
    }
  }
}
</script>
