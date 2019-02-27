import React from 'react'
import { MultipleSelectApp } from '../Layout'
import InputFormat from './InputFormat'

export default function MultiSelection(iprops) {
	let { options, selectedItems, onPress, ...props } = iprops
	options = optionsFormatter(options)
	console.log('options', options)
	return (
		<InputFormat name={props.name}>
			<MultipleSelectApp
				options={options}
				selectedItems={selectedItems}
				onSelectedItemsChange={newValues => onPress('assistances', newValues)}
				{...props}
			/>
		</InputFormat>
	)
}

function optionsFormatter(array) {
	return Array.isArray(array)
		? array.reduce((accumulator, name) => {
				accumulator.push({
					id: name,
					name,
					key: name,
					label: name
				})
				return accumulator
		  }, [])
		: []
}
