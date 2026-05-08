<script setup lang="ts">
import InputCheckbox from '@components/utils/form/InputCheckbox.vue';
import InputPassword from '@components/utils/form/InputPassword.vue';
import InputText from '@components/utils/form/InputText.vue';
import IconSVG from '@components/utils/templates/ui/IconSVG.vue';
import useFormStore from '@scripts/store/form';
import useVuelidate from '@vuelidate/core';
import { email, helpers, minLength, required } from '@vuelidate/validators';
import { storeToRefs } from 'pinia';
import { computed, reactive, ref, watch } from 'vue';

const externalResults = reactive({});
const { withMessage } = helpers;

const { legalDocs } = storeToRefs(useFormStore());
const formData = reactive({
	password: '',
	passwordRepeat: '',
	email: '',
	checkbox: '',
});

export interface RecoveryEmailProps {
	step?: string;
}
withDefaults(defineProps<RecoveryEmailProps>(), {
	step: 'WaitInputEmail',
});

let stepForm = ref('WaitInputEmail')
watch(stepForm, (newValue, oldValue) => {})


const rules = computed(() => ({
	formData: {

		email: {
			required: withMessage('Поле обязательно для заполнения', required),
			email: withMessage('Некорректный e-mail', email),
		},
		password: {
			required: withMessage('Поле обязательно для заполнения', required),
			minLength: withMessage('Некорректный SMS-код', minLength(6)),
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
		<template v-if="stepForm === 'WaitInputEmail'">
			<a href="/" class="link form__link form__item form__item--margin-b"> 
				<IconSVG class="link__icon" name="chevron-left-md" />
				<span class="link__text">Вернуться на шаг назад</span>
			</a>
			<p class="form__text">Забыли свой пароль? Введите свой адрес электронной почты ниже, и мы отправим вам инструкцию по его восстановлению. Вы также можете воспользоваться формой <a href="/" class="link link--color">восстановления пароля через SMS</a> </p>
			<div class="form__items">
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
			</div>
			<div class="form__bottom form__bottom--center">
				<button class="form__submit btn btn--color-primary" @click="stepForm='GetLinkEmail'" type="submit" :disabled="v$.$error && v$.$dirty">
					Восстановить пароль
				</button>
				<div class="form__agree">
					Нажимая кнопку «Отправить заявку», вы&nbsp;соглашаетесь&nbsp;с&nbsp;<a class="link link--color" :href="legalDocs.privacyPolicy" target="_blank">политикой конфиденциальности</a> и&nbsp;<a class="link link--color" :href="legalDocs.personalData" target="_blank">пользовательским соглашением.</a>
				</div>
				<a href="#" class="link link--color form__item form__item--left title title--h6">Не удается войти на сайт</a>
			</div>

		</template>

		<template v-else-if="stepForm === 'GetLinkEmail'">
			<p class="form__text">На вашу электронную почту ivanovivan@mail.ru отправлена ссылка для восстановления пароля </p>

			<button class="link link--color form__link title title--h6" @click="stepForm='WaitInputEmail'" type="button">Изменить адрес электронной почты</button>

			<div class="form__bottom form__bottom--center">
				<button class="btn btn--color-primary" @click="stepForm='CreateNewPassword'" type="button">
					Понятно
				</button>

			</div>

		</template>

		<template v-if="stepForm === 'CreateNewPassword'">
			<p class="form__text">Придумайте новый пароль</p>

			<div class="form__items">
				<InputPassword
					id="password-input"
					v-model="formData.password"
					class="form__item form__item--required"
					:errors="v$.formData.password.$errors"
					type="password"
					label="Новый пароль"
					autocomplete="email"
					placeholder="Введите новый пароль"
				/>
				<InputPassword
					id="password-repeat-input"
					v-model="formData.passwordRepeat"
					class="form__item form__item--required"
					:errors="v$.formData.password.$errors"
					type="password"
					label="Повторите новый пароль"
					autocomplete="email"
					placeholder="Новый пароль еще раз"
				/>
				<InputCheckbox
					id="remember-input"
					type="checkbox"
					class="form__item"
					text="Запомнить меня"
				/>
			</div>
			<div class="form__bottom form__bottom--center">
				<button class="form__submit btn btn--color-primary disabled" type="submit" :disabled="v$.$error && v$.$dirty">
					Подтвердить
				</button>
				<div class="form__agree">
					Нажимая кнопку «Отправить заявку», вы&nbsp;соглашаетесь&nbsp;с&nbsp;<a class="link link--color" :href="legalDocs.privacyPolicy" target="_blank">политикой конфиденциальности</a> и&nbsp;<a class="link link--color" :href="legalDocs.personalData" target="_blank">пользовательским соглашением.</a>
				</div>
				<a href="#" class="link link--color form__item form__item--left title title--h6">Не удается войти на сайт</a>
			</div>
		</template>

	</form>
</template>

<style scoped lang="sass">

</style>
