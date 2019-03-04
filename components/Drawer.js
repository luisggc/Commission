import React from 'react'
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-navigation'
import { ThumbImage, TextApp } from './Layout'
import { newColor } from '../utils/colors'
import { EvilIcons } from '@expo/vector-icons'

export default (CustomDrawerContentComponent = props => {
	const activeRouterName = props.navigation.state.routes[0].routes.slice(-1)[0].routeName
	return (
		<ScrollView>
			<TouchableOpacity onPress={() => props.navigation.closeDrawer()} style={styles.close}>
				<EvilIcons style={{ color: newColor.light.contrast }} size={40} name="close" />
			</TouchableOpacity>
			<View style={styles.thumbImageContainer}>
				<ThumbImage source={require('../assets/images/user.jpg')} />
				<View style={styles.statusContainer}>
					<TextApp dark>Luis Coimbra</TextApp>
					<TextApp secondary>Apaixonado por Jesus</TextApp>
				</View>
			</View>
			<SafeAreaView
				style={{ flex: 1, borderTopWidth: 2, borderTopColor: newColor.dark.contrast }}
				forceInset={{ top: 'always', horizontal: 'never' }}
			>
				{['Início', 'Perfil', 'Notificações', 'Criar Evento'].map(routerName => (
					<View key={routerName} style={routerName == activeRouterName && styles.activeView}>
						<TextApp
							onPress={() => props.navigation.navigate(routerName)}
							style={{
								color:
									routerName == activeRouterName
										? newColor.secondary()
										: newColor.dark.contrast,
								margin: 16,
								fontWeight: 'bold'
							}}
						>
							{routerName}
						</TextApp>
					</View>
				))}
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
	},
	activeView: {
		borderTopWidth: 2,
		borderTopColor: 'transparent',
		shadowOffset: { width: 0, height: 2 },
		shadowColor: 'black',
		shadowOpacity: 0.3,
		elevation: 1
	}
})

export const drawerNavigatorConfig = () => ({
	drawerBackgroundColor: newColor.primary(-1),
	contentComponent: CustomDrawerContentComponent
})
