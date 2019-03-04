import React from 'react'
import { StyleSheet, View } from 'react-native'
import { newColor } from 'src/utils/colors'
import { FontAwesome, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons'
import InputFormat from 'src/components/FormElements/InputFormat'

const styles = StyleSheet.create({
	containerStyle: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	containerIcon: {
		height: 90,
		width: 90,
		borderRadius: 45,
		borderColor: newColor.light.highContrast,
		borderWidth: 6,
		alignItems: 'center',
		alignSelf: 'center',
		justifyContent: 'center',
		marginRight: 10,
		shadowOffset: { width: 1, height: 1 },
		shadowColor: 'black',
		shadowOpacity: 0.8
	},
	iconContainerStyle: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between'
	}
})

class ChooseIcon extends React.Component {
	constructor(props) {
		super(props)
		let id = 0
		this.props.icons = props.icons.map(item => {
			item.id = id++
			item.IconComponent = props.origins[item.origin]
			return item
		})
	}

	static contextTypes = {
		// router: PropTypes.object.isRequired
		// some context types
	}

	static propTypes = {
		// prop1: PropTypes.object
		// userInfo: PropTypes.object,
		// cityList: PropTypes.array.isRequired,
		// provinceList: PropTypes.array.isRequired,
	}

	static defaultProps = {
		origins: {
			MaterialCommunityIcons: MaterialCommunityIcons,
			FontAwesome: FontAwesome,
			FontAwesome5: FontAwesome5
		},
		icons: [
			{
				name: 'bible',
				origin: 'MaterialCommunityIcons',
				label: 'Bíblia'
			},
			{
				name: 'bus-school',
				origin: 'MaterialCommunityIcons',
				label: 'Escola'
			},
			{
				name: 'university',
				origin: 'FontAwesome',
				label: 'Universidade'
			},
			{
				name: 'university',
				origin: 'FontAwesome',
				label: 'Universidade'
			},
			{
				name: 'university',
				origin: 'FontAwesome',
				label: 'Universidade'
			}
		],
		showLabel: true,
		iconProps: {
			// style: styles.containerIcon,
			size: 50,
			color: newColor.light.contrast
		},
		containerIcon: styles.containerIcon,
		containerStyle: styles.containerStyle,
		iconContainerStyle: styles.iconContainerStyle
	}

	state = {
		selectedId: 0
	}

	onSelectIcon = id => {
		this.setState({ selectedId: id })
	}

	render() {
		const { containerStyle, iconProps, containerIcon, iconContainerStyle, name } = this.props
		let icons = this.props.icons
		const { selectedId } = this.state
		icons =
			selectedId == 0
				? icons.slice(0, 3)
				: selectedId == icons.length - 1
				? icons.slice(selectedId - 2, selectedId + 1)
				: icons.slice(selectedId - 1, selectedId + 2)
		return (
			<InputFormat name={name}>
				<View style={{ flex: 1 }}>
					<View
						style={{
							position: 'absolute',
							top: 0,
							left: 0,
							right: 0,
							bottom: 0,
							justifyContent: 'center',
							alignItems: 'center'
						}}
					>
						<View style={containerIcon} />
					</View>
					<View style={containerStyle}>
						{icons.map(icon => {
							const { IconComponent, name, id } = icon
							return (
								<IconComponent
									onPress={() => this.onSelectIcon(id)}
									key={id}
									{...iconProps}
									name={name}
								/>
							)
						})}
					</View>
					{/* <IconComponent {...iconProps} name={name} /> */}
				</View>
			</InputFormat>
		)
	}
}

function creatId(array) {
	let id = 0
	return array.map(item => {
		item.id = id++
		item.origin = origins[item.origin]
		return item
	})
}

export default ChooseIcon
