<script setup lang="ts">
export interface IconSVGProps {
	name: string;
}
defineProps<IconSVGProps>();
</script>

<template>
	<svg aria-hidden="true">
		<use :xlink:href="`/__spritemap#icon-${name}`" />
	</svg>
</template>

<style scoped lang="sass"></style>
