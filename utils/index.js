// import DeviceInfo from 'react-native-device-info'
// import { Platform, NativeModules } from 'react-native'

// function getLanguageCode() {
// 	let systemLanguage = 'pt-BR'
// 	const RNDeviceInfo = NativeModules.RNDeviceInfo
// 	console.log(RNDeviceInfo)
// 	if (Platform.OS === 'android') {
// 		systemLanguage = NativeModules.I18nManager.localeIdentifier
// 	} else {
// 		// systemLanguage = NativeModules.SettingsManager.settings.AppleLocale;
// 	}
// 	return systemLanguage
// }

export function datetimeToString(value, placeholder) {
	return value
		? value.toLocaleDateString('pt-BR', {
				timeZone: 'America/Sao_Paulo'
		  }) +
				' ' +
				value.toLocaleTimeString('pt-BR', {
					timeZone: 'America/Sao_Paulo'
				})
		: placeholder
	// value
	//   ? value.toLocaleDateString(getLanguageCode(), {
	//       timeZone: DeviceInfo.getTimezone()
	//     }) +
	//       value.toLocaleTimeString(etLanguageCode(), {
	//         timeZone: DeviceInfo.getTimezone()
	//       })
	//   : placeholder;
}
