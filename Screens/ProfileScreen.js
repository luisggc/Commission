import React from 'react'
import { View, StyleSheet } from 'react-native'
import Card from 'src/components/Card'
import { TextApp, ThumbImage, Li } from 'src/components/Layout'
import { StackNavigatorConfig } from 'src/components/Header'
import { createStackNavigator } from 'react-navigation'

class ProfileScreen extends React.Component {
	state = {
		name: 'Luis Coimbra',
		description: 'Apaixonado por Jesus',
		aim:
			'Jovem batista em busca de missões, novas experiências em evangelismo, discipulado e defesa da fé.',
		age: 21
	}
	render() {
		const { name, description, aim, age } = this.state
		return (
			<Card padding>
				<ThumbImage image={require('../assets/images/user.jpg')} />
				<View style={styles.statusContainer}>
					<TextApp>{name}</TextApp>
					<TextApp>{age} anos</TextApp>
					<TextApp secondary>{description}</TextApp>
					<TextApp style={{ marginVertical: 20 }}>{aim}</TextApp>
					<Li items={['Oi', 'meu', 'nome', 'é', 'Luis']} />
				</View>
			</Card>
		)
	}
}

const styles = StyleSheet.create({
	thumbImageContainer: {
		marginTop: 50,
		marginBottom: 20
	},
	statusContainer: {
		marginTop: 10,
		alignItems: 'center'
	}
})

export default createStackNavigator(
	{
		ProfileScreen
	},
	StackNavigatorConfig
)
