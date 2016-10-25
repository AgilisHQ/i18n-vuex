/* vuex-i18n-store defines a vuex module to store locale translations. Make sure
** to also include the file vuex-i18n.js to enable easy access to localized
** strings in your vue components.
*/

// define a simple vuex module to handle locale translations
const i18nVuexModule =  {
	state: {
		locale: null,
		translations: {}
	},
	mutations: {

		// set the current locale
		SET_LOCALE(state, payload) {
			state.locale = payload.locale;
		},

		// add a new locale
		ADD_LOCALE(state, payload) {
			// reduce the given translations to a single-depth tree
			var translations = flattenTranslations(payload.translations);
			state.translations[payload.locale] = translations;
		},

		// add a new locale
		REMOVE_LOCALE(state, payload) {

			// check if the given locale is present in the state
			if (state.translations.hasOwnProperty(payload.locale)) {

				// check if the current locale is the given locale to remvoe
				if (state.locale === payload.locale) {
					// reset the current locale
					state.locale = null;
				}

				// create a copy of the translations object
				let translationCopy = Object.assign({}, state.translations);

				// remove the given locale
				delete translationCopy[payload.locale];

				// set the state to the new object
				state.translations = copy;

			}
		}

	},
	actions: {

		// set the current locale
		setLocale(context, payload) {
			context.commit({
				type: 'SET_LOCALE',
				locale: payload.locale
			});
		},

		// add a new locale with translations
		addLocale(context, payload) {
			context.commit({
				type: 'ADD_LOCALE',
				locale: payload.locale,
				translations: payload.translations
			});
		},

		// remove the given locale translations
		removeLocale(context, payload) {
			context.commit({
				type: 'REMOVE_LOCALE',
				locale: payload.locale,
				translations: payload.translations
			});
		}

	}
};

// flattenTranslations will convert object trees for translations into a
// single-depth object tree
const flattenTranslations = function flattenTranslations(translations) {

	var toReturn = {};

	for (var i in translations) {

		// check if the property is present
		if (!translations.hasOwnProperty(i)) {
			continue;
		}

		// get the type of the property
		var objType = typeof translations[i];

		if (objType == 'object' && objType !== null) {

			var flatObject = flattenTranslations(translations[i]);

			for (var x in flatObject) {
				if (!flatObject.hasOwnProperty(x)) continue;

				toReturn[i + '.' + x] = flatObject[x];
			}

		} else {
			toReturn[i] = translations[i];

		}
	}
	return toReturn;
};

export default i18nVuexModule;
