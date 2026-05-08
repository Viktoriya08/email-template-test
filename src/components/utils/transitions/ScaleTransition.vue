<script setup lang="ts">

</script>

<template>
	<transition name="scale">
		<slot />
	</transition>
</template>

<style lang="sass">
.scale-enter-active,
.scale-leave-active
	transition: transform .4s ease

.scale-enter-from,
.scale-leave-to
	transform: scale(.8)
</style>
