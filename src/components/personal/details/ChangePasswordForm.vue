<script setup lang="ts">
import InputPassword from '@components/utils/form/InputPassword.vue';
import IconSVG from '@components/utils/templates/ui/IconSVG.vue';
import useVuelidate from '@vuelidate/core';
import { helpers, minLength, required } from '@vuelidate/validators';
import { computed, reactive, ref } from 'vue';

const externalResults = reactive({});
const { withMessage } = helpers;

const isFinished = ref(false);
const formData = reactive({
	password: '',
	newPassword: '',
	repeatPassword: '',
});

const rules = computed(() => ({
	formData: {
		password: {
			required: withMessage('Поле обязательно для заполнения', required),
			minLength: withMessage('Некорректный пароль', minLength(6)),
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
		<h2 class="form__title title title--h4">Изменение пароля
			<IconSVG class="form__title-icon" name="lock" />
		</h2>
		<div class="form__items form__items--column-3 form__items--column-gap">
			<InputPassword
				id="password-input"
				v-model="formData.password"
				class="form__item form__item--required"
				:errors="v$.formData.password.$errors"
				type="password"
				label="Текущий пароль"
				placeholder="Введите текущий пароль"
				maxlength="6"
			/>
		</div>
		<div class="form__items form__items--column-3 form__items--column-gap">
			<InputPassword
				id="new-password-input"
				class="form__item"
				label="Новый пароль"
				placeholder="Введите новый пароль"
				maxlength="6"
			/>
		</div>
		<div class="form__items form__items--column-3 form__items--column-gap">
			<InputPassword
				id="repeat-password-input"
				class="form__item"
				label="Повторите новый пароль"
				placeholder="Новый пароль еще раз"
				maxlength="6"
			/>
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
