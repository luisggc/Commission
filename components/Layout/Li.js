import React from 'react'
import { View, StyleSheet } from 'react-native'
import { TextApp } from '.'
import { newColor } from 'src/utils/colors'

export default Li = ({ style, items = [] }) => {
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

const styles = StyleSheet.create({
	liIcon: {
		backgroundColor: newColor.primary(),
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
	}
})
