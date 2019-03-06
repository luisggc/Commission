import React, { Component } from 'react'
import { View } from 'react-native'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import googleMapsStyle from './googleMapsStyle'
import SearchPlaces from 'src/components/SearchPlaces'
import EventItems from './EventItems'
import { Constants, Location, Permissions } from 'expo'

class HomeScreen extends Component {
	state = {
		region: {
			latitude: -22.911098,
			longitude: -43.236292,
			latitudeDelta: 0.06,
			longitudeDelta: 0.06
		}
	}

	_getLocationAsync = async () => {
		let { status } = await Permissions.askAsync(Permissions.LOCATION)
		if (status !== 'granted') {
			this.setState({
				errorMessage: 'Permission to access location was denied'
			})
		}

		const location = await Location.getCurrentPositionAsync({})
		const { latitude, longitude } = location.coords
		this.setState({
			region: {
				latitude,
				longitude,
				latitudeDelta: 0.06,
				longitudeDelta: 0.06
			}
		})
	}

	componentDidMount() {
		this._getLocationAsync()
	}

	render() {
		const { region } = this.state
		return (
			<View style={{ flex: 1 }}>
				{true && (
					<SearchPlaces region={region} onSelectRegion={region => this.setState({ region })} />
				)}

				<MapView
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
