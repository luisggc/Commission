import React from 'react'
import { StatusBar, StyleSheet, View } from 'react-native'
import { createDrawerNavigator, createStackNavigator, createAppContainer } from 'react-navigation'
import { ThemeProvider } from 'styled-components'
import { ApolloProvider } from 'react-apollo'
import ApolloClient from 'apollo-boost'

import HomeScreen from './Screens/HomeScreen'
import NotificationScreen from './Screens/NotificationScreen'
import ProfileScreen from './Screens/ProfileScreen'
import CreateEventScreen from './Screens/CreateEventScreen'
import EventScreen from './Screens/EventScreen'

import theme, { color } from './utils/theme'
import { drawerNavigatorConfig } from './components/Drawer'
import { StackNavigatorConfig } from './components/Header'
import { AppProvider } from './components/AppContext'

const client = new ApolloClient({
	//Doesn't work outside you emulator
	uri: 'http://192.168.0.6:4000/graphql'
})

const AppStackNavigator = createStackNavigator(
	{
		Início: {
			screen: HomeScreen
		},
		Perfil: {
			screen: ProfileScreen
		},
		Notificações: {
			screen: NotificationScreen
		},
		'Criar Evento': {
			screen: CreateEventScreen
		},
		EventScreen
	},
	StackNavigatorConfig()
)

const AppNavigator = createDrawerNavigator({ AppStackNavigator }, drawerNavigatorConfig())
const AppContainer = createAppContainer(AppNavigator)

export default class App extends React.Component {
	state = {
		userLocation: {
			latitude: -21.065612,
			longitude: -50.531274,
			latitudeDelta: 40,
			longitudeDelta: 40
		},
		locationPermissionStatus: null
	}

	render() {
		return (
			<ApolloProvider client={client}>
				<ThemeProvider theme={theme}>
					<AppProvider
						value={{
							...this.state,
							setState: obj => this.setState(obj)
						}}
					>
						<View style={styles.container}>
							<StatusBar
								backgroundColor={color.light.background}
								barStyle="light-content"
								style={{ marginBottom: 30, paddingbottom: 40 }}
							/>
							<AppContainer />
						</View>
					</AppProvider>
				</ThemeProvider>
			</ApolloProvider>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 0,
		margin: 0
	}
})
