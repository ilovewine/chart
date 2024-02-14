<template>
  <div id="scichart-root"></div>
</template>

<script lang="ts" setup>
import useSciChart from '@/composables/useSciChart';
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { SciChartSurface, libraryVersion } from 'scichart';
import useRest from '@/composables/useRest';

SciChartSurface.configure({
  dataUrl: `https://cdn.jsdelivr.net/npm/scichart@${libraryVersion}/_wasm/scichart2d.data`,
  wasmUrl: `https://cdn.jsdelivr.net/npm/scichart@${libraryVersion}/_wasm/scichart2d.wasm`,
});

const { data } = useRest();
const { initSciChart } = useSciChart();

const chartInitializationPromise = ref();
const isMounted = ref(false);

watch([data, isMounted], () => {
  if (isMounted.value && data.value.length) {
    chartInitializationPromise.value = initSciChart(data.value);
  }
});

onMounted(() => {
  isMounted.value = true;
});

onBeforeUnmount(() => {
  chartInitializationPromise.value.then((sciChartSurface: any) => {
    sciChartSurface.delete();
  });
  isMounted.value = false;
});
</script>
