<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import DefaultSelect from '@components/selects/DefaultSelect.vue';
import InputRange from '@components/utils/form/InputRange.vue';
import InputCheckbox from '@components/utils/form/InputCheckbox.vue';


const formData = reactive({
	brands: '',
	models: '',
	categories: '',
});


</script>

<template>
	<form class="form filters-modal__form">
		<div class="filters-modal__item">
			<div class="form__items">
				<DefaultSelect
					id="filter-brands"
					v-model="formData.brands"
					class="form__item"
					placeholder="Выберите марку"
					searchable
					:options="['Acura', 'Audi', 'Bmw', 'Changan', 'Chery', 'Chevrolet', 'Chrysler', 'Citroen', 'Daewoo', 'Daihatsu']"
				/>

				<DefaultSelect
					id="filter-models"
					v-model="formData.models"
					class="form__item"
					placeholder="Выберите модель"
					searchable
					:options="['Accent', 'Creta 15-', 'Creta 21-', 'Elantra(Avente) V 11-15', 'Elantra 16-', 'Elantra III 00-09', 'Elantra IV 07-10', 'Gets 03-', 'I 10 08-', 'I20 2009']"
				/>
			</div>
		</div>
		<div class="filters-modal__item">
			<div class="form__items">
				<DefaultSelect
					id="filter-categories"
					v-model="formData.categories"
					class="form__item"
					placeholder="Выберите категорию"
					searchable
					:options="['Бампер', 'Бачок', 'Брызговик', 'Капот', 'Заглушка в бампер', 'Корпус']"
				/>
				<slot name="categories" />
			</div>
		</div>
		<div class="filters-modal__item">
			<div class="form__items">
				<InputRange label="Цена" left-prefix="от" right-prefix="до" :model-value="[0,200000]" mask-type="priceMask" />
			</div>
		</div>
		<div class="filters-modal__item">
			<div class="form__items">
				<InputCheckbox
					id="filter-availability"
					text="Только товары в наличии"
				/>
				<InputCheckbox
					id="filter-discount"
					text="Только дисконтные товары"
				/>
			</div>
		</div>
		<div class="filters-modal__submit">
			<button class="form__submit btn btn--color-primary" type="submit">
				<span class="btn__text">Применить фильтры</span>
			</button>
		</div>
	</form>

</template>

<style scoped lang="sass">

</style>
