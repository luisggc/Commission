import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { TextApp, ThumbImage } from '../../components/Layout'
import { getDistance } from 'geolib'

class EventItem extends React.Component {
	render() {
		const { name, host, description, location, onJoin, myLocation } = this.props
		return (
			<TouchableOpacity onPress={onJoin}>
				<View style={styles.container}>
					<View style={styles.containerIcon}>
						<ThumbImage small source={require('src/assets/images/user.jpg')} />
					</View>
					<View style={styles.containerInfo}>
						<View style={{ flex: 1 }}>
							<View>
								{location && (
									<TextApp placeholder style={{ fontSize: 10, marginBottom: 5 }}>
										{Math.round(getDistance(location, myLocation, 1000) / 1000)}
										km de distância
									</TextApp>
								)}
							</View>
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
	}
})

export default EventItem
