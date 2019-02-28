import React from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { TextApp } from '../Layout'
import { datetimeToString } from 'src/utils'
import DateTimePicker from 'react-native-modal-datetime-picker'
import color from 'src/utils/colors'

export default class DateTimePickerApp extends React.Component {

	state = { visible: false}

	toggleVisible = () => {
		const { visible } = this.state
		this.setState({visible: !visible})
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
					titleIOS={'Seleione uma data e hora'}
				/>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	thumbImageContainer: {
		marginTop: 50,
		marginBottom: 20
	},
	inputCompostContainer: {
		marginTop: 10
	},
	inputContainer: {
		marginTop: 20,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	columnContainer: {
		marginTop: 10,
		flex: 1
	},
	center: {
		alignItems: 'center'
	},
	textInput: {
		color: color.primary.contrastText,
		fontSize: 15
	},
	textInputContainer: {
		height: 'auto',
		flexDirection: 'row',
		marginHorizontal: 5,
		marginVertical: 5,
		paddingHorizontal: 5,
		paddingVertical: 8,
		alignContent: 'space-between',
		alignItems: 'center',
		alignSelf: 'center',
		// backgroundColor: white_transp,
		borderRadius: 2,
		borderColor: color.primary.main,
		borderWidth: 0.5,
		shadowOffset: { width: 1, height: 1 },
		shadowColor: 'black',
		shadowOpacity: 0.5
	},
	button: {
		marginTop: 10,
		paddingVertical: 15,
		paddingHorizontal: 10
	}
})
