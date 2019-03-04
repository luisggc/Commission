import React from 'react'
import { newColor } from 'src/utils/colors'
import { StyleSheet, Image } from 'react-native'

export default ThumbImage = props => {
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

const styles = StyleSheet.create({
	IconImage: {
		borderColor: newColor.light.contrast,
		borderWidth: 6,
		alignItems: 'center',
		alignSelf: 'center',
		justifyContent: 'center',
		marginRight: 10
	}
})
