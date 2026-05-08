<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import { helpers, minLength, required } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';
import InputText from '@components/utils/form/InputText.vue';
import useFormStore from '@scripts/store/form';
import { storeToRefs } from 'pinia';

const externalResults = reactive({});
const { withMessage } = helpers;

const { legalDocs } = storeToRefs(useFormStore());
const isFinished = ref(false);
const formData = reactive({
	firstName: '',
	phone: '',
	vin: '',
	detail: '',
});

const rules = computed(() => ({
	formData: {
		phone: {
			required: withMessage('Поле обязательно для заполнения', required),
			minLength: withMessage('Некорректный номер телефона', minLength(18)),
		},
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
		<div class="form__items form__items--column-2">
			<InputText
					id="first-name-input"
					v-model="formData.firstName"
					class="form__item"
					label="Ваше имя"
					autocomplete="given-name"
					placeholder="Введите ваше имя"
			/>
			<InputText
					id="phone-input"
					v-model="formData.phone"
					class="form__item form__item--required"
					:errors="v$.formData.phone.$errors"
					label="Телефон"
					placeholder="+7 (___) ___ __ __"
					type="tel"
					autocomplete="tel"
					mask-type="phoneMask"
			/>
			<InputText
					id="link-input"
					v-model="formData.vin"
					class="form__item"
					label="VIN-номер"
					placeholder="Введите VIN-номер"
			/>
			<InputText
					id="link-input"
					v-model="formData.detail"
					class="form__item"
					label="Какая деталь вас интересует?"
					placeholder="Наименование детали"
			/>
		</div>

		<div class="form__bottom form__bottom--row">
			<div class="form__agree">
				Нажимая кнопку «Отправить заявку», вы&nbsp;соглашаетесь с&nbsp;<a class="link link--color" :href="legalDocs.privacyPolicy" target="_blank">политикой конфиденциальности</a> и&nbsp;<a class="link link--color" :href="legalDocs.personalData" target="_blank">пользовательским соглашением.</a>
			</div>
			<button class="form__submit btn btn--color-primary" type="submit" :disabled="v$.$error && v$.$dirty">
				Отправить заявку
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

</style>
