import React from 'react'
import { StatusBar, StyleSheet, View } from 'react-native'
import { createDrawerNavigator, createStackNavigator } from 'react-navigation'
import Drawer from './components/Drawer'
import HomeScreen from './Screens/HomeScreen'
import NotificationScreen from './Screens/NotificationScreen'
import ProfileScreen from './Screens/ProfileScreen'
import color from './utils/colors'
import CreateEventScreen from './Screens/CreateEventScreen'
import { ApolloProvider } from 'react-apollo'
import ApolloClient from 'apollo-boost'

const client = new ApolloClient({
	//Doesn't work outside you emulator
	uri: 'http://192.168.0.8:4000/graphql'
})

const MainNavigator = createDrawerNavigator(
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
		}
	},
	{
		initialRouteName: 'Início',
		contentComponent: Drawer,
		drawerBackgroundColor: color.primary.main
	}
)

const AppNavigator = createStackNavigator(
	{
		MainNavigator: {
			screen: MainNavigator
		}
	},
	{
		header: null,
		headerMode: 'none'
	}
)

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
					<AppNavigator />
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
