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
import SectionedMultiSelect from 'react-native-sectioned-multi-select'
import ModalSelector from 'react-native-modal-selector'
import color from '../utils/colors'

const colorschange = color

export const TextApp = props => {
	const color = props.secondary
		? colorschange.secondary.main
		: props.primary
			? colorschange.primary.main
			: props.primaryLight
				? colorschange.primary.contrastLightText
				: colorschange.primary.contrastText //color.text.primary

	const stylesShow = [
		styles.text,
		{ color: color },
		props.secondary
			? {
					textShadowColor: colorschange.primary.main,
					textShadowOffset: { width: 0.1, heigh: 0.1 },
					textShadowRadius: 1
			  }
			: {},
		props.style
	]
	return <Text {...props} style={stylesShow} />
}

export const ThumbImage = props => {
	const { image, style } = props

	const custom_size = props.small ? 75 : 150
	const custom = { height: custom_size, width: custom_size }

	return (
		<Image style={[styles.IconImage, {borderRadius: custom_size/2}, custom, style ]} source={image} />
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

export const ButtonApp = props => (
	<TouchableOpacity {...props} style={[styles.buttonApp, props.style]}>
		<TextApp>{props.children}</TextApp>
	</TouchableOpacity>
)

export const Separator = props => <View style={[styles.sep, props.style]} />

export const MultipleSelectApp = props => (
	<SectionedMultiSelect
		styles={{
			selectToggle: {
				// borderRadius: 5,
				// padding: 5,
				// marginBottom: 5,
				// color: colorschange.text.primary
			}
		}}
		colors={{
			primary: colorschange.primary.main,
			selectToggleTextColor: colorschange.primary.contrastText
		}}
		searchPlaceholderText={'Procure...'}
		removeAllText={'Remova todos'}
		selectText={'Selecione aqui'}
		confirmText={'Confirme'}
		selectedText={'selecionado(s)'}
		subKey="children"
		uniqueKey="id"
		showDropDowns={true}
		readOnlyHeadings={true}
		showDropDowns={false}
		selectChildren={true}
		searchSelectionColor={colorschange.primary.contrastText}
		searchPlaceholderText={'Pesquise aqui'}
		noResultsComponent={
			<TouchableOpacity onPress={() => props.onAddPress}>
				<TextApp secondary>
					Sem resultados para esse nome
					{/* Clique aqui para adicionar. */}
				</TextApp>
			</TouchableOpacity>
		}
		items={[
			{
				name: 'Selecione os itens ou adicione',
				id: -1,
				children: props.options
			}
		]}
		{...props}
	/>
)

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
