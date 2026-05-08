// Import styles
import 'unfonts.css';
import '@styles/main.sass';

// Import vue app
import APP from '@scripts/app';

document.addEventListener('DOMContentLoaded', () => {
	APP.mount('#app');
});
