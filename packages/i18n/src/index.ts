import { appConfig } from '@kgcentral/config';
import i18next from 'i18next';

export const defaultNS = 'common';
export const locales = appConfig.supportedLocales;

export async function initI18n() {
	const i18n = await i18next.createInstance();

	await i18n.init({
		resources: {
			vi: {
				common: {
					appName: 'KGCentral',
					loading: 'Đang tải...',
					error: 'Đã xảy ra lỗi',
					retry: 'Thử lại',
					save: 'Lưu',
					cancel: 'Hủy',
					confirm: 'Xác nhận',
					delete: 'Xóa',
					edit: 'Sửa',
					create: 'Tạo',
					search: 'Tìm kiếm',
					noData: 'Không có dữ liệu',
					success: 'Thành công',
					failed: 'Thất bại',
				},
				nav: {
					home: 'Trang chủ',
					dashboard: 'Bảng điều khiển',
					settings: 'Cài đặt',
					profile: 'Hồ sơ',
					logout: 'Đăng xuất',
				},
				auth: {
					login: 'Đăng nhập',
					register: 'Đăng ký',
					logout: 'Đăng xuất',
					email: 'Email',
					password: 'Mật khẩu',
					forgotPassword: 'Quên mật khẩu?',
					noAccount: 'Chưa có tài khoản?',
					hasAccount: 'Đã có tài khoản?',
				},
			},
			en: {
				common: {
					appName: 'KGCentral',
					loading: 'Loading...',
					error: 'An error occurred',
					retry: 'Retry',
					save: 'Save',
					cancel: 'Cancel',
					confirm: 'Confirm',
					delete: 'Delete',
					edit: 'Edit',
					create: 'Create',
					search: 'Search',
					noData: 'No data',
					success: 'Success',
					failed: 'Failed',
				},
				nav: {
					home: 'Home',
					dashboard: 'Dashboard',
					settings: 'Settings',
					profile: 'Profile',
					logout: 'Logout',
				},
				auth: {
					login: 'Login',
					register: 'Register',
					logout: 'Logout',
					email: 'Email',
					password: 'Password',
					forgotPassword: 'Forgot password?',
					noAccount: "Don't have an account?",
					hasAccount: 'Already have an account?',
				},
			},
		},
		lng: appConfig.defaultLocale,
		fallbackLng: appConfig.defaultLocale,
		ns: [defaultNS],
		defaultNS,
		supportedLngs: locales,
		interpolation: {
			escapeValue: false,
		},
	});

	return i18n;
}

export default i18next;
