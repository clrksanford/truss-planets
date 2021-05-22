<template>
  <div id="app">
    <PlanetTable />
  </div>
</template>

<script>
import PlanetTable from './components/PlanetTable.vue'
import './services/planet';

export default {
  name: 'Planets',
  components: {
    PlanetTable
  }
}
</script>
