import React from 'react'
import { StyleSheet } from 'react-native'
import Card from './Card'
import { primaryTextColor } from '../utils/colors'
import { createStackNavigator } from 'react-navigation'
import { StackNavigatorConfig } from './Header'
import { ChooseIcon, InputText, MultiSelection, DateTimePicker, Selection } from './FormElements'

function submit(a) {
	console.log(a)
}

function CreateEventScreen() {
	return (
		<Card headerTitle={'Faça a diferença !'} padding>
			<ChooseIcon name="Selecione um ícone" />
			<InputText
				name="Título do Evento"
				placeholder="Evangelismo de rua, Doação, Pregaçãos..."
			/>
			<InputText
				name="Título do Evento"
				placeholder="Evangelismo de rua, Doação, Pregaçãos..."
			/>
			<InputText
				name="Breve descrição"
				placeholder="Encontro para a distribuição de agasalhos"
			/>
			<InputText name="Organização" placeholder="Igreja XYZ, CRU..." />

			<MultiSelection
				name="Auxílios"
				options={['alimentação', 'capacitação', 'transporte', 'bíblia']}
				value={[]}
				mandatory
				other
			/>
			<DateTimePicker name="Dia/Horário" placeholder="Selecione aqui o dia e horário" />

			<Selection
				name="Auxílios"
				options={[
					'Uma vez',
					'Diariamente',
					'Semanalmente',
					'Mensalmente',
					'Semestralmente',
					'Anualmente'
				]}
				value="Uma vez"
			/>
		</Card>
	)
}

export default createStackNavigator(
	{
		CreateEventScreen
	},
	StackNavigatorConfig
)
