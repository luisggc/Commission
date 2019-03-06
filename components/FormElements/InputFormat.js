import React from 'react'
import { View, StyleSheet } from 'react-native'
import { TextApp } from '../Layout'
import color from 'src/utils/theme'

export default props => (
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

const styles = StyleSheet.create({
	columnContainer: {
		marginTop: 10,
		flex: 1
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
		borderRadius: 2,
		borderColor: color.light.contrast,
		borderWidth: 0.5,
		shadowOffset: { width: 1, height: 1 },
		shadowColor: 'black',
		shadowOpacity: 0.5
	}
})
