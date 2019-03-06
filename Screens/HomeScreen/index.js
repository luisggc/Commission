import React, { Component } from 'react'
import { View } from 'react-native'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import googleMapsStyle from './googleMapsStyle'
import SearchPlaces from 'src/components/SearchPlaces'
import EventItems from './EventItems'
import { Location, Permissions } from 'expo'

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
				<EventItems myLocation={region} navigation={this.props.navigation} />
			</View>
		)
	}
}

export default HomeScreen