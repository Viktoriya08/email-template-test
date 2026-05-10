<script setup lang="ts">
import { computed, inject, reactive, ref, watch } from 'vue';

import IconSVG from '@components/utils/templates/ui/IconSVG.vue';
import type { ViewportCheckFunction, ViewportNames } from '@scripts/composables/useViewportHandler';
import { viewportUntilKey } from '@scripts/composables/useViewportHandler';
import { VIEWPORT_SIZES } from '@scripts/consts/utils';

export interface BaseAccordionProps {
	disabled?: boolean;
	mediaUntil?: ViewportNames;
	quantityMore?: boolean;
	btnPay?: boolean;
	tabAwaiting?: boolean;
	tabAccepted?: boolean;
	tabPaymentUpon?: boolean;
	tabPaid?: boolean;
	tabBooked?: boolean;
	tabOnWay?: boolean;
	tabTransport?: boolean;
	tabReady?: boolean;
	tabCompleted?: boolean;
	tabBuyersOrder?: boolean;
	tabBuyersInvoice?: boolean;
	tabReturn?: boolean;
	tabIncomingPayment?: boolean;
	tabOutgoingPayment?: boolean;
	tabShipment?: boolean;
	deliveryPoint?: boolean;
	deliveryCourier?: boolean;
	orderHistory?: boolean;
	contact?: boolean;
}

interface AccordionStyles {
	scrollHeight: string;
	transitionDuration: string;
}

const props = withDefaults(defineProps<BaseAccordionProps>(), {
	disabled: false,
	mediaUntil: undefined,
	quantityMore: false,
	btnPay: false,
	tabAwaiting: false,
	tabAccepted: false,
	tabPaymentUpon: false,
	tabPaid: false,
	tabBooked: false,
	tabOnWay: false,
	tabTransport: false,
	tabReady: false,
	tabCompleted: false,
	tabBuyersOrder: false,
	tabBuyersInvoice: false,
	tabIncomingPayment: false,
	tabOutgoingPayment: false,
	tabShipment: false,
	pickUpPoint: false,
	deliveryCourier: false,
	tabReturn: false,
	orderHistory: false,
	contact: false,
});

const accordionDropdown = ref<HTMLElement>();
const accordionShown = ref(props.mediaUntil ? window.innerWidth <= VIEWPORT_SIZES[props.mediaUntil] : false);
const accordionStyles = reactive<AccordionStyles>({
	scrollHeight: '0px',
	transitionDuration: '0.3s',
});

const viewportUntil = inject(viewportUntilKey) as ViewportCheckFunction;
const isViewportUntil = computed(() => props.mediaUntil ? viewportUntil.value(props.mediaUntil) : false);

watch(isViewportUntil, (value) => {
	accordionShown.value = !!value;
});

function clickHandler() {
	if (props.disabled && isViewportUntil.value)
		return;

	if (accordionShown.value && accordionDropdown.value)
		calculateSizes(accordionDropdown.value);

	accordionShown.value = !accordionShown.value;
}

function calculateSizes(el: Element): void {
	accordionStyles.scrollHeight = `${el.scrollHeight}px`;
	accordionStyles.transitionDuration = `${Math.max(0.3, Math.min(1.5, el.scrollHeight / 1000))}s`;
}
</script>

