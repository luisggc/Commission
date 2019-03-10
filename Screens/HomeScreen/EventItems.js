import React, { Component } from 'react'
import EventItem from './EventItem'
import { graphql } from 'react-apollo'
import { View, StyleSheet, FlatList, Animated, Dimensions, PanResponder } from 'react-native'
import { getEventsQuery } from 'src/queries/queries'
import { color } from 'src/utils/theme'
import { Loading } from 'src/components/Layout'
import styled from 'styled-components'

class EventItems extends Component {
	constructor(props) {
		super(props)
		this.state = { lastHeight: 50, initialAnimation: false }
		this.height = new Animated.Value(50)
		this.panResponder = PanResponder.create({
			onStartShouldSetPanResponder: () => !this.props.data.loading,
			onPanResponderMove: (event, gesture) => {
				const newHeight = this.state.lastHeight - gesture.dy
				if (newHeight > 35 && !this.props.data.loading) {
					this.height.setValue(newHeight)
				}
			},
			onPanResponderRelease: () => {
				this.setState({ lastHeight: this.height.__getValue() })
			}
		})
	}

	componentDidUpdate() {
		//Run initial animation
		if (!this.props.data.loading && !this.state.initialAnimation) {
			const newHeight = 0.4 * Dimensions.get('window').height
			Animated.spring(this.height, { toValue: newHeight, speed: 12 }).start()
			this.setState({
				lastHeight: newHeight,
				initialAnimation: true
			})
		}
	}

	render() {
		if (this.props.data.loading) {
			return (
				<Animated.View style={[styles.flatContainer, { height: this.height }]}>
					<Loading />
				</Animated.View>
			)
		}

		const {
			data: { events },
			myLocation
		} = this.props

		return (
			<Animated.View style={[styles.flatContainer, { height: this.height }]}>
				<View style={styles.draggable} {...this.panResponder.panHandlers}>
					<DraggableItem />
				</View>
				<FlatList
					data={events}
					navigation={this.props.navigation}
					keyExtractor={item => item._id}
					renderItem={({ item }) => (
						<EventItem
							myLocation={myLocation}
							{...item}
							onJoin={() => this.props.navigation.navigate('EventScreen', item)}
						/>
					)}
				/>
			</Animated.View>
		)
	}
}

const DraggableItem = styled.View`
	background-color: ${({ theme }) => theme.color.interactive()};
	align-self: center;
	height: 3;
	width: 35;
	border-radius: 2;
`
// export default graphql(getEventsQuery)(EventItems)

export default graphql(getEventsQuery, {
	options: props => {
		if (!props.userLocation) return {}
		const {latitude, longitude} = props.userLocation
		return {
			variables: {
				location: [longitude, latitude]
			}
		}
	}
})(EventItems)

const styles = StyleSheet.create({
	flatContainer: {
		position: 'absolute',
		width: Dimensions.get('window').width,
		bottom: 0,
		backgroundColor: color.light.background,
		elevation: 2
	},
	draggable: {
		display: 'flex',
		paddingVertical: 20,
		width: Dimensions.get('window').width,
		height: 45,
		zIndex: 4
	}
})
