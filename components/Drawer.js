import React from 'react'
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native'
import { DrawerItems, SafeAreaView } from 'react-navigation'
import { ThumbImage, TextApp } from './Layout'
import color from '../utils/colors'
import { EvilIcons } from '@expo/vector-icons'

export default (CustomDrawerContentComponent = props => {
	const activeRouterName = props.navigation.state.routes[0].routes.slice(-1)[0].routeName
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
			<SafeAreaView
				style={{ flex: 1, borderTopWidth: 2, borderTopColor: color.primary.contrastText }}
				forceInset={{ top: 'always', horizontal: 'never' }}
			>
				{['Início', 'Perfil', 'Notificações', 'Criar Evento'].map(routerName => (
					<View key={routerName} style={routerName == activeRouterName && styles.activeView}>
						<TextApp
							onPress={() => props.navigation.navigate(routerName)}
							style={{
								color:
									routerName == activeRouterName
										? color.secondary.main
										: color.primary.contrastText,
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
		// borderTopColor: color.primary.contrastText,
		borderTopColor: 'transparent',
		shadowOffset: { width: 0, height: 2 },
		shadowColor: 'black',
		shadowOpacity: 0.3,
		elevation: 1
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
