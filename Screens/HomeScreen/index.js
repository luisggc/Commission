import React, { Component } from 'react'
import { View } from 'react-native'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import googleMapsStyle from './googleMapsStyle'
import SearchPlaces from 'src/components/SearchPlaces'
import EventItems from './EventItems'

class HomeScreen extends Component {
	state = {
		region: {
			latitude: -22.911098,
			longitude: -43.236292,
			latitudeDelta: 0.0122,
			longitudeDelta: 0.0122
		}
	}

	render() {
		const { region } = this.state
		console.log(region)
		return (
			<View style={{ flex: 1 }}>
				{true && <SearchPlaces onSelectRegion={region => this.setState({ region })} />}

				<MapView
					// initialRegion={{
					// 	latitude: -22.911098,
					// 	longitude: -43.236292,
					// 	latitudeDelta: 0.0122,
					// 	longitudeDelta: 0.0122
					// }}
					region={region}
					provider={PROVIDER_GOOGLE}
					style={{ flex: 1, flexGrow: 1 }}
					customMapStyle={googleMapsStyle}
					showsUserLocation={true}
				/>
				<EventItems navigation={this.props.navigation} />
			</View>
		)
	}
}

export default HomeScreen

// createStackNavigator(
// 	{
// 		Home: {
// 			screen: graphql(getEventsQuery)(HomeScreen)
// 		},
// 		EventScreen: {
// 			screen: EventScreen
// 		}
// 	},
// 	StackNavigatorConfig
// )

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
