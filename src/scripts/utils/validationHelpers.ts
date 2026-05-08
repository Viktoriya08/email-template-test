import { isImage } from '@scripts/utils/fileHelpers';

function fileSize(size: number) {
	return (file: File) => {
		if (!file || !(file instanceof File))
			return true;

		const fileSizeInKb = Math.round((file.size / 1024) * 100) / 100;

		return fileSizeInKb <= size / 1024;
	};
};

function filesSizeValidator(size: number) {
	return (files: FileList) => Array.from(files).every(fileSize(size));
};

function isFileImage(file: File) {
	if (!file || !(file instanceof File))
		return true;

	return isImage(file.type);
};

function fileExtensions(extensions: string[]) {
	return (file: File) => {
		if (!file || !(file instanceof File))
			return true;

		const fileExtension = file.name.split('.').pop() || '';
		return extensions.includes(fileExtension);
	};
};

function fileExtensionsValidator(extensions: string[]) {
	return (files: FileList) => Array.from(files).every(fileExtensions(extensions,
	));
};

export {
	fileSize,
	isFileImage,
	filesSizeValidator,
	fileExtensions,
	fileExtensionsValidator,
};
