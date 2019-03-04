import React, { Component } from 'react'
import styled from 'styled-components'
import { GOOGLE_MAPS_API } from 'src/utils/credentials'
import { TextApp, Space } from './Layout'
import { TouchableOpacity, FlatList, StyleSheet } from 'react-native'
import EvilIcons from '@expo/vector-icons/EvilIcons'

export default class SearchPlaces extends Component {
	constructor(props) {
		super(props)
		this.onChange = this.onChange.bind(this)
		this.getDetailsPlace = this.getDetailsPlace.bind(this)
	}

	state = {
		places: [],
		search: '',
		error: false
	}

	async onChange(e) {
		const search = e.nativeEvent.text
		if (search.length < 4) {
			this.setState({ search, places: [] })
			return
		}
		this.setState({ search })
		const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${GOOGLE_MAPS_API}&input=${search}&language=pt-br`
		try {
			const result = await fetch(url)
			const json = await result.json()
			const places = json.predictions.map(place => ({
				...place,
				key: place.id
			}))

			this.setState({ places: places, error: false })
		} catch {
			this.setState({ error: true })
		}
	}

	async getDetailsPlace(placeID) {
		const { onSelectRegion } = this.props
		const url = `https://maps.googleapis.com/maps/api/place/details/json?key=${GOOGLE_MAPS_API}&placeid=${placeID}&language=pt-br`
		try {
			const result = await fetch(url)
			const json = await result.json()
			const { lat, lng } = json.result.geometry.location
			onSelectRegion({
				latitude: lat,
				longitude: lng,
				latitudeDelta: 0.0122,
				longitudeDelta: 0.0122
			})
			this.setState({ places: [], search: json.result.name })
		} catch {
			this.setState({ error: true })
		}
	}

	render() {
		const { places, search } = this.state
		return (
			<ContainerMargin>
				<ContainerSearch>
					<InputSearch
						value={search}
						onChange={this.onChange}
						placeholder="Aonde Deus que te levar hoje ?"
					/>
				</ContainerSearch>
				{places.length > 0 && (
					<ContainerPlaces>
						<FlatList
							data={places}
							renderItem={({ item }) => (
								<Place getDetailsPlace={this.getDetailsPlace} key={item.id} {...item} />
							)}
						/>
					</ContainerPlaces>
				)}
			</ContainerMargin>
		)
	}
}

const ContainerPlaces = styled.View`
	height: 180px;
	padding: 10px;
	background-color: ${({ theme }) => theme.color.light.lowContrast};
`

const Place = ({ structured_formatting, place_id, getDetailsPlace }) => (
	<TouchableOpacity onPress={() => getDetailsPlace(place_id)}>
		<Space pv={10} fd="row" alignItemsCenter>
			<IconContainer>
				<EvilIcons size={20} name="location" />
			</IconContainer>
			<Space fd="column">
				<TextApp>{structured_formatting.main_text}</TextApp>
				<TextApp>{structured_formatting.secondary_text}</TextApp>
			</Space>
		</Space>
	</TouchableOpacity>
)

const styles = StyleSheet.create({
	placesContainer: {
		display: 'flex',
		height: 100
	}
})

const IconContainer = styled.View`
	padding: 10px;
	margin-right: 10;
	border-right-width: 1px;
	border-right-color: ${({ theme }) => theme.color.light.contrast};
`
const InputSearch = styled.TextInput`
	padding: 15px 10px;
	flex-grow: 1;
`

const ContainerSearch = styled.View`
	display: flex;
	background-color: ${({ theme }) => theme.color.light.background};
`

const ContainerMargin = styled.View`
	position: absolute;
	display: flex;
	top: 25;
	width: 100%;
	padding: 0 10px;
	elevation: 6;
	z-index: 6;
`
