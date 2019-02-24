import React from 'react'

export default function Selection() {
	return (
		<InputFormat key={key} name={name}>
			{Platform.OS === 'ios' ? (
				<ModalSelector
					data={options}
					initValue={placeholder}
					onChange={values => this.formChange(key, values.key)}
				>
					<TextInput
						style={styles.textInput}
						editable={false}
						placeholder={placeholder}
						value={value}
					/>
				</ModalSelector>
			) : (
				<Picker
					style={{
						color: color.primary.contrastText,
						height: 23
					}}
					selectedValue={value}
					onValueChange={values => this.formChange(key, values)}
				>
					{options.map(option => (
						<Picker.Item key={option.key} label={option.label} value={option.key} />
					))}
				</Picker>
			)}
		</InputFormat>
	)
}
