import React from 'react'
import InputFormat from './InputFormat'
import color from 'src/utils/theme'
import { TouchableOpacity } from 'react-native'
import { TextApp } from 'src/components/Layout'
import SectionedMultiSelect from 'react-native-sectioned-multi-select'

const MultipleSelectApp = props => (
	<SectionedMultiSelect
		styles={{ selectToggle: {} }}
		colors={{
			primary: color.primary(),
			selectToggleTextColor: color.light.contrast
		}}
		searchPlaceholderText={'Procure...'}
		removeAllText={'Remova todos'}
		selectText={'Selecione aqui'}
		confirmText={'Confirme'}
		selectedText={'selecionado(s)'}
		subKey="children"
		uniqueKey="id"
		showDropDowns={true}
		readOnlyHeadings={true}
		showDropDowns={false}
		selectChildren={true}
		searchSelectionColor={color.light.contrast}
		searchPlaceholderText={'Pesquise aqui'}
		noResultsComponent={
			<TouchableOpacity onPress={() => props.onAddPress}>
				<TextApp>
					Sem resultados para esse nome
					{/* Clique aqui para adicionar. */}
				</TextApp>
			</TouchableOpacity>
		}
		items={[
			{
				name: 'Selecione os itens ou adicione',
				id: -1,
				children: props.options
			}
		]}
		{...props}
	/>
)

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
