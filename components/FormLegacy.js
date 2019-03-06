import React from 'react'
import {
	View,
	StyleSheet,
	TextInput,
	KeyboardAvoidingView,
	TouchableOpacity,
	Picker,
	Platform
} from 'react-native'
import { TextApp, ButtonApp, MultipleSelectApp } from './Layout'
import { datetimeToString } from '../utils'
import color from '../utils/theme'
import DateTimePicker from 'react-native-modal-datetime-picker'
import ModalSelector from 'react-native-modal-selector'
import ChooseIcon from './ChooseIcon'
import { FontAwesome, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons'

export default class Form extends React.Component {
	state = { form: this.props.form }

	formChange = (inputName, value) => {
		this.setState(state => ({
			form: {
				...state.form,
				[inputName]: {
					...state.form[inputName],
					value
				}
			}
		}))
	}

	addOptions = (inputName, newOptions, other = false) => {
		this.setState(state => {
			const options = state.form[inputName].options
			if (other) {
				options.map(o => (o.id == 'other' ? { ...o, name: newOptions } : o))
			} else {
				options.push({ name: newOptions, id: newOptions })
			}
			return {
				form: {
					...state.form,
					[inputName]: {
						...state.form[inputName],
						options
					}
				}
			}
		})
	}

	toggleVisible = inputName => {
		this.setState(state => ({
			form: {
				...state.form,
				[inputName]: {
					...state.form[inputName],
					visible:
						state.form[inputName].visible == undefined ? true : !state.form[inputName].visible
				}
			}
		}))
	}

	submit = () => {
		this.props.onChange(this.state)
		// this.addOptions('assistance', 'olaaaa')
	}

	render() {
		return this.state.form == undefined ? null : (
			<KeyboardAvoidingView behavior="padding" enabled>
				{/* <ThumbImage image={require('../assets/images/user.jpg')} /> */}
				{Object.keys(this.state.form).map(key => {
					const { name, placeholder, value, type, visible } = this.state.form[key]
					const options = optionsFormatter(this.state.form[key].options)
					switch (type) {
						case 'inputText':
							return (
								<InputFormat key={key} name={name}>
									<TextInput
										multiline={!!value}
										style={styles.textInput}
										onChangeText={v => this.formChange(key, v)}
										// value={this.state.searchText}
										placeholder={'Ex: ' + placeholder}
										placeholderTextColor={color.primary.contrastLightText}
										underlineColorAndroid={'transparent'}
										keyboardAppearance={'dark'}
									/>
								</InputFormat>
							)
						case 'multiselection':
							return (
								<InputFormat key={key} name={name}>
									<MultipleSelectApp
										options={options}
										selectedItems={value}
										onSelectedItemsChange={values => this.formChange(key, values)}
										onAddPress={() => this.addOptions(key, 'oi')}
									/>
								</InputFormat>
							)
						case 'selection':
							return (
								<InputFormat key={key} name={name}>
									{Platform.OS === 'ios' ? (
										<ModalSelector
											data={options}
											initValue={placeholder}
											onChange={values => this.formChange(key, values.key)}
										>
											<TextInput
												style={styles.textInput}
												editable={false}
												placeholder={placeholder}
												value={value}
											/>
										</ModalSelector>
									) : (
										<Picker
											style={{
												color: color.primary.contrastText,
												height: 23
											}}
											selectedValue={value}
											onValueChange={values => this.formChange(key, values)}
										>
											{options.map(option => (
												<Picker.Item
													key={option.key}
													label={option.label}
													value={option.key}
												/>
											))}
										</Picker>
									)}
								</InputFormat>
							)

						case 'datetime':
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
						case 'selectIcon':
							return (
								<InputFormat key={key} name={name}>
									<ChooseIcon onChange={v => this.formChange(key, v)} />
								</InputFormat>
							)
					}
				})}
				<View style={styles.center}>
					<ButtonApp onPress={() => this.submit()} style={styles.button}>
						{this.props.submitText || 'Enviar !'}
					</ButtonApp>
				</View>
			</KeyboardAvoidingView>
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
		marginTop: 10,
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

const InputFormat = props => (
	<View style={styles.columnContainer}>
		{props.name ? (
			<View>
				<TextApp>{props.name}:</TextApp>
			</View>
		) : null}
		<View style={styles.textInputContainer}>
			<View style={{ flexGrow: 1 }}>{props.children}</View>
		</View>
	</View>
)
function addOrRemove(arrayo, value) {
	const array = arrayo
	var index = array.indexOf(value)
	if (index === -1) {
		array.push(value)
	} else {
		array.splice(index, 1)
	}
	return array
}

function optionsFormatter(array) {
	return Array.isArray(array)
		? array.reduce((accumulator, name) => {
				accumulator.push({
					id: name,
					name,
					key: name,
					label: name
				})
				return accumulator
		  }, [])
		: []
}
