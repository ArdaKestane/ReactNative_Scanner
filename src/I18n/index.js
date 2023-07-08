import I18n, {getLanguages} from 'react-native-i18n';
import {NativeModules} from 'react-native';

import en from './en';
import tr from './tr';

I18n.fallbacks = true;

I18n.translations = {
  en,
  tr,
};

const deviceLanguage = NativeModules.I18nManager.localeIdentifier.split('_')[0];

I18n.defaultLocale = deviceLanguage;

getLanguages()
  .then(languages => {
    console.log('getLanguages', languages);
  })
  .catch(error => {
    console.log('getLanguages error:', error);
  });

export default I18n;
