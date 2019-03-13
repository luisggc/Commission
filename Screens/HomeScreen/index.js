import React, { Component } from 'react'
import { View } from 'react-native'
import { Location, Permissions } from 'expo'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'

import EventItems from './EventItems'
import AppContext from 'src/components/AppContext'
import googleMapsStyle from './googleMapsStyle'
import SearchPlaces from 'src/components/SearchPlaces'
import { ButtonApp } from 'src/components/Layout'

class HomeScreen extends Component {

	constructor(props) {
		super(props)
		this._getLocationAsync = this._getLocationAsync.bind(this)
	}

	componentDidMount() {
		this._getLocationAsync()
	}

	_getLocationAsync = async () => {
		const { status } = await Permissions.askAsync(Permissions.LOCATION)
		if (status == 'granted') {
			const location = await Location.getCurrentPositionAsync({})
			const { latitude, longitude } = location.coords
			this.props.contextApp.setState({
				userLocation: {
					latitude,
					longitude,
					latitudeDelta: 0.14,
					longitudeDelta: 0.14
				},
				locationPermissionStatus: 'granted'
			})
			return
		}
		this.props.contextApp.setState({
			locationPermissionStatus: status
		})
	}

	render() {
		const { userLocation, locationPermissionStatus } = this.props.contextApp
		return (
			<View style={{ flex: 1 }}>
				{true && (
					<SearchPlaces
						float
						region={userLocation}
						onSelectRegion={userLocation => this.setState({ userLocation })}
						placeholder="Aonde Deus quer te levar hoje ?"
					/>
				)}
				{locationPermissionStatus == 'denied' && (
					<ButtonApp onPress={() => this._getLocationAsync()}>Permitir localização</ButtonApp>
				)}
				<MapView
					region={userLocation}
					provider={PROVIDER_GOOGLE}
					style={{ flex: 1, flexGrow: 1 }}
					customMapStyle={googleMapsStyle}
					showsUserLocation={true}
				/>
				<EventItems
					myLocation={userLocation}
					userLocation={locationPermissionStatus !== 'granted' ? null : userLocation}
					navigation={this.props.navigation}
					locationPermissionStatus={locationPermissionStatus}
				/>
			</View>
		)
	}
}

export default AppContext(HomeScreen)
