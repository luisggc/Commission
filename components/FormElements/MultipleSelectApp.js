import React from 'react'

export default function MultipleSelectApp() {
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
