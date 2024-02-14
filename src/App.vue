<script setup async lang="ts">
import useRest from '@/composables/useRest';
import { watch } from 'vue';

const { data } = useRest();

watch(data, () => {
  console.log(data.value);
});
</script>

<template>
  <main></main>
</template>

<style scoped></style>
