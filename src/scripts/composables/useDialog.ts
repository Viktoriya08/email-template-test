export function useDialog() {
	const checkDialogSupport = (element: HTMLDialogElement) => {
		if (window.HTMLDialogElement)
			return;

		import('dialog-polyfill').then(({ default: polyfill }) => {
			polyfill.registerDialog(element);
		});
	};

	return { checkDialogSupport };
}
