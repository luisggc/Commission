import React from 'react'
import color, { newColor } from '../utils/colors'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { TextApp, ThumbImage } from './Layout'

class EventItem extends React.Component {
	render() {
		const { name, host, description, onJoin } = this.props
		return (
			<TouchableOpacity onPress={onJoin}>
				<View style={styles.container}>
					<View style={styles.containerIcon}>
						<ThumbImage small image={require('../assets/images/user.jpg')} />
					</View>
					<View style={styles.containerInfo}>
						<View style={{ flex: 1 }}>
							<View>
								<TextApp highContrast style={{ fontSize: 18, marginBottom: 5 }}>
									{name}
								</TextApp>
							</View>
							<View>
								<TextApp>{description}</TextApp>
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
		flexDirection: 'row'
	},
	containerInfo: {
		flex: 1,
		flexDirection: 'row',
		marginTop: 20,
		marginRight: 20,
		maxHeight: 90
	},
	containerIcon: {
		margin: 12
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
