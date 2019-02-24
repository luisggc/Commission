import React from 'react'
import { MultipleSelectApp } from '../Layout'
import InputFormat from './InputFormat'
// import SectionedMultiSelect from 'react-native-sectioned-multi-select'
// import color from 'src/utils/colors'

export default function MultiSelection(props) {
	const { name, options, value } = props
	return (
		<InputFormat name={name}>
			<MultipleSelectApp
				options={options}
				selectedItems={value}
				onSelectedItemsChange={values => this.formChange(key, values)}
				onAddPress={() => this.addOptions(key, 'oi')}
			/>
		</InputFormat>
	)
}

/* <SectionedMultiSelect
		styles={{
			selectToggle: {
				// borderRadius: 5,
				// padding: 5,
				// marginBottom: 5,
				// color: color.text.primary
			}
		}}
		colors={{
			primary: color.primary.main,
			selectToggleTextColor: color.primary.contrastText
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
		searchSelectionColor={color.primary.contrastText}
		searchPlaceholderText={'Pesquise aqui'}
		noResultsComponent={
			<TouchableOpacity onPress={() => props.onAddPress}>
				<TextApp secondary>
					Sem resultados para esse nome
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
	/> */
