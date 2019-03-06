import React from 'react'
import { TextInput, StyleSheet } from 'react-native'
import color from '../../utils/theme'
import InputFormat from './InputFormat'

export default function InputText(props) {
	const { name, value, placeholder } = props
	return (
		<InputFormat name={name}>
			<TextInput
				multiline={!!value}
				style={styles.textInput}
				// value={this.state.searchText}
				placeholder={'Ex: ' + placeholder}
				placeholderTextColor={color.light.placeholder}
				underlineColorAndroid={'transparent'}
				keyboardAppearance={'dark'}
				{...props}
			/>
		</InputFormat>
	)
}

const styles = StyleSheet.create({
	textInput: {
		color: color.light.contrast,
		fontSize: 15
	}
})
