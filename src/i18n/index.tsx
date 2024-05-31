import { isJSON } from '@/common/utils/json';
import i18n from 'i18next';
import ChainedBackend from 'i18next-chained-backend';
import HttpBackend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const defaultNS = 'common';

i18n
	.use(initReactI18next)
	.use(LanguageDetector)
	.use(ChainedBackend)
	.init({
		backend: {
			backends: [HttpBackend],
			backendOptions: [
				{
					loadPath: '/locales/{{lng}}/{{ns}}.json',
					addPath: '/locales/add/{{lng}}/{{ns}}.json'
				}
			]
		},
		defaultNS: defaultNS,
		preload: ['en', 'vi'],
		ns: ['common'],
		lng: (() => {
			const currentLang = localStorage.getItem('lang');
			return isJSON(currentLang) && !!currentLang
				? JSON.parse(currentLang)
				: 'en';
		})(),
		fallbackLng: 'en',
		fallbackNS: ['common', 'home'],
		saveMissing: true,
		appendNamespaceToMissingKey: true,
		debug: false,
		interpolation: {
			escapeValue: false
		},
		react: {
			useSuspense: false
		}
	});

export { i18n };
