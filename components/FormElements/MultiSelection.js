import React from 'react'
import { MultipleSelectApp } from '../Layout'
import InputFormat from './InputFormat'

export default function MultiSelection(iprops) {
	let { options, selectedItems, onPress, field, ...props } = iprops
	options = optionsFormatter(options)
	return (
		<InputFormat name={props.name}>
			<MultipleSelectApp
				options={options}
				selectedItems={selectedItems}
				onSelectedItemsChange={newValues => onPress(field, newValues)}
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
