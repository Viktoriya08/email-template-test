import useBaseStore from '@scripts/store/base';

export default function getBaseStore() {
	const {
		errorMessage: showErrorToast,
		warningMessage: showWarningToast,
		infoMessage: showInfoToast,
		successMessage: showSuccessToast,
		isLoading,
		isActionPending,
	} = useBaseStore();

	return {
		showErrorToast,
		showWarningToast,
		showInfoToast,
		showSuccessToast,
		isLoading,
		isActionPending,
	};
}
