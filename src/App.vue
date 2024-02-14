<script setup lang="ts">
import SciChartDisplay from '@/components/SciChartDisplay.vue';
</script>

<template>
  <main class="container">
    <SciChartDisplay class="chart" />
  </main>
</template>

<style scoped>
.container {
  height: 100vh;
}
.chart {
  height: 100%;
  width: 100%;
}
</style>