<template>
	<div
		class="accordion-order pa-order"
		:class="[
			{ disabled },
			{ active: accordionShown },
		]"
	>
		<div class="accordion-order__box">
			<div class="accordion-order__header" @click="clickHandler">
				<div class="pa-order__head pa-order__grid">
					<div class="pa-order__left">
						<div class="pa-order__number">
							№12345678
						</div>
						<div class="pa-order__data">
							<span class="pa-order__data-day">21.05.2024</span>
							<span class="pa-order__data-time">18:05</span>
						</div>
					</div>

					<div v-if="contact" class="pa-order__contact">
						<div class="pa-order__client">
							Константин Георгиевич Красильников
						</div>
						<a class="pa-order__link link link--color" href="tel:+79876543210">+7 987 654-32-10</a>
						<a class="pa-order__link link link--color" href="mailto:client@mail.com">client@mail.com</a>
					</div>

					<div class="pa-order__center">
						<div class="pa-order__compound">
							Состав заказа:
							<span class="pa-order__compound-count">3 шт</span>
						</div>
						<div class="pa-order__imgs">
							<!-- <img src="/img/pa/prod.jpg" width="65" height="40" alt="" class="pa-order__img">
							<div class="pa-order__img"></div>
							<img src="/img/pa/prod.jpg" width="65" height="40" alt="" class="pa-order__img"> -->
							<template v-if="quantityMore">
								<div class="pa-order__img pa-order__img--more">
									+12
								</div>
							</template>
						</div>
					</div>

					<div class="pa-order__tabs">
						<!-- табы:
						//- Ожидает оплаты - tabAwaiting
						//- Принят - tabAccepted
						//- Оплата при получении - tabPaymentUpon
						//- Оплачен - tabPaid
						//- Заблокировано - tabBooked
						//- В пути - tabOnWay
						//- В транскортной компании - tabTransport
						//- Готов к выдаче - tabReady
						//- Завершен - tabCompleted
						//- Заказ покупателя - tabBuyersOrder
						//- Счет покупателю - tabBuyersInvoice
						//- Возврат покупателя - tabReturn
						//- Входящий платеж - tabIncomingPayment
						//- Исходящий платеж - tabOutgoingPayment
						//- Отгрузка - tabShipment
						-->
						<div v-if="tabPaymentUpon" class="order-tab order-tab--upon">
							<span class="order-tab__text">Оплата при получении</span>
						</div>
						<div v-if="tabAwaiting" class="order-tab order-tab--await">
							<span class="order-tab__text">Ожидает оплаты</span>
						</div>
						<div v-if="tabPaid" class="order-tab order-tab--paid">
							<span class="order-tab__text">Оплачен</span>
						</div>
						<div v-if="tabAccepted" class="order-tab order-tab--accepted">
							<IconSVG class="order-tab__icon" name="cart" />
							<span class="order-tab__text">Принят</span>
						</div>
						<div v-if="tabBooked" class="order-tab order-tab--booked">
							<IconSVG class="order-tab__icon" name="clock" />
							<span class="order-tab__text">Забронировано</span>
						</div>
						<div v-if="tabOnWay" class="order-tab order-tab--booked">
							<IconSVG class="order-tab__icon" name="shipping" />
							<span class="order-tab__text">В пути</span>
						</div>
						<div v-if="tabTransport" class="order-tab order-tab--booked">
							<IconSVG class="order-tab__icon" name="box" />
							<span class="order-tab__text">В транспортной компании</span>
						</div>
						<div v-if="tabReady" class="order-tab order-tab--paid">
							<IconSVG class="order-tab__icon" name="checkmark" />
							<span class="order-tab__text">Готов к выдаче</span>
						</div>
						<div v-if="tabCompleted" class="order-tab order-tab--completed">
							<span class="order-tab__text">Завершен</span>
						</div>
						<div v-if="tabBuyersOrder" class="order-tab order-tab--accepted">
							<IconSVG class="order-tab__icon" name="cart" />
							<span class="order-tab__text">Заказ покупателя</span>
						</div>
						<div v-if="tabBuyersInvoice" class="order-tab order-tab--accepted">
							<IconSVG class="order-tab__icon" name="coins" />
							<span class="order-tab__text">Счет покупателю</span>
						</div>
						<div v-if="tabReturn" class="order-tab order-tab--accepted">
							<IconSVG class="order-tab__icon" name="return" />
							<span class="order-tab__text">Возврат покупателя</span>
						</div>
						<div v-if="tabIncomingPayment" class="order-tab order-tab--accepted">
							<IconSVG class="order-tab__icon" name="arrow-in" />
							<span class="order-tab__text">Входящий платеж</span>
						</div>
						<div v-if="tabOutgoingPayment" class="order-tab order-tab--accepted">
							<IconSVG class="order-tab__icon" name="arrow-up" />
							<span class="order-tab__text">Исходящий платеж</span>
						</div>
						<div v-if="tabShipment" class="order-tab order-tab--accepted">
							<IconSVG class="order-tab__icon" name="shipping" />
							<span class="order-tab__text">Отгрузка</span>
						</div>
					</div>
					<div class="pa-order__info">
						<div class="pa-order__control">
							<div class="pa-order__count">
								Итого:
								<span class="pa-order__count-sum">32 800 ₽</span>
							</div>
							<button v-if="!isViewportUntil" class="pa-order__chevron" :disabled="disabled">
								<slot name="icon">
									<IconSVG class="pa-order__chevron-icon" :name="accordionShown ? 'chevron-up' : 'chevron-down'" />
								</slot>
							</button>
						</div>
						<template v-if="btnPay">
							<a href="#" class="btn btn--color-primary pa-order__btn">
								<span class="btn__text">Оплатить</span>
							</a>
						</template>
					</div>
				</div>
			</div>

			<Transition name="accordion" @enter="calculateSizes">
				<div
					v-show="accordionShown"
					ref="accordionDropdown"
					class="accordion-order__dropdown"
					:style="`--accordion-dropdown-height: ${accordionStyles.scrollHeight}; --accordion-dropdown-transition-duration: ${accordionStyles.transitionDuration}`"
				>
					<div class="accordion-order__body">
						<div class="pa-order__body">
							<template v-if="orderHistory">
								<div class="pa-order__body-detal pa-order-detal">
									<div class="title title--h4 pa-order-detal__title">
										Заказ покупателя
									</div>
									<div class="pa-order-detal__elem">
										<span class="pa-order-detal__text">Оформлен на</span>
										<span class="pa-order-detal__info">Длинное наименование компании или ФИО физ лица, на которое оформлен заказ</span>
									</div>
									<div class="pa-order-detal__elem">
										<span class="pa-order-detal__text pa-order-detal__text--wrap">Здесь может быть небольшое стандартное пояснение к каждой операции или прикрепленный документ</span>
									</div>
									<div class="pa-order-detal__elem pa-order-detal__elem--center">
										<span class="pa-order-detal__text">Итого</span>
										<div class="pa-order-detal__sum">
											<span class="pa-order-detal__sum-old">17 050 ₽</span>
											<span class="pa-order-detal__sum-new">32 800 ₽</span>
										</div>
									</div>
								</div>
							</template>
							<template v-else>
								<div class="pa-order__body-detal pa-order-detal">
									<div class="title title--h4 pa-order-detal__title">
										Детали заказа
									</div>
									<div class="pa-order-detal__elem">
										<span class="pa-order-detal__text">Оформлен на</span>
										<span class="pa-order-detal__info">Длинное наименование компании или ФИО физ лица, на которое оформлен заказ</span>
									</div>
									<div class="pa-order-detal__elem">
										<span class="pa-order-detal__text">Склад</span>
										<span class="pa-order-detal__info">Челябинск, Братьев Кашириных 118, строение 1, корпус Б</span>
									</div>
									<div class="pa-order-detal__elem">
										<span class="pa-order-detal__text">Способ оплаты</span>
										<span class="pa-order-detal__info">При получении</span>
									</div>
									<div class="pa-order-detal__elem">
										<span class="pa-order-detal__text">Товаров на сумму</span>
										<span class="pa-order-detal__info">17 250 ₽</span>
									</div>
									<div class="pa-order-detal__elem pa-order-detal__elem--end">
										<div class="pa-order-detal__box">
											<div class="pa-order-detal__text pa-order-detal__text--grey">
												Скидка
											</div>
											<div class="pa-order-detal__text">
												10%
											</div>
										</div>
										<span class="pa-order-detal__info">500 ₽</span>
									</div>
									<div class="pa-order-detal__elem pa-order-detal__elem--end">
										<template v-if="deliveryPoint">
											<div class="pa-order-detal__box">
												<div class="pa-order-detal__text pa-order-detal__text--grey">
													Способ получения и стоимость
												</div>
												<div class="pa-order-detal__text">
													До пункта выдачи СДЭК
												</div>
												<div class="pa-order-detal__text pa-order-detal__text--grey">
													г. Челябинск, ул. Строителей, д. 15, кв. 5
												</div>
											</div>
											<span class="pa-order-detal__info">Оплачивается отдельно</span>
										</template>
										<template v-else-if="deliveryCourier">
											<div class="pa-order-detal__box">
												<div class="pa-order-detal__text pa-order-detal__text--grey">
													Способ получения и стоимость
												</div>
												<div class="pa-order-detal__text">
													Курьером по городу
												</div>
												<div class="pa-order-detal__text pa-order-detal__text--grey">
													г. Челябинск, ул. Строителей, д. 15, кв. 5
												</div>
											</div>
											<span class="pa-order-detal__info">350 ₽</span>
										</template>
										<template v-else>
											<div class="pa-order-detal__box">
												<div class="pa-order-detal__text pa-order-detal__text--grey">
													Способ получения и стоимость
												</div>
												<div class="pa-order-detal__text">
													Самовывоз
												</div>
											</div>
											<span class="pa-order-detal__info">0 ₽</span>
										</template>
									</div>
									<div class="pa-order-detal__elem pa-order-detal__elem--center">
										<span class="pa-order-detal__text">Итого</span>
										<div class="pa-order-detal__sum">
											<span class="pa-order-detal__sum-old">17 050 ₽</span>
											<span class="pa-order-detal__sum-new">32 800 ₽</span>
										</div>
									</div>
								</div>
							</template>
							<div class="pa-order__list">
								<div class="pa-order-elem">
									<!-- <img src="/img/pa/prod.jpg" width="65" height="40" alt="" class="pa-order-elem__img"> -->
									<div class="pa-order-elem__info">
										<div class="pa-order-elem__name">
											Бампер задний Hyundai Solaris 11-13 4D Россия Purple Fantasia PXA (Фиолетовый перламутр)
										</div>
										<div class="pa-order-elem__data">
											TYG-Тайвань
										</div>
										<div class="pa-order-elem__sale">
											Дисконт
										</div>
									</div>
									<div class="pa-order-elem__box">
										<div class="pa-order-elem__code">
											HN04099BB
										</div>
										<div class="pa-order-elem__quantity">
											100 шт
										</div>
									</div>
									<div class="pa-order-elem__price">
										<div class="pa-order-elem__price-new">
											210 000 ₽
										</div>
										<div class="pa-order-elem__price-old">
											212 360 ₽
										</div>
									</div>
								</div>
								<div class="pa-order-elem">
									<!-- <img src="/img/pa/prod.jpg" width="65" height="40" alt="" class="pa-order-elem__img"> -->
									<div class="pa-order-elem__info">
										<div class="pa-order-elem__name">
											Бампер задний Hyundai Solaris 11-13 4D Россия Purple Fantasia PXA (Фиолетовый перламутр)
										</div>
										<div class="pa-order-elem__data">
											TYG-Тайвань
										</div>
										<div class="pa-order-elem__sale">
											Дисконт
										</div>
									</div>
									<div class="pa-order-elem__box">
										<div class="pa-order-elem__code">
											HN04099BB
										</div>
										<div class="pa-order-elem__quantity">
											100 шт
										</div>
									</div>
									<div class="pa-order-elem__price">
										<div class="pa-order-elem__price-new">
											210 000 ₽
										</div>
										<div class="pa-order-elem__price-old">
											212 360 ₽
										</div>
									</div>
								</div>
								<div class="pa-order-elem">
									<!-- <img src="/img/pa/prod.jpg" width="65" height="40" alt="" class="pa-order-elem__img"> -->
									<div class="pa-order-elem__info">
										<div class="pa-order-elem__name">
											Бампер задний Hyundai Solaris 11-13 4D Россия Purple Fantasia PXA (Фиолетовый перламутр)
										</div>
										<div class="pa-order-elem__data">
											TYG-Тайвань
										</div>
										<div class="pa-order-elem__sale">
											Дисконт
										</div>
									</div>
									<div class="pa-order-elem__box">
										<div class="pa-order-elem__code">
											HN04099BB
										</div>
										<div class="pa-order-elem__quantity">
											100 шт
										</div>
									</div>
									<div class="pa-order-elem__price">
										<div class="pa-order-elem__price-new">
											210 000 ₽
										</div>
										<div class="pa-order-elem__price-old">
											212 360 ₽
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Transition>
		</div>
	</div>
