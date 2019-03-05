import React, { Component } from 'react'
import EventItem from './EventItem'
import { graphql } from 'react-apollo'
import { View, StyleSheet, FlatList, Animated, Dimensions, PanResponder } from 'react-native'
import { getEventsQuery } from 'src/queries/queries'
import color, { newColor } from 'src/utils/colors'
import { Loading } from 'src/components/Layout'
import styled from 'styled-components'

class EventItems extends Component {
	constructor(props) {
		super(props)
		this.state = { lastHeight: 50 }
		this.height = new Animated.Value(50)
		this.panResponder = PanResponder.create({
			onStartShouldSetPanResponder: () => true,
			onPanResponderMove: (event, gesture) => {
				const newHeight = this.state.lastHeight - gesture.dy
				if (newHeight > 35) {
					this.height.setValue(newHeight)
				}
			},
			onPanResponderRelease: () => {
				this.setState({ lastHeight: this.height.__getValue() })
			}
		})
	}

	render() {
		if (this.props.data.loading) {
			return <Loading />
		}
		const { events } = this.props.data
		return (
			<Animated.View style={[styles.flatContainer, { height: this.height }]}>
				<View style={styles.draggable} {...this.panResponder.panHandlers}>
					<DraggableItem />
				</View>
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
			</Animated.View>
		)
	}
}

const DraggableItem = styled.View`
	background-color: ${({ theme }) => theme.color.interactive()};
	align-self: center;
	height: 5;
	width: 35;
	border-radius: 2;
`
export default graphql(getEventsQuery)(EventItems)

const styles = StyleSheet.create({
	textInput: {
		color: color.primary.contrastText,
		fontSize: 15,
		paddingVertical: 10
	},
	flatContainer: {
		position: 'absolute',
		width: Dimensions.get('window').width,
		bottom: 0,
		backgroundColor: newColor.light.background,
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