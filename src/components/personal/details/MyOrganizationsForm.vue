<script setup lang="ts">
import InputText from '@components/utils/form/InputText.vue';
import IconSVG from '@components/utils/templates/ui/IconSVG.vue';
import useVuelidate from '@vuelidate/core';
import { email, helpers, minLength, required } from '@vuelidate/validators';
import { computed, reactive, ref, watch } from 'vue';

const externalResults = reactive({});
const { withMessage } = helpers;

const isFinished = ref(false);

let noCompany = ref(true)
watch(noCompany, (newValue, oldValue) => {})

const formData = reactive({

	companyName: '',
	email: '',
	innNumber: '',
	kppNumber: '',
	ogrnNumber: '',
	pcNumber: '',
});

const rules = computed(() => ({
	formData: {
		pcNumber: {
			required: withMessage('Поле обязательно для заполнения', required),
			minLength: withMessage('Некорректный номер счета', minLength(20)),
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
	<form class="form form-details" @submit.prevent="submitHandler" :class="[{ submit: isFinished }]">
		<h2 class="form__title title title--h4">Мои организации
			<IconSVG class="form__title-icon" name="building" />
		</h2>
		<template v-if="noCompany">
			<p class="form__text">У вас не зарегистрировано ни одной организации. Чтобы оплачивать заказы по счету, нажмите на кнопку “Добавить юр. лицо для оплаты”, заполните форму. Наш менеджер свяжется с вами
				в ближайшее время. 
			</p>
			<button class="btn btn--border-primary form-details__btn" @click="noCompany=false">
				Добавить юр. лицо для оплаты
			</button>
		</template>
		<template v-else>

			<h3 class="form__title title title--h5">ООО Урал</h3>
			<div class="form__items form__items--column-3 form__items--column-gap">
				<InputText
					id="company-name-input"
					class="form__item"
					label="Наименование организации"
					placeholder="Наименование организации"
					modelValue="ООО Урал"
					maxlength="100"
				/>
				<InputText
					id="email-input"
					class="form__item"
					:errors="v$.formData.email.$errors"
					label="Почта, на которую будет отправлен счет"
					placeholder="Укажите электронную почту"
					modelValue="ural@mail.ru"
					maxlength="50"
				/>
				<InputText
					id="inn-input"
					class="form__item"
					label="ИНН"
					placeholder="1234567890"
					type="numeric"
					modelValue="1234567890"
				/>
				<InputText
					id="kpp-input"
					class="form__item"
					label="КПП"
					placeholder="1234567890"
					type="numeric"
					modelValue="1234567890"
				/>
				<InputText
					id="ogrn-input"
					class="form__item"
					label="ОГРН"
					placeholder="1234567890"
					type="numeric"
					modelValue="1234567890"
				/>
				<InputText
					id="pc-input"
					class="form__item"
					:errors="v$.formData.pcNumber.$errors"
					label="РС"
					placeholder="12345678901234567890"
					type="numeric"
					modelValue="12345678901234567890"
				/>
			</div>
	
			<div class="form__bottom form__bottom--padding form__bottom--gap form__bottom--wrap">
				<button class="form__submit btn btn--border-primary form-details__btn" :disabled="v$.$error && v$.$dirty">
					Запросить редактирование
				</button>
				<button class="form__submit btn btn--border-primary form-details__btn" :disabled="v$.$error && v$.$dirty">
					Добавить еще одно юр. лицо
				</button>
			</div>
		</template>
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
		align-self: flex-start

		@include media("max", "mobile-xl")
			width: 100%


</style>
