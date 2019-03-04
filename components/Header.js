import React from 'react'
import { newColor } from '../utils/colors'
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import styled from 'styled-components'
import { Space } from 'src/components/Layout'

class Header extends React.Component {
	componentDidMount = () => {
		const { notificationCount } = this.state
		if (!notificationCount) {
			this.setNotification(this.props.notificationCount)
		}
	}

	state = {}

	setNotification = notificationCount => {
		this.setState({
			notificationCount
		})
	}

	goToNotification = () => {
		this.setNotification(0)
		this.props.navigation.navigate('Notificações')
	}

	render() {
		const { notificationCount } = this.state
		return (
			<Container>
				<Button onPress={() => this.props.navigation.openDrawer()}>
					<FontAwesome size={28} color={newColor.dark.contrast} name="bars" />
				</Button>

				<Space p={5}>
					<Image source={require('../assets/logo/logo_sm_white.png')} />
				</Space>

				<Button onPress={() => this.goToNotification()}>
					<FontAwesome size={28} color={newColor.dark.contrast} name="bell-o" />

					{notificationCount > 0 ? (
						<View
							style={{
								position: 'absolute',
								zIndex: 2,
								top: 0,
								left: 0,
								width: 20,
								height: 20,
								borderRadius: 20,
								alignItems: 'center',
								justifyContent: 'center',
								backgroundColor: newColor.secondary()
							}}
						>
							<Text style={{ color: newColor.light.contrast }}>{notificationCount}</Text>
						</View>
					) : null}
				</Button>
			</Container>
		)
	}
}

const Button = styled.TouchableOpacity`
	padding: 5px;
`

const Container = styled.View`
	padding: 30px 23px 10px 23px;
	margin: 0px;
	flex-direction: row;
	justify-content: space-between;
	background-color: ${({ theme }) => theme.color.primary()};
	border-bottom-color: ${({ theme }) => theme.color.secondary()};
	border-bottom-width: 2px;
`

const styles = StyleSheet.create({
	container: {
		paddingTop: 30,
		paddingBottom: 10,
		paddingHorizontal: 23,
		margin: 0,
		flexDirection: 'row',
		justifyContent: 'space-between',
		padding: -5,
		backgroundColor: newColor.primary(),
		borderBottomColor: newColor.secondary(),
		borderBottomWidth: 2
	},
	padding5: {
		padding: 5
	}
})

export default Header

export const navigationOptions = {
	header: props => <Header navigation={props.navigation} />
}

export const StackNavigatorConfig = withHeader => {
	const defaultNavigationOptions =
		withHeader == 'none' ? { header: null, headerMode: 'none' } : navigationOptions
	return {
		cardStyle: {
			flex: 1,
			backgroundColor: newColor.light.background
		},
		defaultNavigationOptions
	}
}
