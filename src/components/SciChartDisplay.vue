<template>
  <div id="scichart-root"></div>
</template>

<script lang="ts" setup>
import useSciChart from '@/composables/useSciChart';
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { SciChartSurface, libraryVersion } from 'scichart';
import useRest from '@/composables/useRest';

SciChartSurface.configure({
  dataUrl: `https://cdn.jsdelivr.net/npm/scichart@${libraryVersion}/_wasm/scichart2d.data`,
  wasmUrl: `https://cdn.jsdelivr.net/npm/scichart@${libraryVersion}/_wasm/scichart2d.wasm`,
});

const { data } = useRest();
const { initSciChart } = useSciChart();

const chartInitializationPromise = ref();

onMounted(() => {
  chartInitializationPromise.value = initSciChart();
});

onBeforeUnmount(() => {
  chartInitializationPromise.value.then((sciChartSurface: any) => {
    sciChartSurface.delete();
  });
});
</script>
