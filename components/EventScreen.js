import React from 'react'
import { View, StyleSheet, TextInput, KeyboardAvoidingView } from 'react-native'
import Card from './Card'
import { TextApp, ThumbImage, Li, Separator, ButtonApp, Loading } from './Layout'
import { getEventQuery } from '../queries/queries'
import { graphql } from 'react-apollo'
import Form from './Form'
class EventScreen extends React.Component {
	state = {
		text: ''
	}
	render() {
		if (this.props.data.loading) {
			return <Loading />
		}

		const { id, name, host, description, user, assistances } = this.props.data.event
		return (
			<Card padding>
				<ThumbImage image={require('../assets/images/user.jpg')} />
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
				<Form
					onChange={text => this.setState({ text })}
					form={{
						aditionalInformation: {
							name: "Se apresente para eles conhecerem melhor você",
							placeholder: 'Gostaria de ajudar na área X',
							type: 'inputText'
						}
					}}
				/>
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
				id: props.navigation.state.params.id
			}
		}
	}
})(EventScreen)