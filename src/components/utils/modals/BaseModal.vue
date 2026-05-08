<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';
import '@styles/modals/_index.sass';
import useModalsStore from '@scripts/store/modals';
import { useDialog } from '@scripts/composables/useDialog';

export interface BaseModalProps {
	id: string;
}

const { id } = defineProps<BaseModalProps>();
const { closeModal, registerModal, unregisterModal, isModalOpened } = useModalsStore();
const { checkDialogSupport } = useDialog();

const modal = ref<HTMLDialogElement>();
const modalShown = computed(() => isModalOpened(id));

onMounted(() => {
	registerModal(id);
	checkDialogSupport(modal.value as HTMLDialogElement);
});

onUnmounted(() => {
	unregisterModal(id);
});

function hideModal() {
	closeModal(id);
}
</script>

<template>
	<teleport to="#modals-container">
		<Transition name="modal" :duration="450" appear>
			<dialog
				v-if="modalShown"
				ref="modal"
				class="modal-window"
				:open="modalShown"
				@keydown.esc="hideModal"
			>
				<div class="modal-window__bg" />

				<div class="modal-window__body" @mousedown.self="hideModal">
					<slot :close="hideModal" />
				</div>
			</dialog>
		</Transition>
	</teleport>
</template>

<style scoped lang="sass">
.modal-window
	position: fixed
	top: 0
	left: 0
	z-index: var(--z-index-modal)

	width: 100%
	height: 100%

	border: none

	background: transparent

	&__body
		position: relative
		z-index: var(--z-index-above)

		display: flex
		flex-direction: column
		align-items: center

		width: 100%
		height: 100%
		padding: var(--wrapper-padding)

		overflow-x: hidden
		overflow-y: auto

		@include v-scroll

	&__bg
		position: absolute
		inset: 0
		z-index: var(--z-index-below)
		width: 100%
		height: 100%
		background: rgba(var(--color-neutral-900-rgb), .9)
		pointer-events: none

.modal-enter-active
	& .modal-window
		&__bg
			transition: opacity .3s ease

		&__body
			transition: transform .3s ease .15s, opacity .3s ease .15s

.modal-leave-active
	& .modal-window
		&__bg
			transition: opacity .3s ease .15s

		&__body
			transition: transform .3s ease, opacity .3s ease

.modal-enter-from, .modal-leave-to
	& .modal-window
		&__bg
			opacity: 0

		&__body
			opacity: 0
			transform: translateY(40px)
</style>
