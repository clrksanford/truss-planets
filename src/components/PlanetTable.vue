<template>
  <div>
    <h1>Planet Info</h1>
  </div>
</template>

<script>
export default {
  name: 'PlanetTable',
  created() {
    this.$planetService.getPlanets().then(response => {
      console.log(response);
    });
  }
}
</script>
