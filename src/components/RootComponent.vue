<script setup lang="ts">
import { onMounted } from 'vue';
import initVanillaModules from '@scripts/plugins/vanilla';

onMounted(() => {
	initVanillaModules();
});
</script>

<template>
	<slot />
</template>

<style scoped lang="sass"></style>
