// https://coolors.co/313536-468189-fca311-007acc-f0f0f2

const lightBackground = '#F0F0F2'
const darkBackground = '#313536'

const lowContrastLight = '#DCE3E4'
const lowContrastDark = '#535A5C'

const placeholderLight = '#D4DCDD'

const contrastLight = lowContrastDark
const contrastDark = lowContrastLight
const highContrastLight = darkBackground
const highContrastDark = lightBackground

//Denotative Colors
const error = '#D43B3B'
const success = '#2FD6B4'
const disabledLight = '#BABABC'
const disabledDark = '#626667'

const color = {
	primary: (degree = 0) => {
		const palette = {
			'-2': '#00385D',
			'-1': '#0064A7',
			'0': '#007ACC',
			'1': '#2E92D5',
			'2': '#5CAADE'
		}
		return palette[degree]
	},
	secondary: (degree = 0) => {
		const palette = {
			'-2': '#28AC91',
			'-1': '#2CBFA1',
			'0': '#CF860E',
			'1': '#42D6B8',
			'2': '#55DABF'
		}
		return palette[degree]
	},
	light: {
		background: lightBackground,
		contrast: contrastLight,
		lowContrast: lowContrastLight,
		highContrast: highContrastLight,
		disabled: disabledLight,
		placeholder: placeholderLight
	},
	dark: {
		background: darkBackground,
		contrast: contrastDark,
		lowContrast: lowContrastDark,
		highContrast: highContrastDark,
		disabled: disabledDark
	},
	interactive: (degree = 0) => {
		const palette = {
			'-2': '#0F4F79',
			'-1': '#215F94',
			'0': '#298ED0',
			'1': '#62ACE1',
			'2': '#87C2EB'
		}
		return palette[degree]
	},
	error,
	success
}

const theme = {
	color
}

export { color, theme as default }
