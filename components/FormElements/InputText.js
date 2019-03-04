import React from 'react'
import { TextInput, StyleSheet } from 'react-native'
import { newColor } from '../../utils/colors'
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
				placeholderTextColor={newColor.light.placeholder}
				underlineColorAndroid={'transparent'}
				keyboardAppearance={'dark'}
				{...props}
			/>
		</InputFormat>
	)
}

const styles = StyleSheet.create({
	textInput: {
		color: newColor.light.contrast,
		fontSize: 15
	}
})
