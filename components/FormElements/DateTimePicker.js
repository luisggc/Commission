import React from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { TextApp } from '../Layout'
import { datetimeToString } from 'src/utils'
import DateTimePicker from 'react-native-modal-datetime-picker'
import { color } from 'src/utils/theme'

export default class DateTimePickerApp extends React.Component {
	state = { visible: false }

	toggleVisible = () => {
		const { visible } = this.state
		this.setState({ visible: !visible })
	}

	render() {
		const { name, placeholder, value, setFieldValue, field } = this.props
		const { visible } = this.state
		return (
			<View style={styles.inputContainer}>
				<View>
					<TextApp>{name}:</TextApp>
				</View>
				<TouchableOpacity onPress={() => this.toggleVisible()}>
					<TextApp>{datetimeToString(value, placeholder)}</TextApp>
				</TouchableOpacity>
				<DateTimePicker
					isVisible={visible}
					onChangeText={v => this.formChange(key, v)}
					onConfirm={date => {
						setFieldValue(field, date)
						this.toggleVisible()
					}}
					onCancel={() => this.toggleVisible()}
					minuteInterval={10}
					mode={'datetime'}
					locale={'pt-BR'}
					cancelTextIOS={'Cancelar'}
					confirmTextIOS={'Confirmar'}
					titleIOS={'Selecione uma data e hora'}
				/>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	inputContainer: {
		marginTop: 20,
		marginBottom: 10,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between'
	}
})
