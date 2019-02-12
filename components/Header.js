import React from 'react'
import color from '../utils/colors'
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
// import { withNavigation } from 'react-navigation'

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
			<View style={styles.container}>
				<TouchableOpacity
					style={styles.padding5}
					onPress={() => this.props.navigation.openDrawer()}
				>
					<FontAwesome size={28} color={color.primary.contrastText} name="bars" />
				</TouchableOpacity>

				<View style={styles.padding5}>
					<Image source={require('../assets/logo/logo_sm_white.png')} />
				</View>

				<TouchableOpacity style={styles.padding5} onPress={() => this.goToNotification()}>
					<FontAwesome size={28} color={color.primary.contrastText} name="bell-o" />

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
								backgroundColor: color.secondary.main
							}}
						>
							<Text style={{ color: color.primary.contrastText }}>{notificationCount}</Text>
						</View>
					) : null}
				</TouchableOpacity>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		paddingTop: 30,
		paddingBottom: 10,
		paddingHorizontal: 23,
		margin: 0,
		flexDirection: 'row',
		justifyContent: 'space-between',
		padding: -5,
		backgroundColor: color.primary.main,
		borderBottomColor: color.secondary.main,
		borderBottomWidth: 1
	},
	padding5: {
		padding: 5
	}
})

export default Header

export const navigationOptions = {
	header: props => <Header navigation={props.navigation} />
}

export const StackNavigatorConfig = {
	cardStyle: {
		flex: 1,
		backgroundColor: color.primary.main
	},
	headerMode: 'float',
	navigationOptions
}
