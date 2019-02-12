import React, { Component } from 'react'
import { View, TextInput, StyleSheet, Image, FlatList, Text, TouchableOpacity } from 'react-native'
// import { connect } from 'react-redux'
import { FontAwesome } from '@expo/vector-icons'
import color from '../utils/colors'
import EventItem from './EventItem'
import EventScreen from './EventScreen'
import { createStackNavigator } from 'react-navigation'
import { StackNavigatorConfig } from './Header'
import { Loading } from './Layout'
import { graphql } from 'react-apollo'
import { getEventsQuery } from '../queries/queries'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
// import {LinearGradient} from 'expo'
import { mapStyle } from '../utils/api'
// import { Dimensions } from 'react-native'
// const window = Dimensions.get('window')

class HomeScreen extends Component {
	state = {
		searchText: ''
	}

	render() {
		if (this.props.data.loading) {
			return <Loading />
		}
		const events = this.props.data.events
		return (
			<View style={{ flex: 1 }}>
				{this.props.search && (
					<View style={styles.container}>
						<TouchableOpacity style={{ paddingLeft: 5, paddingRight: 10 }}>
							<FontAwesome color={color.primary.contrastText} name="search" size={28} />
						</TouchableOpacity>
						<View style={{ flexGrow: 99 }}>
							<TextInput
								style={styles.textInput}
								onChangeText={searchText => this.setState({ searchText })}
								value={this.state.searchText}
								placeholder={'Aonde Deus quer te levar agora ?'}
								placeholderTextColor={color.primary.contrastText}
								underlineColorAndroid={'transparent'}
								keyboardAppearance={'dark'}
								textContentType={'addressCityAndState'}
							/>
						</View>
					</View>
				)}

				<MapView
					initialRegion={{
						latitude: -22.911098,
						longitude: -43.236292,
						latitudeDelta: 0.0122,
						longitudeDelta: 0.0122
					}}
					provider={PROVIDER_GOOGLE}
					style={{ flex: 1, flexGrow: 1 }}
					customMapStyle={mapStyle}
				/>
				<View style={styles.flatContainer}>
					<FlatList
						data={events}
						navigation={this.props.navigation}
						keyExtractor={item => item.id}
						renderItem={({ item }) => (
							<EventItem
								{...item}
								onJoin={() => this.props.navigation.navigate('EventScreen', item)}
							/>
						)}
					/>
					{/* </LinearGradient> */}
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		marginHorizontal: 25,
		alignContent: 'space-between',
		alignItems: 'center',
		// backgroundColor: white_transp,
		height: 50,
		marginBottom: 15,
		padding: 5
	},
	textInput: {
		color: color.primary.contrastText,
		fontSize: 15,
		paddingVertical: 10
	},
	flatContainer: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		height:  300//window.height - 330,
	}
})

export default createStackNavigator(
	{
		Home: {
			screen: graphql(getEventsQuery)(HomeScreen)
		},
		EventScreen: {
			screen: EventScreen
		}
	},
	StackNavigatorConfig
)

// const events = [
// 	{
// 		name: 'Evangelismo nas Ruas',
// 		host:
// 			'Igreja Batista Central em Cerâmica Igreja Batista Central em Cerâmica Igreja Batista Central em Cerâmica',
// 		description: 'Buscar evangelismo em praças próximo à igreja',
// 		id: '1',
// 		userId: '1'
// 	},
// 	{
// 		name: 'Pregação na Praça',
// 		host: 'Igreja Assembléia de Deus',
// 		description: 'Pregação em praça próxima',
// 		id: '2',
// 		userId: '2'
// 	},
// 	{
// 		name: 'Doar agasalhos',
// 		host: 'CRU',
// 		description: 'Evangelismo nas universidades',
// 		id: '3',
// 		userId: '3'
// 	},
// 	{
// 		name: 'Dar treinamentos',
// 		host: 'Pais',
// 		description: 'Aprendizado infanto-juvenil em escolas',
// 		id: '4',
// 		userId: '2'
// 	}
// ]