</template>

<style scoped lang="sass">
.accordion-order

	&.active
		.accordion-order
			&__header
				background-color: var(--color-neutral-200)

	&__header
		min-height: 160px
		border: var(--border-default)
		border-radius: var(--radius-m)
		background-color: var(--color-neutral-100)
		transition: background-color .3s
		cursor: pointer

		@include hover
			background-color: var(--color-neutral-200)

	&__dropdown
		margin-top: 24px

	&:not(:last-child)
		margin-bottom: 8px

.pa-order-elem
	display: grid
	grid-template-columns: minmax(0, 65px) minmax(0, 6fr) minmax(0, 4.5fr) minmax(0, 1fr)
	gap: fluid(8, 16)
	padding: 24px 0 40px
	border-top: 1px solid var(--color-neutral-200)

	@include media("max", "laptop")
		grid-template-columns: minmax(0, 52px) minmax(0, 1fr) minmax(0, 1fr)

	@include media("max", "tablet")
		padding: 0
		border-top: none

	&__img
		width: 65px

		overflow: hidden

		border-radius: var(--radius-s)
		background-color: var(--color-neutral-200)
		background-image: url("/img/media/icon-photo.svg")
		background-repeat: no-repeat
		background-position: center
		background-size: 20px

		@include media("max", "tablet")
			width: 52px

	&__info
		display: flex
		flex-direction: column
		align-items: flex-start
		gap: fluid(4, 8)
		max-width: 385px
		line-height: 1.45

		@include media("max", "laptop")
			grid-column: 2/-1

	&__name
		font-size: 14px

		@include media("max", "tablet")
			font-weight: 600

	&__data
		color: var(--color-neutral-700)
		font-size: var(--font-size-text-s)

	&__sale
		padding: 4px 16px
		border-radius: 100px
		background-color: var(--color-neutral-300)
		font-size: 14px

		@include media("max", "tablet")
			padding: 4px 12px
			font-weight: 500

	&__box
		display: flex
		flex-wrap: wrap
		justify-content: flex-end
		gap: fluid(16, 70)
		height: fit-content
		margin-right: 30px

		@include media("max", "laptop")
			grid-column: 2/-1
			justify-content: flex-start
			margin-right: 0

	&__code,
	&__quantity
		font-size: 14px

	&__code
		word-break: break-word

	&__price
		display: flex
		flex-direction: column
		gap: 4px
		font-size: 14px

		@include media("max", "laptop")
			grid-column: 2/-1
			flex-direction: row-reverse
			align-items: center
			justify-content: flex-end
			gap: 8px
			margin-top: 4px

		&-new
			white-space: nowrap

		&-old
			color: var(--color-neutral-700)
			text-decoration: line-through
			white-space: nowrap

			@include media("max", "laptop")
				font-size: 12px

	&:not(:last-child)
		margin-bottom: fluid(24, 12)
</style>
