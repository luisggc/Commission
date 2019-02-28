import React from 'react'
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native'
import { DrawerItems, SafeAreaView } from 'react-navigation'
import { ThumbImage, TextApp } from './Layout'
import color from '../utils/colors'
import { EvilIcons } from '@expo/vector-icons'

export default (CustomDrawerContentComponent = props => {
	console.log("---------------")
	console.log(Object.keys(props))
	return (
		<ScrollView>
			<TouchableOpacity onPress={() => props.navigation.closeDrawer()} style={styles.close}>
				<EvilIcons style={{ color: color.primary.contrastLightText }} size={40} name="close" />
			</TouchableOpacity>
			<View style={styles.thumbImageContainer}>
				<ThumbImage image={require('../assets/images/user.jpg')} />
				<View style={styles.statusContainer}>
					<TextApp>Luis Coimbra</TextApp>
					<TextApp secondary>Apaixonado por Jesus</TextApp>
				</View>
			</View>

			<SafeAreaView style={{ flex: 1 }} forceInset={{ top: 'always', horizontal: 'never' }}>
				<DrawerItems {...props} {...itemsStyle} />
			</SafeAreaView>
		</ScrollView>
	)
})

const styles = StyleSheet.create({
	thumbImageContainer: {
		marginTop: 50,
		marginBottom: 20
	},
	close: {
		position: 'absolute',
		left: 0,
		top: 10,
		padding: 20
	},
	statusContainer: {
		marginTop: 10,
		alignItems: 'center'
	}
})
const itemsStyle = {
	itemsContainerStyle: {
		borderTopWidth: 2,
		borderTopColor: color.primary.contrastText,
		shadowOffset: { width: 0, height: 2 },
		elevation: 2,
		shadowColor: 'black',
		shadowOpacity: 0.3
	},
	activeTintColor: color.secondary.main,
	activeBackgroundColor: color.primary.main,
	inactiveTintColor: color.primary.contrastText
}
