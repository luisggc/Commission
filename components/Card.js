import React from 'react'
import color from '../utils/colors'
import { ScrollView, View, StyleSheet, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { TextApp, Separator } from './Layout'
import { withNavigation } from 'react-navigation'

const Card = props => {
	const pad = props.padding ? { paddingHorizontal: 23, paddingTop: 15 } : {}
	return (
		<ScrollView contentContainerStyle={[props.style, styles.container, pad]}>
			<TouchableOpacity onPress={() => props.navigation.goBack(null)} style={styles.backButton}>
				<Ionicons style={{ color: color.primary.contrastText }} size={40} name="ios-arrow-back" />
			</TouchableOpacity>

			{props.headerTitle ? (
				<View>
					<View style={styles.headerTitle}>
						<TextApp style={{ fontSize: 25 }}>{props.headerTitle}</TextApp>
					</View>
					<Separator style={{ marginBottom: 10 }} />
				</View>
			) : null}

			<View>{props.children}</View>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	container: {
		paddingTop: 5,
		paddingBottom: 10,
		marginHorizontal: 8,
		backgroundColor: color.primary['400'],
		flexGrow: 1
	},
	backButton: {
		position: 'absolute',
		left: 0,
		top: 0,
		paddingVertical: 10,
		paddingHorizontal: 20,
		zIndex: 10
	},
	headerTitle: {
		marginBottom: 20,
		marginTop: 10,
		alignSelf: 'center'
	}
})

export default withNavigation(Card)
