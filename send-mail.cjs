const fs = require('node:fs');
const path = require('node:path');
const nodemailer = require('nodemailer');

// Настройки SMTP — пример для Яндекс Почты
const transporter = nodemailer.createTransport({
	host: 'smtp.yandex.ru',
	port: 465,
	secure: true,
	auth: {
		user: 'victoria.gnezdilova0808',
		pass: 'kbdgrnvmlwlsioym', // НЕ пароль от почты, а пароль приложения!
	},
});

// Читаем HTML-шаблон
const emailHtml = fs.readFileSync(
	path.resolve(__dirname, 'dist/views/emails/main.html'),
	'utf-8',
);
// to: '<v.gnezdilova@rt-solar.ru>',
// to: '<victoria.gnezdilova@gmail.com>',
async function sendTestEmail() {
	try {
		const info = await transporter.sendMail({
			from: '"Виктория Гнездилова" <victoria.gnezdilova0808@yandex.ru>',
			to: '<v.gnezdilova@rt-solar.ru>',
			subject: `Тестовое задание - верстка письма — ${new Date().toLocaleString()}`,
			html: emailHtml,
		});

		console.log('Письмо отправлено:', info.messageId);
	}
	catch (error) {
		console.error('Ошибка:', error);
	}
}

sendTestEmail();
