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
const formData = reactive({
	phone: '',
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
		.catch((e) => {
			console.error(e);
		});
}
</script>

<template>
	<form class="form" @submit.prevent="submitHandler">
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
			<button class="form__submit btn btn--color-primary" type="submit" :disabled="v$.$error && v$.$dirty">
				Отправить заявку
			</button>
			<div class="form__agree">
				Нажимая кнопку «Отправить заявку», вы&nbsp;соглашаетесь&nbsp;с&nbsp;<a class="link link--color" :href="legalDocs.privacyPolicy" target="_blank">политикой конфиденциальности</a> и&nbsp;<a class="link link--color" :href="legalDocs.personalData" target="_blank">пользовательским соглашением.</a>
			</div>
		</div>
	</form>
</template>

<style scoped lang="sass">

</style>
