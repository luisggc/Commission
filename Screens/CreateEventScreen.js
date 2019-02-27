import React from 'react'
import { StyleSheet, SafeAreaView } from 'react-native'
import Card from 'src/components/Card'
import { createStackNavigator } from 'react-navigation'
import { StackNavigatorConfig } from 'src/components/Header'
import {
	ChooseIcon,
	InputText,
	MultiSelection,
	DateTimePicker,
	Selection
} from 'src/components/FormElements'
import { ButtonApp } from 'src/components/Layout'
import { withFormik } from 'formik'
// import Yup from 'yup'

function CreateEventScreen(props) {
	const { values, touched, errors, handleChange, handleBlur, setFieldValue, handleSubmit } = props
	console.log(setFieldValue)
	console.log('screen', values)
	return (
		<Card headerTitle={'Faça a diferença !'} padding>
			<SafeAreaView>
				<ChooseIcon name="Selecione um ícone" />
				<InputText
					name="Título do Evento"
					placeholder="Evangelismo de rua, Doação, Pregaçãos..."
					onChangeText={handleChange('name')}
				/>
				<InputText
					name="Breve descrição"
					placeholder="Encontro para a distribuição de agasalhos"
					onChangeText={handleChange('name')}
				/>

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
					// onAddPress={(e) => console.log('onaddpress', e)} // this.addOptions(key, 'oi')}
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

				<ButtonApp onPress={() => setFieldValue('assistances', 'oi')} style={styles.button}>
					Assistance !
				</ButtonApp>

				<ButtonApp onPress={handleSubmit} style={styles.button}>
					Enviar !
				</ButtonApp>
			</SafeAreaView>
		</Card>
	)
}

const styles = StyleSheet.create({
	button: {
		marginTop: 10,
		paddingVertical: 15,
		paddingHorizontal: 10
	}
})

function mapPropsToValues({ name, host, description, user, assistances }) {
	return {
		name: name || '',
		host: host || '',
		user: user || '',
		description: description || '',
		assistances: assistances || []
	}
}

{
	/* id: ID
name: String
host: String
description: String
user: User
assistances: [Assistance] */
}

function handleSubmit(values, { resetForm, setErrors, setSubmitting }) {
	alert(JSON.stringify(values))
}

//   validationSchema: Yup.object().shape({
// 	email: Yup.string().email('Email not valid').required('Email is required'),
// 	password: Yup.string().min(9, 'Password must be 9 characters or longer').required('Password is required')
//   }),

const CreateEventScreenFormik = withFormik({ mapPropsToValues, handleSubmit })(CreateEventScreen)

export default createStackNavigator(
	{
		CreateEventScreenFormik
	},
	StackNavigatorConfig
)
