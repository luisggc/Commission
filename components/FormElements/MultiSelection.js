import React from 'react'
import { MultipleSelectApp } from '../Layout'

export default function MultiSelection() {
	return (
		<InputFormat key={key} name={name}>
			<MultipleSelectApp
				options={options}
				selectedItems={value}
				onSelectedItemsChange={values => this.formChange(key, values)}
				onAddPress={() => this.addOptions(key, 'oi')}
			/>
		</InputFormat>
	)
}
