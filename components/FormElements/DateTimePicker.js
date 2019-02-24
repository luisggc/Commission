import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { TextApp } from '../Layout'
import { datetimeToString } from 'src/utils'
import DateTimePicker from 'react-native-modal-datetime-picker'

export default function DateTimePickerApp() {
	return (
		<View key={key} style={styles.inputContainer}>
			<View>
				<TextApp>{name}:</TextApp>
			</View>
			<TouchableOpacity onPress={() => this.toggleVisible(key)}>
				<TextApp>{datetimeToString(value, placeholder)}</TextApp>
			</TouchableOpacity>
			<DateTimePicker
				isVisible={visible}
				onChangeText={v => this.formChange(key, v)}
				onConfirm={date => {
					this.formChange(key, date)
					this.toggleVisible(key)
				}}
				onCancel={() => this.toggleVisible(key)}
				minuteInterval={10}
				mode={'datetime'}
				locale={'pt-BR'}
				cancelTextIOS={'Cancelar'}
				confirmTextIOS={'Confirmar'}
				titleIOS={'Seleione uma data e hora'}
			/>
		</View>
	)
}
