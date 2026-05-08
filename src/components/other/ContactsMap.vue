<script lang="ts">
import { defineComponent } from 'vue';

// eslint-disable-next-line
// @ts-ignore
declare const ymaps: any;
// eslint-disable-next-line
// @ts-ignore
let mapsConstructor: any;
// eslint-disable-next-line
// @ts-ignore
let mapInstance: any;

export default defineComponent({
	name: 'ContactsMap',

	mounted() {
		if (document.querySelector('#ymaps-component')) {
			this.initMap();
		}
		else {
			const script = document.createElement('script');
			script.id = 'ymaps-component';
			script.setAttribute('src', 'https://api-maps.yandex.ru/2.1/?lang=ru_RU&load=package.full&apikey=eee3b2b2-7f31-4bfc-9e16-8b1a248fcceb');
			document.head.appendChild(script);
			script.onload = () => {
				// eslint-disable-next-line
				// @ts-ignore
				mapsConstructor = ymaps;
				mapsConstructor.ready(this.initMap);
			};
		}
	},

	methods: {
		async initMap() {
			// eslint-disable-next-line
			// @ts-ignore
			mapInstance = await new mapsConstructor.Map('map', {
				behaviors: ['default'],
				zoom: 15,
				center: [55.195817, 61.369792],
				controls: ['geolocationControl'],
			}, { suppressMapOpenBlock: true });
			if (mapInstance) {
				mapInstance.behaviors.disable('scrollZoom');
				this.addPlacemark();
				this.addZoom();
			}
		},
		addPlacemark() {
			const placemark: any = new ymaps.Placemark(mapInstance.getCenter(), {
				hintContent: 'Kuzov Project',
				balloonContent: `Россия, г. Челябинск, <br> ул.Косарева 2, корпус 2, <br> офис 301 (2 этаж)`,
			}, {
				iconLayout: 'default#image',
				iconImageHref: ``,
				iconImageSize: [48, 48],
				iconImageOffset: [-5, -38],
			});
			// eslint-disable-next-line
			// @ts-ignore
			mapInstance.geoObjects.add(placemark);
		},
		addZoom() {
			const zoomControl: any = new ymaps.control.ZoomControl({
				options: {
					size: 'small',
				},
			});
			mapInstance.controls.add(zoomControl);
		},
	},
});
</script>

<template>
	<div id="map" class="contacts-map" />
</template>
