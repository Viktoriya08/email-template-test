<script setup lang="ts">
import InputCheckbox from '@components/utils/form/InputCheckbox.vue';
import InputPassword from '@components/utils/form/InputPassword.vue';
import InputText from '@components/utils/form/InputText.vue';
import useFormStore from '@scripts/store/form';
import useVuelidate from '@vuelidate/core';
import { email, helpers, required } from '@vuelidate/validators';
import { storeToRefs } from 'pinia';
import { computed, reactive } from 'vue';

const externalResults = reactive({});
const { withMessage } = helpers;

const { legalDocs } = storeToRefs(useFormStore());
const formData = reactive({
	password: '',
	email: '',
	checkbox: '',
});

const rules = computed(() => ({
	formData: {

		email: {
			required: withMessage('Поле обязательно для заполнения', required),
			email: withMessage('Некорректный e-mail', email),
		},
	},
}));

const v$ = useVuelidate(rules, { formData, $externalResults: externalResults });


function submitHandler() {
	v$.value.formData.$validate()
		.catch((e) => {
			console.error(e);
		});
}
</script>

<template>
	<form class="form" @submit.prevent="submitHandler">
		<p class="form__text">Введите электронную почту и пароль</p>
		<div class="form__items form__items--row-gap">
			<InputText
				id="email-input"
				v-model="formData.email"
				class="form__item form__item--required"
				:errors="v$.formData.email.$errors"
				type="email"
				label="E-mail"
				autocomplete="email"
				placeholder="Введите e-mail"
			/>
			<InputPassword
				id="password-input"
				v-model="formData.password"
				class="finput-password__input orm__item form__item--required"
				:errors="v$.formData.email.$errors"
				type="password"
				label="Пароль"
				autocomplete="email"
				placeholder="Введите пароль"
			/>
			<div class="form__items form__items--column-2">
				<InputCheckbox
					id="remember-input"
					type="checkbox"
					class="form__item"
					text="Запомнить меня"
				/>
				<a href="#" class="link link--color form__item form__item--right title title--h6">Забыли пароль?</a>
			</div>
		</div>


		<div class="form__bottom form__bottom--center">
			<button class="form__submit btn btn--color-primary disabled" type="submit" :disabled="v$.$error && v$.$dirty">
				Войти
			</button>
			<div class="form__agree">
				Нажимая кнопку «Отправить заявку», вы&nbsp;соглашаетесь&nbsp;с&nbsp;<a class="link link--color" :href="legalDocs.privacyPolicy" target="_blank">политикой конфиденциальности</a> и&nbsp;<a class="link link--color" :href="legalDocs.personalData" target="_blank">пользовательским соглашением.</a>
			</div>
			<a href="#" class="link link--color form__item form__item--left title title--h6">Не удается войти на сайт</a>
		</div>
	</form>
</template>

<style scoped lang="sass">

</style>
