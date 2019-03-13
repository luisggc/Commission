import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { TextApp, ThumbImage } from '../../components/Layout'

class EventItem extends React.PureComponent {
	render() {
		const { name, avatar, host, description, onJoin, distance } = this.props
		return (
			<TouchableOpacity onPress={onJoin}>
				<View style={styles.container}>
					<View style={styles.containerIcon}>
						<ThumbImage small source={{ uri: avatar }} />
					</View>
					<View style={styles.containerInfo}>
						<View style={{ flex: 1 }}>
							<View>
								{distance && (
									<TextApp placeholder style={{ fontSize: 10, marginBottom: 5 }}>
										{Math.round(distance/1000)}
										km de distância
									</TextApp>
								)}
							</View>
							<View>
								<TextApp highContrast style={{ fontSize: 18, marginBottom: 5 }}>
									{`${name.substr(0, 25)}...`}
								</TextApp>
							</View>
							<View>
								<TextApp>{`${description.substr(0, 90)}...`}</TextApp>
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
		maxHeight: 100
	},
	containerIcon: {
		margin: 12
	}
})

export default EventItem
