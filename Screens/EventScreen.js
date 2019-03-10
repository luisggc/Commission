import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Card } from 'src/components/Layout'
import { TextApp, ThumbImage, Li, Separator, ButtonApp, Loading } from 'src/components/Layout'
import { getEventQuery } from 'src/queries/queries'
import { graphql } from 'react-apollo'
import { InputText } from '../components/FormElements'

class EventScreen extends React.Component {
	state = {
		text: ''
	}
	render() {
		if (this.props.data.loading) {
			return <Loading />
		}
		const { _id, name, avatar, host, description, user, assistances } = this.props.data.event
		return (
			<Card padding>
				<ThumbImage source={{ uri: avatar }} />
				<View style={styles.statusContainer}>
					<TextApp style={{ fontSize: 16 }}>{name}</TextApp>
					<TextApp style={styles.description} secondary>
						{description}
					</TextApp>
				</View>
				<TextApp>Organizado por: {host}</TextApp>
				<Separator style={{ marginVertical: 15 }} />
				<TextApp style={{ marginBottom: 10, fontSize: 16 }}>Auxílios:</TextApp>
				<Li items={assistances} />
				<InputText
					onChange={text => this.setState({ text })}
					name="Se apresente para eles conhecerem melhor você"
					placeholder="Gostaria de ajudar na área X"
				/>
				<ButtonApp>Enviar</ButtonApp>
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
	},
	center: {
		alignItems: 'center'
	},
	description: {
		fontSize: 20,
		textAlign: 'center',
		marginTop: 10,
		marginBottom: 8
	},
	textInput: {
		marginVertical: 5,
		height: 80,
		borderRadius: 5
	}
})

// export default EventScreen
export default graphql(getEventQuery, {
	options: props => {
		return {
			variables: {
				_id: props.navigation.state.params._id
			}
		}
	}
})(EventScreen)
