<!--TODO: доработать на мобиле раскрытие, чтобы при клике на другой строке предыдущая строка закрывалась-->

<script lang="ts">
import type { PropType } from 'vue';
import { defineComponent } from 'vue';

type Tab =
	| {
	label: string;
	value: string | number;
	disabled?: boolean;
}
	| string;
type Tabs = Tab[];

export default defineComponent({
	name: 'BrandsTabs',
	props: {
		modelValue: {
			type: [String, Number],
			default: () => null,
		},
		tabs: {
			type: Array as PropType<Tabs>,
			required: true,
			default: () => [],
		},
		tag: {
			type: String as PropType<'button' | 'a'>,
			default: () => 'button',
		},
	},
	emits: ['update:modelValue', 'change'],
	data() {
		return {
			activeTab: this.modelValue,
		};
	},
	computed: {
		value: {
			get(): string | number {
				return this.modelValue ?? this.activeTab;
			},
			set(value: string | number) {
				this.activeTab = value;
				this.$emit('update:modelValue', value);
				this.$emit('change', value);
			},
		},
		getLabel() {
			return (tab: Tab) => (typeof tab === 'string' ? tab : tab.label);
		},
		isActive() {
			return (tab: Tab) =>
				typeof tab === 'string' ? this.value === tab : this.value === tab.value;
		},
	},
	methods: {
		setTab(event: PointerEvent, tab: Tab): void {
			if (typeof tab !== 'string' && tab.disabled) {
				event.preventDefault();
				return;
			}
			this.value = typeof tab === 'string' ? tab : tab.value;

			if (event.target instanceof HTMLElement) {
				event.target.scrollIntoView({
					behavior: 'smooth',
					block: 'nearest',
					inline: 'center',
				});
			}
		},
	},
});
</script>

<template>

	<ul class="brands-tabs__list">
		<li v-for="(tab, index) in tabs" :key="index" class="brands-tabs__item">
			<Component
					:is="tag"
					class="brands-tabs__tab"
					:disabled="typeof tab !== 'string' && tab.disabled"
					:class="[
					{ active: isActive(tab) },
					{ disabled: typeof tab !== 'string' && tab.disabled },
				]"
					@click="setTab($event, tab)"
			>
				{{ getLabel(tab) }}
			</Component>
		</li>
	</ul>

</template>

<style scoped lang="sass">

</style>
