import React, { Component } from 'react'
import { View } from 'react-native'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import googleMapsStyle from './googleMapsStyle'
import SearchPlaces from 'src/components/SearchPlaces'
import EventItems from './EventItems'
import { Location, Permissions } from 'expo'
import { ButtonApp } from '../../components/Layout'

class HomeScreen extends Component {
	state = {
		region: {
			latitude: -22.911098,
			longitude: -43.236292,
			latitudeDelta: 0.06,
			longitudeDelta: 0.06
		},
		regionDefault: true
	}

	componentDidMount() {
		this._getLocationAsync()
	}

	_getLocationAsync = async () => {
		const { status } = await Permissions.askAsync(Permissions.LOCATION)
		if (status == 'granted') {
			const location = await Location.getCurrentPositionAsync({})
			const { latitude, longitude } = location.coords
			this.setState({
				region: {
					latitude,
					longitude,
					latitudeDelta: 0.06,
					longitudeDelta: 0.06
				},
				regionDefault: false
			})
		}
	}

	render() {
		const { region, regionDefault } = this.state
		return (
			<View style={{ flex: 1 }}>
				{true && (
					<SearchPlaces
						float
						region={region}
						onSelectRegion={region => this.setState({ region })}
						placeholder="Aonde Deus que te levar hoje ?"
					/>
				)}
				{regionDefault && (
					<ButtonApp onPress={() => this._getLocationAsync()}>Permitir localização</ButtonApp>
				)}
				<MapView
					region={region}
					provider={PROVIDER_GOOGLE}
					style={{ flex: 1, flexGrow: 1 }}
					customMapStyle={googleMapsStyle}
					showsUserLocation={true}
				/>
				<EventItems
					myLocation={region}
					userLocation={regionDefault ? null : region}
					navigation={this.props.navigation}
				/>
			</View>
		)
	}
}

export default HomeScreen
