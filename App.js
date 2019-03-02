import React from 'react'
import { StatusBar, StyleSheet, View } from 'react-native'
import { createDrawerNavigator, createStackNavigator, createAppContainer } from 'react-navigation'
import Drawer from './components/Drawer'
import HomeScreen from './Screens/HomeScreen'
import NotificationScreen from './Screens/NotificationScreen'
import ProfileScreen from './Screens/ProfileScreen'
import color from './utils/colors'
import CreateEventScreen from './Screens/CreateEventScreen'
import EventScreen from './Screens/EventScreen'
import { ApolloProvider } from 'react-apollo'
import ApolloClient from 'apollo-boost'
import { StackNavigatorConfig } from 'src/components/Header'

const client = new ApolloClient({
	//Doesn't work outside you emulator
	uri: 'http://10.0.10.166:4000/graphql'
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

const AppNavigator = createDrawerNavigator(
	{ AppStackNavigator },
	{
		contentComponent: Drawer,
		drawerBackgroundColor: color.primary.main
	}
)

const AppContainer = createAppContainer(AppNavigator)

export default class App extends React.Component {
	render() {
		return (
			<ApolloProvider client={client}>
				<View style={styles.container}>
					<StatusBar
						backgroundColor={color.primary.dark}
						barStyle="light-content"
						style={{ marginBottom: 30, paddingbottom: 40 }}
					/>
					<AppContainer />
				</View>
			</ApolloProvider>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// backgroundColor: dark_blue,
		padding: 0,
		margin: 0
	}
})
