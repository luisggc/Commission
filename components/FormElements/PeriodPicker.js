import React, { Component } from 'react'
import { TextInput, StyleSheet, View } from 'react-native'
import { color } from '../../utils/theme'
import InputFormat from './InputFormat'
import Selection from './Selection'
import InputText from './InputText'

export default class PeriodPicker extends Component {
	constructor(props) {
		super(props)
		this.state = { count: 0, unit: 60 }
		this.changeSelection = this.changeSelection.bind(this)
		this.changeInput = this.changeInput.bind(this)
	}

	changeInput(e) {
		this.setState({ count: parseInt(e.nativeEvent.text) })
		this.props.onChange(this.state.unit * this.state.count)
	}

	changeSelection(selection) {
		const conversion = {
			minutos: 1,
			horas: 60,
			dias: 60 * 24,
			semanas: 7 * 24 * 60,
			meses: 30 * 24 * 60,
			anos: 365 * 24 * 60
		}
		this.setState({
            unit: conversion[selection],
            unit_name: selection
		})
		this.props.onChange(this.state.unit * this.state.count)
	}

	render() {
		const { name, value, placeholder, onChange } = this.props
		console.log(this.state)
		return (
			<InputFormat name={name} noBorder>
            <View style={{ display: 'flex', flexDirection: 'row' }} >
				<InputText
					placeholder={'1'}
					onChange={this.changeInput}
					keyboardType="numeric"
					maxLength={4}
                    style={{height: 23}}
				/>
				<Selection
					options={['minutos', 'horas', 'dias', 'semanas', 'meses', 'anos']}
					value={this.state.unit_name}
					onChange={this.changeSelection}
				/>
                </View>
			</InputFormat>
		)
	}
}

const styles = StyleSheet.create({
	textInput: {
		color: color.light.contrast,
		fontSize: 15
	}
})
