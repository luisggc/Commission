import React from 'react'
import {
	Text,
	TextInput,
	StyleSheet,
	Image,
	View,
	TouchableOpacity,
	Picker,
	Platform,
	ActivityIndicator
} from 'react-native'
import ModalSelector from 'react-native-modal-selector'
import color, { colorNew } from '../utils/colors'
import styled from 'styled-components'

const colorschange = color

export const TextApp = styled.Text`
	color: ${p =>
		p.primary
			? p.theme.color.primary(0)
			: p.secondary
			? p.theme.color.secondary(0)
			: p.dark
			? p.lowContrast
				? p.theme.color.dark.lowContrast
				: p.highContrast
				? p.theme.color.dark.highContrast
				: p.disabled
				? p.theme.color.dark.disabled
				: p.theme.color.dark.contrast
			: p.lowContrast
			? p.theme.color.light.lowContrast
			: p.highContrast
			? p.theme.color.light.highContrast
			: p.disabled
			? p.theme.color.light.disabled
			: p.theme.color.light.contrast};
`
// ${p => p.primary ? p.theme.color.primary(0):
// 	p.secondary ? p.theme.color.secondary(0):
// 	p.dark ? (
// 		p.lowContrast ? p.theme.color.dark.lowContrast :
// 		p.highContrast ? p.theme.color.dark.highContrast :
// 		p.disabled ? p.theme.color.dark.disabled :
// 		p.theme.color.dark.contrast
// 	):
// 	p.lowContrast ? p.theme.color.light.lowContrast :
// 	p.highContrast ? p.theme.color.light.highContrast :
// 	p.disabled ? p.theme.color.light.disabled :
// 	p.theme.color.light.contrast

export const ThumbImage = props => {
	const { image, style } = props

	const custom_size = props.small ? 75 : 150
	const custom = { height: custom_size, width: custom_size }

	return (
		<Image
			style={[styles.IconImage, { borderRadius: custom_size / 2 }, custom, style]}
			source={image}
		/>
	)
}

export const Li = ({ style, items = [] }) => {
	return items.map((item, index) => {
		const stylec = index == 0 ? style : {}
		return (
			<View key={index} style={[styles.liContainer, stylec]}>
				<View style={styles.liIcon} />
				<TextApp>{item}</TextApp>
			</View>
		)
	})
}

export const ButtonAppOnly = styled.TouchableOpacity`
	min-width: 90;
	align-items: center;
	padding: 10px;
	border-radius: 2;
	background-color: ${p => (p.primary ? p.theme.color.primary() : p.theme.color.secondary(0))};
`

export const ButtonApp = props => {
	const { text, children, ...buttonProps } = props
	const textProps = text ? text : { dark: true }
	return (
		<ButtonAppOnly {...buttonProps}>
			<TextApp {...textProps}>{children}</TextApp>
		</ButtonAppOnly>
	)
}

// export const ButtonApp = props => (
// 	<TouchableOpacity {...props} style={[styles.buttonApp, props.style]}>
// 		<TextApp>{props.children}</TextApp>
// 	</TouchableOpacity>
// )

export const Separator = props => <View style={[styles.sep, props.style]} />



export const UniqueSelectApp = props => {
	const { options, value, placeholder, key_i, onChange } = props
	return Platform.OS === 'ios' ? (
		<ModalSelector
			data={options}
			initValue={placeholder}
			onChange={values => onChange(key_i, values.key)}
		>
			<TextInput
				style={styles.textInput}
				editable={false}
				value={value == undefined ? placeholder : value}
			/>
		</ModalSelector>
	) : (
		<Picker
			style={styles.picker}
			itemStyle={{ height: 88 }}
			selectedValue={value}
			onValueChange={values => onChange}
		>
			{options.map(option => (
				<Picker.Item
					// style={{ padding: 0, margin: 0 }}
					key={option}
					label={option}
					value={option}
				/>
			))}
		</Picker>
	)
}

export const Loading = () => (
	<View style={styles.center}>
		<ActivityIndicator size="large" />
	</View>
)
const styles = StyleSheet.create({
	text: {
		// fontSize: 13,
		color: colorschange.primary.contrastText
	},
	IconImage: {
		borderColor: colorschange.primary.main,
		borderWidth: 6,
		alignItems: 'center',
		alignSelf: 'center',
		justifyContent: 'center',
		marginRight: 10
	},
	iconImageContainer: {
		shadowOffset: { width: 1, height: 1 },
		shadowColor: 'black',
		shadowOpacity: 0.5,
		elevation: 5,
		zIndex: 20
	},
	liIcon: {
		backgroundColor: colorschange.secondary.main,
		height: 6,
		width: 6,
		marginRight: 8,
		alignSelf: 'center'
	},
	liContainer: {
		flexDirection: 'row',
		alignSelf: 'flex-start'
		// alignItems: 'center',
		// justifyContent: 'center'
	},
	buttonApp: {
		minWidth: 90,
		alignItems: 'center',
		padding: 6,
		borderRadius: 2,
		backgroundColor: colorschange.secondary.main
	},
	sep: {
		height: 1,
		backgroundColor: colorschange.secondary.main,
		marginHorizontal: 30
	},
	bigTextInput: {
		padding: 5,
		marginVertical: 5,
		height: 90,
		backgroundColor: colorschange.primary.contrastText,
		borderRadius: 5
	},
	textInput: {
		marginTop: 5,
		// height: 20,
		backgroundColor: colorschange.primary.contrastText,
		borderRadius: 5,
		padding: 5
	},
	picker: {
		backgroundColor: colorschange.primary.contrastText,
		borderRadius: 5,
		padding: 0
	},
	center: {
		flex: 1,
		alignContent: 'center',
		alignItems: 'center',
		justifyContent: 'center'
	}
})
