<script setup lang="ts">
import {reactive} from 'vue';
import DefaultSelect from '@components/selects/DefaultSelect.vue';

const formData = reactive({
	brands: '',
	models: '',
});


</script>

<template>
	<form class="form form--dark models-search__form">
		<div class="form__items">
			<div class="models-search__item">
				<DefaultSelect
					id="brands"
					v-model="formData.brands"
					class="form__item"
					placeholder="Выберите марку авто"
					label="Марка авто"
					searchable
					:options="['Acura', 'Audi', 'Bmw', 'Changan', 'Chery', 'Chevrolet', 'Chrysler', 'Citroen', 'Daewoo', 'Daihatsu']"
				/>

				<div class="models-search__tags tags">
					<span class="tags__label">Популярные марки</span>
					<div class="tags__list">
						<a href="#" class="tag tag--color-revert">
							<span class="tag__text">Chevrolet</span>
						</a>
						<a href="#" class="tag tag--color-revert">
							<span class="tag__text">Opel</span>
						</a>
						<a href="#" class="tag tag--color-revert">
							<span class="tag__text">Hyundai</span>
						</a>
						<a href="#" class="tag tag--color-revert">
							<span class="tag__text">Mazda</span>
						</a>
						<a href="#" class="tag tag--color-revert">
							<span class="tag__text">Skoda</span>
						</a>
						<a href="#" class="tag tag--color-revert">
							<span class="tag__text">Toyota</span>
						</a>
						<a href="#" class="tag tag--color-revert">
							<span class="tag__text">Kia</span>
						</a>
						<a href="#" class="tag tag--color-revert">
							<span class="tag__text">Mitsubishi</span>
						</a>
					</div>
				</div>

			</div>

			<div class="models-search__item">
				<DefaultSelect
					id="models"
					v-model="formData.models"
					class="form__item"
					placeholder="Выберите модель авто"
					label="Модель авто"
					searchable
					:options="['1series E87', 'Hyundai Solaris', 'Accent', 'Greta', 'Elantra', 'Getz', 'Matrix', 'Sonata', 'Solaris', 'Starex']"
				/>
			</div>

		</div>
	</form>

</template>

<style scoped lang="sass">

</style>
