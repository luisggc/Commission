import React from 'react'
import color from '../utils/colors'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons'
import { TextApp, ThumbImage } from './Layout'

class EventItem extends React.Component {
	render() {
		const { name, host, description, onJoin } = this.props
		return (
			<TouchableOpacity onPress={onJoin}>
				<View style={styles.containerIcon}>
					{/* <FontAwesome5 size={30} color={white} name='church' /> */}
					<ThumbImage small image={require('../assets/images/user.jpg')} />
					{/* <MaterialCommunityIcons size={40} color={white} name="bus-school" /> */}
				</View>
				<View style={{ flex: 1, marginBottom: 5 }}>
					<View style={styles.container}>
						<View style={{ flex: 1 }}>
							<View>
								<TextApp style={{ fontSize: 18, marginBottom: 5 }}>{name}</TextApp>
							</View>
							<View>
								<TextApp primaryLight>{description}</TextApp>
							</View>
						</View>
						<View style={styles.containerButton}>
							<View style={{ width: 0, flexGrow: 1 }}>
								<TextApp style={{ marginLeft: 10, fontSize: 12 }}>Por: {host}</TextApp>
							</View>
						</View>
					</View>
				</View>
			</TouchableOpacity>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		padding: 20,
		backgroundColor: color.primary.main,
		marginRight: 20,
		marginLeft: 40,
		paddingLeft: 50,
		maxHeight: 90,
		shadowOffset: { width: 1, height: 1 },
		shadowColor: 'black',
		shadowOpacity: 0.5,
		elevation: 2
	},
	containerIcon: {
		position: 'absolute',
		top: 13,
		left: 13,
		zIndex: 10,
		elevation: 10,
	},
	button: {
		padding: 10,
		backgroundColor: color.secondary.main,
		borderBottomLeftRadius: 5,
		borderTopLeftRadius: 5
	},
	sep: {
		height: 1,
		backgroundColor: color.primary.main,
		marginHorizontal: 30
	}
})

export default EventItem
