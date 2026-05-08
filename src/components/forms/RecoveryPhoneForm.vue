<script setup lang="ts">
import InputCheckbox from '@components/utils/form/InputCheckbox.vue';
import InputPassword from '@components/utils/form/InputPassword.vue';
import InputText from '@components/utils/form/InputText.vue';
import useFormStore from '@scripts/store/form';
import useVuelidate from '@vuelidate/core';
import { helpers, minLength, required } from '@vuelidate/validators';
import { storeToRefs } from 'pinia';
import { computed, reactive, ref, watch } from 'vue';

const externalResults = reactive({});
const { withMessage } = helpers;

const { legalDocs } = storeToRefs(useFormStore());
const formData = reactive({
	phone: '',
	code: '',
	password: '',
	passwordRepeat: '',
});

let stepForm = ref('WaitInputPhone')
watch(stepForm, (newValue, oldValue) => {})

let resendCode = ref(false)
watch(resendCode, (newValue, oldValue) => {})

const rules = computed(() => ({
	formData: {
		phone: {
			required: withMessage('Поле обязательно для заполнения', required),
			minLength: withMessage('Некорректный номер телефона', minLength(18)),
		},
		code: {
			required: withMessage('Поле обязательно для заполнения', required),
			minLength: withMessage('Некорректный SMS-код', minLength(6)),
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
		<template v-if="stepForm === 'WaitInputPhone'">
			<p class="form__text">Забыли свой пароль? Введите свой телефон ниже, и мы отправим вам SMS-код для восстановления. Вы также можете воспользоваться формой <a href="/" class="link link--color">восстановления пароля через электронную почту</a> </p>
			<div class="form__items">
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
			</div>
	
			<div class="form__bottom form__bottom--center">
				<button class="form__submit btn btn--color-primary" type="button" :disabled="v$.$error && v$.$dirty" @click="stepForm='GetCodePhone'">
					Получить код
				</button>
				<div class="form__agree">
					Нажимая кнопку «Восстановить пароль», вы соглашаетесь с <a class="link link--color" :href="legalDocs.privacyPolicy" target="_blank">политикой конфиденциальности</a> и&nbsp;<a class="link link--color" :href="legalDocs.personalData" target="_blank">пользовательским соглашением.</a>
				</div>
				<a href="#" class="link link--color form__item form__item--left title title--h6">Не удается войти на сайт</a>
			</div>

		</template>

		<template v-else-if="stepForm === 'GetCodePhone'">
			<p class="form__text">Введите SMS-код, отправленный на номер * *** *** 99 99</p>
			<div class="form__items form__items--row-gap">
				<div class="form__item">
					<InputText
						id="code-input"
						v-model="formData.code"
						class="form__item form__item--required"
						:errors="v$.formData.code.$errors"
						placeholder="_ _ _ _ _ _"
						type="tel"
						mask-type="codeMask"
					/>

					<button 
						class="link  form__message" 
						:class="[resendCode ? 'active link--color' : 'link--color-grey']"
						@click="resendCode = true"
						type="button"
						>
						Отправить код повторно
							<span v-if="!resendCode">через 25 сек.</span> 
					</button>
				</div>
				<InputCheckbox
					id="remember-input"
					type="checkbox"
					class="form__item"
					text="Запомнить меня"
				/>
			</div>
			<div class="form__bottom form__bottom--center">
				<button class="form__submit btn btn--color-primary" type="button" @click="stepForm='CreateNewPassword'">
					Восстановить пароль
				</button>
				<div class="form__agree">
					Нажимая кнопку «Отправить заявку», вы&nbsp;соглашаетесь&nbsp;с&nbsp;<a class="link link--color" :href="legalDocs.privacyPolicy" target="_blank">политикой конфиденциальности</a> и&nbsp;<a class="link link--color" :href="legalDocs.personalData" target="_blank">пользовательским соглашением.</a>
				</div>
				<button class="link link--color form__item form__item--left title title--h6" @click="stepForm='WaitInputPhone'">Изменить номер</button>
				<a href="#" class="link link--color form__item form__item--left title title--h6">Не удается войти на сайт</a>
			</div>
		</template>

		<template v-if="stepForm === 'CreateNewPassword'">
			<p class="form__text">Придумайте новый пароль</p>

			<div class="form__items">
				<InputPassword
					id="password-input"
					v-model="formData.password"
					class="finput-password__input orm__item form__item--required"
					:errors="v$.formData.password.$errors"
					type="password"
					label="Новый пароль"
					autocomplete="email"
					placeholder="Введите новый пароль"
				/>
				<InputPassword
					id="password-repeat-input"
					v-model="formData.passwordRepeat"
					class="finput-password__input orm__item form__item--required"
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
