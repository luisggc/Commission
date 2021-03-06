import React from 'react'
import { StyleSheet, SafeAreaView } from 'react-native'
import { Card } from 'src/components/Layout'

import {
	ChooseIcon,
	InputText,
	MultiSelection,
	DateTimePicker,
	Selection,
	InputFormat,
	PeriodPicker
} from 'src/components/FormElements'
import { ButtonApp } from 'src/components/Layout'
import { withFormik } from 'formik'
import { TextApp } from '../components/Layout'
import * as Yup from 'yup'
import SearchPlaces from 'src/components/SearchPlaces'

function CreateEventScreen(props) {
	const { values, touched, errors, handleChange, handleBlur, setFieldValue, handleSubmit } = props
	return (
		<Card headerTitle={'Faça a diferença !'} padding>

			<ChooseIcon name="Selecione um ícone" />
			<InputText
				name="Título do Evento"
				placeholder="Evangelismo de rua, Doação, Pregaçãos..."
				onChangeText={handleChange('name')}
			/>

			<InputText
				name="Breve descrição"
				placeholder="Encontro para a distribuição de agasalhos"
				onChangeText={handleChange('description')}
			/>

			<InputFormat name={'Selecione o local do evento'}>
				<SearchPlaces
					placeholder="Use o google para achar seu lugar"
					onSelectRegion={location => setFieldValue('location', location)}
				/>
			</InputFormat>

			<InputText
				name="Organização"
				placeholder="Igreja XYZ, CRU..."
				onChangeText={handleChange('host')}
			/>

			<MultiSelection
				name="Auxílios"
				options={['alimentação', 'capacitação', 'transporte', 'bíblia']}
				selectedItems={values.assistances}
				onPress={setFieldValue}
				field="assistances"
				// onAddPress={(e) => console.log('onaddpress', e)} // this.addOptions(key, 'oi')}
			/>

			<DateTimePicker
				field="eventDate"
				name="Dia/Horário"
				placeholder="Selecione aqui o dia e horário"
				setFieldValue={setFieldValue}
				value={values.eventDate}
			/>

			<PeriodPicker
				name="Duração"
				onChange={duration => setFieldValue('duration', duration)}
				value={values.duration}
			/>

			<Selection
				name="Recorrência"
				options={[
					'Uma vez',
					'Diariamente',
					'Semanalmente',
					'Mensalmente',
					'Semestralmente',
					'Anualmente',
					'Temporada'
				]}
				value={values.recurrence}
				onChange={handleChange('recurrence')}
			/>

			{values.recurrence == 'Temporada' && (
				<TextApp>
					Temporada trata-se de um período de tempo fixo em um local, como uma viagem.
				</TextApp>
			)}

			<ButtonApp onPress={() => sendForm(errors, handleSubmit)} style={styles.button}>
				Enviar !
			</ButtonApp>
		</Card>
	)
}

const styles = StyleSheet.create({
	button: {
		marginTop: 30,
		paddingVertical: 15,
		paddingHorizontal: 10
	}
})

function sendForm(errors, handleSubmit) {
	const errorsText = Object.keys(errors).reduce((acc, value) => {
		console.log(acc, value)
		return `${acc}
		${errors[value]}`
	}, '')
	errorsText && alert(errorsText.substring(1))
	handleSubmit()
}
function mapPropsToValues({
	name,
	description,
	location,
	host,
	assistances,
	eventDate,
	duration,
	recurrence,
	user,
}) {
	return {
		name: name || '',
		description: description || '',
		location: location || '',
		host: host || '',
		assistances: assistances || [],
		eventDate: eventDate || '',
		duration: duration || '',
		recurrence: recurrence || 'Uma vez',
		user: user || '',
	}
}

function handleSubmit(values, { resetForm, setErrors, setSubmitting }) {
	console.log('submitttt')
	alert(JSON.stringify(values))
}

const validationSchema = Yup.object().shape({
	name: Yup.string()
		.min(4, '"Nome" deve possuir no mínimo 4 caracteres')
		.required('"Nome" deve ser preenchido'),
	host: Yup.string().required('"Organizador" deve ser preenchido'),
	// user: Yup.string().required('"Usuário" deve ser preenchido'),
	description: Yup.string().required('"Descrição" deve ser preenchido'),
	recurrence: Yup.string().required('"Recorrência" deve ser preenchido'),
	host: Yup.string().required('"Organizador" deve ser preenchido'),
	eventDate: Yup.string().required('"Dia do Evento" deve ser preenchido'),
	location: Yup.string().required('"Localização" deve ser preenchido'),
	duration: Yup.number()
		.min(60)
		.required('"Duração" deve ser preenchida e ser um número')
})

export default withFormik({
	mapPropsToValues,
	validationSchema,
	handleSubmit
})(CreateEventScreen)
