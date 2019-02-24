import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import Card from './Card'
import { primaryTextColor } from '../utils/colors'
import { createStackNavigator } from 'react-navigation'
import { StackNavigatorConfig } from './Header'
import Form from './Form'
import { ChooseIcon } from 'src/components/FormElements'
import { InputText } from './FormElements'

function submit(a) {
	console.log(a)
}

function CreateEventScreen() {
	return (
		<Card headerTitle={'Faça a diferença !'} padding>
			{/* <ChooseIcon name="Selecione um ícone" />
			<InputText
				name="Título do Evento"
				placeholder="Evangelismo de rua, Doação, Pregaçãos..."
			/> */}

			<Form
				onChange={submit}
				submitText={'Criar Evento !'}
				form={{
					chooseIcon: {
						name: 'Selecione um ícone',
						type: 'selectIcon'
					},
					title: {
						name: 'Título do Evento',
						placeholder: 'Evangelismo de rua, Doação, Pregaçãos...',
						type: 'inputText'
					},
					description: {
						name: 'Breve descrição',
						placeholder: 'Encontro para a distribuição de agasalhos',
						type: 'inputText'
					},
					organization: {
						name: 'Organização',
						placeholder: 'Igreja XYZ, CRU...',
						type: 'inputText'
					},
					assistance: {
						name: 'Auxílios',
						options: ['alimentação', 'capacitação', 'transporte', 'bíblia'],
						value: [],
						mandatory: false,
						other: true,
						type: 'multiselection'
					},
					datetime: {
						name: 'Dia/Horário',
						type: 'datetime',
						placeholder: 'Selecione aqui o dia e horário'
					},
					recurrency: {
						name: 'Auxílios',
						options: [
							'Uma vez',
							'Diariamente',
							'Semanalmente',
							'Mensalmente',
							'Semestralmente',
							'Anualmente'
						],
						value: 'Uma vez',
						// Endereço (colocar mapa) e OBSERVAÇÕES
						type: 'selection'
					}
				}}
			/>
		</Card>
	)
}

const styles = StyleSheet.create({
	thumbImageContainer: {
		marginTop: 50,
		marginBottom: 20
	},
	inputCompostContainer: {
		marginTop: 10
	},
	inputContainer: {
		marginTop: 10,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	columnContainer: {
		marginTop: 10,
		flex: 1
	},
	center: {
		alignItems: 'center'
	},
	bigTextInput: {
		padding: 5,
		marginVertical: 5,
		height: 90,
		backgroundColor: primaryTextColor,
		borderRadius: 5
	},
	textInput: {
		marginTop: 5,
		// height: 20,
		backgroundColor: primaryTextColor,
		borderRadius: 5,
		padding: 5
	},
	picker: {
		backgroundColor: primaryTextColor,
		borderRadius: 5,
		padding: 0
	}
})

export default createStackNavigator(
	{
		CreateEventScreen
	},
	StackNavigatorConfig
)

function addOrRemove(arrayo, value) {
	const array = arrayo
	var index = array.indexOf(value)
	if (index === -1) {
		array.push(value)
	} else {
		array.splice(index, 1)
	}
	return array
}

function options_multiple(array) {
	return array.reduce((accumulator, name) => {
		// const id = (accumulator.length + 1).toString()
		accumulator.push({
			id: name,
			name
		})
		return accumulator
	}, [])
}
function options_unique(array) {
	return array.reduce((accumulator, name) => {
		// const id = (accumulator.length + 1).toString()
		accumulator.push({
			key: name,
			label: name
		})
		return accumulator
	}, [])
}
