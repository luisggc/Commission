import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { getEventsQuery } from 'src/queries/queries'
import { View, StyleSheet, FlatList } from 'react-native'

import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import { Loading } from 'src/components/Layout'
import color, { newColor } from 'src/utils/colors'
import EventItem from './EventItem'
import googleMapsStyle from './googleMapsStyle'
import SearchPlaces from 'src/components/SearchPlaces'

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
		if (this.props.data.loading) {
			return <Loading />
		}
		const events = this.props.data.events
		const { region } = this.state
		console.log(region)
		return (
			<View style={{ flex: 1 }}>
				{true && <SearchPlaces onSelectRegion={region => this.setState({region})} />}

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
		backgroundColor: newColor.light.background,
		elevation: 2,
		height: 300 //window.height - 330,
	}
})

export default graphql(getEventsQuery)(HomeScreen)

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
