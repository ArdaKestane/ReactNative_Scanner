import I18n, {getLanguages} from 'react-native-i18n';
import {NativeModules} from 'react-native';

import en from './en';
import tr from './tr';

I18n.fallbacks = true;

I18n.translations = {
  en,
  tr,
};

let deviceLanguage = 'en'; // Default language

if (NativeModules.I18nManager && NativeModules.I18nManager.localeIdentifier) {
  deviceLanguage = NativeModules.I18nManager.localeIdentifier.split('_')[0];
} else if (NativeModules.I18nManager && NativeModules.I18nManager.locale) {
  deviceLanguage = NativeModules.I18nManager.locale.split('-')[0];
}

I18n.defaultLocale = deviceLanguage;

getLanguages()
  .then(languages => {
    console.log('getLanguages', languages);
  })
  .catch(error => {
    console.log('getLanguages error:', error);
  });

export default I18n;
