import React from 'react'
import { View, StyleSheet, Text, FlatList } from 'react-native'
import Card from 'src/components/Card'
import { TextApp, ThumbImage, ButtonApp } from 'src/components/Layout'
import { StackNavigatorConfig } from 'src/components/Header'
import { createStackNavigator } from 'react-navigation'
import { Separator } from 'src/components/Layout'

const Notification = props => {
	const { title, eventName, icon, time } = props.item
	return (
		<View style={{ flex: 1, flexDirection: 'row' }}>
			<View>
				<ThumbImage image={icon} small />
			</View>
			<View style={{ flex: 1, flexDirection: 'column' }}>
				<View style={styles.topView}>
					<TextApp style={styles.description}>{title}</TextApp>
					<ButtonApp>Responder</ButtonApp>
				</View>

				<View style={{ marginTop: 10 }}>
					<Text>
						<TextApp secondary>Gostaria de participar do seu </TextApp>
						<TextApp>{eventName}</TextApp>
					</Text>
				</View>

				<View style={{ alignSelf: 'flex-end' }}>
					<TextApp style={{ fontSize: 8 }}>{time}</TextApp>
				</View>
			</View>
		</View>
	)
}

class NotificationScreen extends React.Component {
	render() {
		const notifications = [
			{
				id: '132423432423',
				title: 'Luis Coimbra',
				eventName: 'evangelismo de rua evangelismo de rua',
				icon: require('../assets/images/user.jpg'),
				time: '20/05/2018'
			},
			{
				id: '120930912491',
				title: 'Luis Coimbra',
				eventName:
					'evangelismo de rua evangelismo de rua evangelismo de rua evangelismo de rua evangelismo de rua',
				icon: require('../assets/images/user.jpg'),
				time: '20/05/2018'
			},
			{
				id: '9186419',
				title: 'Sou um mapa mapa mapa mapa mapa mapa mapa',
				eventName: 'map',
				icon: require('../assets/images/map.png'),
				time: '29/05/2018'
			},
			{
				id: '536',
				title: 'Pedro Henriquee',
				eventName:
					'estudo na universidadeuniversidadeuniversidadeuniversidadeuniversidadeuniversidadeuniversidadeuniversidadeuniversidadeuniversidadeuniversidade',
				icon: require('../assets/images/user.jpg'),
				time: '02/05/2018'
			}
		]
		return (
			<Card headerTitle={'Notificações'}>
				<FlatList
					contentContainerStyle={styles.contentContainer}
					ItemSeparatorComponent={() => (
						<Separator style={{ marginTop: 5, marginBottom: 10 }} />
					)}
					data={notifications}
					keyExtractor={item => item.id}
					renderItem={item => <Notification {...item} />}
				/>
			</Card>
		)
	}
}

const styles = StyleSheet.create({
	topView: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-start'
	},
	thumbImageContainer: {
		marginTop: 50,
		marginBottom: 20
	},
	statusContainer: {
		marginTop: 10,
		alignItems: 'center'
	},
	description: {
		width: 0,
		flexGrow: 1,
		alignSelf: 'flex-end'
	},
	contentContainer: {
		marginTop: 30,
		paddingHorizontal: 23
	}
})

export default createStackNavigator(
	{
		NotificationScreen
  },
  StackNavigatorConfig("none")
)
