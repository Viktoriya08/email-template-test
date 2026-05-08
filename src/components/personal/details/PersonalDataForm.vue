<script setup lang="ts">
import InputText from '@components/utils/form/InputText.vue';
import IconSVG from '@components/utils/templates/ui/IconSVG.vue';
import useVuelidate from '@vuelidate/core';
import { email, helpers, minLength, required } from '@vuelidate/validators';
import { computed, reactive, ref } from 'vue';

const externalResults = reactive({});
const { withMessage } = helpers;

const isFinished = ref(false);
const formData = reactive({
	firstName: '',
	secondName: '',
	thirdName: '',
	phone: '',
	email: '',
	priceEmail: '',
});

const rules = computed(() => ({
	formData: {
		phone: {
			required: withMessage('Поле обязательно для заполнения', required),
			minLength: withMessage('Некорректный номер телефона', minLength(18)),
		},
		email: {
			required: withMessage('Поле обязательно для заполнения', required),
			email: withMessage('Некорректный e-mail', email),
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
		<h2 class="form__title title title--h4">Личные данные
			<IconSVG class="form__title-icon" name="user" />
		</h2>
		<div class="form__items form__items--column-3 form__items--column-gap">
			<InputText
				id="first-name-input"
				class="form__item"
				label="Имя"
				autocomplete="given-name"
				placeholder="Введите ваше имя"
				modelValue="Константин"
				maxlength="50"
			/>
			<InputText
				id="second-name-input"
				class="form__item"
				label="Фамилия"
				autocomplete="given-name"
				placeholder="Введите вашу фамилию"
				modelValue="Красильников"
				maxlength="50"
			/>
			<InputText
				id="third-name-input"
				class="form__item"
				label="Отчество"
				autocomplete="given-name"
				placeholder="Введите ваше отчество"
				modelValue="Георгиевич"
				maxlength="50"
			/>
			<InputText
				id="phone-input"
				class="form__item"
				:errors="v$.formData.phone.$errors"
				label="Телефон"
				placeholder="+7 (___) ___ __ __"
				type="tel"
				autocomplete="tel"
				mask-type="phoneMask"
				modelValue="+7 908 999 12 00"
			/>
			<InputText
				id="email-input"
				class="form__item"
				:errors="v$.formData.email.$errors"
				label="E-mail"
				placeholder="Укажите электронную почту"
				modelValue="krasilnikov@mail.ru"
			/>
			<InputText
				id="email-price-input"
				class="form__item"
				:errors="v$.formData.email.$errors"
				label="E-mail для прайсов"
				placeholder="Укажите электронную почту"
				modelValue="pricelist@mail.ru"
			/>
		</div>

		<div class="form__bottom form__bottom--padding">
			<button class="form__submit btn btn--border-primary form-details__btn" type="button"  :disabled="v$.$error && v$.$dirty">
				Запросить редактирование
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
