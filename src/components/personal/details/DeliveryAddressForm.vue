<script setup lang="ts">
import InputText from '@components/utils/form/InputText.vue';
import IconSVG from '@components/utils/templates/ui/IconSVG.vue';
import useVuelidate from '@vuelidate/core';
import { helpers } from '@vuelidate/validators';
import { computed, reactive, ref } from 'vue';

const externalResults = reactive({});
const { withMessage } = helpers;

const isFinished = ref(false);
const formData = reactive({
	city: '',
	street: '',
	house: '',
	office: '',
	entrance: '',
});

const rules = computed(() => ({
	formData: {

	},
}));

const v$ = useVuelidate(rules, { formData, $externalResults: externalResults });

function submitHandler() {
	v$.value.formData.$validate()
		.then((result) => {
			if (!result)
				return;
			isFinished.value = true;
		})
		.catch((e) => {
			console.error(e);
		});
}
</script>

<template>
	<form class="form" @submit.prevent="submitHandler" :class="[{ submit: isFinished }]">
		<h2 class="form__title title title--h4">Адрес доставки
			<IconSVG class="form__title-icon" name="shipping" />
		</h2>
		<div class="form__items form__items--column-3 form__items--column-gap">
			<InputText
				id="city-name-input"
				class="form__item"
				label="Город"
				autocomplete="given-name"
				placeholder="Введите город доставки"
				modelValue="Челябинск"
				maxlength="50"
			/>
			<InputText
				id="street-name-input"
				class="form__item"
				label="Улица"
				autocomplete="given-name"
				placeholder="Введите улицу"
				modelValue="Братьев Кашириных"
				maxlength="50"
			/>
			<div class="form__items form__items--column-3 form__items--column-gap">
				<InputText
					id="house-input"
					class="form__item form__item--width"
					label="Дом"
					type="numeric"
					placeholder="Номер дома"
					modelValue="123"
					maxlength="10"
				/>
				<InputText
					id="office-number-input"
					class="form__item form__item--width"
					label="Кв/Офис"
					placeholder="Номер Кв/Оф"
					type="numeric"
					mask-type="phoneMask"
					maxlength="10"
				/>
				<InputText
					id="entrance-number-input"
					class="form__item form__item--width"
					label="Подъезд"
					type="numeric"
					placeholder="Номер под-а"
					maxlength="10"
				/>
			</div>
		</div>

		<div class="form__bottom form__bottom--padding">
			<button class="form__submit btn btn--color-primary form-details__btn" type="submit" :disabled="v$.$error && v$.$dirty">
				Сохранить изменения
			</button>
		</div>
	</form>

	<div v-show="isFinished" class="form-send">
		<div class="form-send__info">
			<div class="form__title">
				Спасибо!
			</div>
			<div class="form-send__text">
				Мы свяжемся с вами <br> в ближайшее время.
			</div>
		</div>
	</div>
</template>

<style scoped lang="sass">
.form-details
	&__btn
		@include media("max", "mobile-xl")
			width: 100%

</style>
