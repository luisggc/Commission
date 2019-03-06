import React from 'react'
import InputFormat from './InputFormat'
import color from 'src/utils/theme'
import { StyleSheet, TextInput, Picker, Platform } from 'react-native'
import ModalSelector from 'react-native-modal-selector'

export default function Selection(props) {
	const { onChange, name, placeholder, value } = props
	const options = optionsFormatter(props.options)
	return (
		<InputFormat name={name}>
			{Platform.OS === 'ios' ? (
				<ModalSelector data={options} initValue={placeholder} onChange={onChange}>
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
						color: color.light.contrast,
						height: 23
					}}
					selectedValue={value}
					onValueChange={onChange}
				>
					{options.map(option => (
						<Picker.Item key={option.key} label={option.label} value={option.key} />
					))}
				</Picker>
			)}
		</InputFormat>
	)
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
		color: color.light.contrast,
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
		borderColor: color.light.contrast,
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
