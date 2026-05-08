<script setup lang="ts">
import DefaultSelect from '@components/selects/DefaultSelect.vue';
import InputFile from '@components/utils/form/InputFile.vue';
import InputText from '@components/utils/form/InputText.vue';
import useFormStore from '@scripts/store/form';
import useVuelidate from '@vuelidate/core';
import { helpers, minLength, required } from '@vuelidate/validators';
import { storeToRefs } from 'pinia';
import { computed, reactive, ref } from 'vue';

const externalResults = reactive({});
const { withMessage } = helpers;

const { legalDocs } = storeToRefs(useFormStore());
const isFinished = ref(false);
const formData = reactive({
	firstName: '',
	phone: '',
	email: '',
	city: '',
	job: '',
	link: '',
	file: null,
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
					class="form__item form__item--span-2 form__item--required"
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
					id="email-input"
					v-model="formData.email"
					class="form__item"
					label="E-mail"
					placeholder="Укажите электронную почту"
			/>
			<InputText
					id="city-input"
					v-model="formData.city"
					class="form__item form__item--span-2 form__item--required"
					label="Город"
					placeholder="Введите город"
			/>
			<DefaultSelect
					id="job"
					v-model="formData.job"
					class="form__item form__item--span-2"
					placeholder="Выберите из списка"
					label="Вакансия"
					searchable
					:options="['Вакансия', 'Вакансия', 'Вакансия', 'Название вакансии в несколько строк Название вакансии в несколько строк', 'Вакансия', 'Вакансия', 'Вакансия', 'Вакансия', 'Вакансия', 'Вакансия']"
			/>
			<InputFile
					id="link-input"
					v-model="formData.file"
					class="form__item form__item--span-2"
					label="Резюме"
					placeholder="DOC, PDF, RTF до 3 Мб"
			/>
			<InputText
					id="link-input"
					v-model="formData.link"
					class="form__item form__item--span-2"
					label="Ссылка на резюме"
					placeholder="Укажите ссылку на резюме"
			/>
		</div>

		<div class="form__bottom form__bottom--row">
			<div class="form__agree">
				Нажимая кнопку «Отправить заявку», вы&nbsp;соглашаетесь с&nbsp;<a class="link link--color" :href="legalDocs.privacyPolicy" target="_blank">политикой конфиденциальности</a> и&nbsp;<a class="link link--color" :href="legalDocs.personalData" target="_blank">пользовательским соглашением.</a>
			</div>
			<button class="form__submit btn btn--color-primary" type="submit" :disabled="v$.$error && v$.$dirty">
				Откликнуться
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
