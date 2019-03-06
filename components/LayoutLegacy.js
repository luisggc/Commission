import React from 'react'
import { StyleSheet, Image, View, ActivityIndicator } from 'react-native'
import ModalSelector from 'react-native-modal-selector'
import { color }, { colorNew } from '../utils/theme'
import styled from 'styled-components'



const styles = StyleSheet.create({
	text: {
		// fontSize: 13,
		color: colorschange.primary.contrastText
	},
	IconImage: {
		borderColor: colorschange.primary.main,
		borderWidth: 6,
		alignItems: 'center',
		alignSelf: 'center',
		justifyContent: 'center',
		marginRight: 10
	},
	iconImageContainer: {
		shadowOffset: { width: 1, height: 1 },
		shadowColor: 'black',
		shadowOpacity: 0.5,
		elevation: 5,
		zIndex: 20
	},
	liIcon: {
		backgroundColor: colorschange.secondary.main,
		height: 6,
		width: 6,
		marginRight: 8,
		alignSelf: 'center'
	},
	liContainer: {
		flexDirection: 'row',
		alignSelf: 'flex-start'
		// alignItems: 'center',
		// justifyContent: 'center'
	},
	buttonApp: {
		minWidth: 90,
		alignItems: 'center',
		padding: 6,
		borderRadius: 2,
		backgroundColor: colorschange.secondary.main
	},
	sep: {
		height: 1,
		backgroundColor: colorschange.secondary.main,
		marginHorizontal: 30
	},
	bigTextInput: {
		padding: 5,
		marginVertical: 5,
		height: 90,
		backgroundColor: colorschange.primary.contrastText,
		borderRadius: 5
	},
	textInput: {
		marginTop: 5,
		// height: 20,
		backgroundColor: colorschange.primary.contrastText,
		borderRadius: 5,
		padding: 5
	},
	picker: {
		backgroundColor: colorschange.primary.contrastText,
		borderRadius: 5,
		padding: 0
	},
	center: {
		flex: 1,
		alignContent: 'center',
		alignItems: 'center',
		justifyContent: 'center'
	}
})
