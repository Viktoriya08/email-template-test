<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'Quantity',
	emits: ['update:modelValue'],
	data() {
		return {
			quantity: 1
		};
	},
	methods: {
		minus() {
			if(this.quantity > 1) {
				this.quantity -= 1
				this.$emit('update:modelValue', this.quantity)
			}
		},
		plus() {
			if(this.quantity < 99) {
				this.quantity += 1
				this.$emit('update:modelValue', this.quantity)
			}
		}
	}
});

</script>

<template>
	<div class="quantity">
		<div class="quantity__btn quantity__btn-minus" @click="minus"></div>
		<input v-model="quantity" class="quantity__input" type="numeric">
		<div class="quantity__btn quantity__btn-plus" @click="plus"></div>
	</div>
</template>

