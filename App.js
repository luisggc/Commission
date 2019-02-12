import React from 'react'
import { StatusBar, StyleSheet, View, TouchableOpacity, Text } from 'react-native'
import { createDrawerNavigator, createStackNavigator } from 'react-navigation'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import Drawer from './components/Drawer'
import HomeScreen from './components/HomeScreen'
import NotificationScreen from './components/NotificationScreen'
import ProfileScreen from './components/ProfileScreen'
import reducer from './reducers'
import color from './utils/colors'
import CreateEventScreen from './components/CreateEventScreen'
import { ApolloProvider } from 'react-apollo'
import ApolloClient from 'apollo-boost'

const client = new ApolloClient({
	uri: 'http://localhost:4000/graphql'
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
				{/* <Provider store={createStore(reducer)}> */}
				<View style={styles.container}>
					<StatusBar
						backgroundColor={color.primary.dark}
						barStyle="light-content"
						style={{ marginBottom: 30, paddingbottom: 40 }}
					/>
					<AppNavigator />
				</View>
				{/* </Provider> */}
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
