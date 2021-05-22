<template>
  <div>
    <h1>Planet Info</h1>

    <div v-if="loading">
      <p>Loading planet data...</p>
    </div>
    <div v-else>
      {{ planets }}
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
