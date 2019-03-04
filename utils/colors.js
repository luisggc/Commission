// https://material.io/tools/color/#!/?view.left=1&view.right=1&secondary.color=007ACC&primary.color=333333&primary.text.color=ffffff&secondary.text.color=ffffff
// https://material.io/design/color/the-color-system.html#tools-for-picking-colors

import { createMuiTheme } from '@material-ui/core/styles'
import colorconv from './color_converter'
import materialpalette from 'material-palette'

function getPalette(hex) {
	const color50 = colorconv.HEX2HSL(hex)
	let pallette = materialpalette({ h: color50[0], s: color50[1], l: color50[2] })
	Object.keys(pallette).map(color => {
		const { h, s, l } = pallette[color]
		pallette[color] = '#' + colorconv.HSL2HEX([h, s, l])
		return
	})
	return pallette
}

const primaryColor = '#333333'
const primaryPalette = getPalette(primaryColor)
const primaryLightTextColor = primaryPalette['100'] //'#929498'
const primaryLight0Color = primaryPalette['400'] //'#383A3D'
const secondaryColor = '#007acc'

const color = createMuiTheme({
	palette: {
		primary: {
			main: primaryColor,
			contrastLightText: primaryLightTextColor,
			...primaryPalette
		},
		secondary: { main: secondaryColor }
	},
	typography: {
		useNextVariants: true
	}
}).palette

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


// https://coolors.co/313536-468189-fca311-007acc-f0f0f2

const newColor = {
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
	interactive: degree => {
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
	color: newColor
}

export { newColor, color as default, theme }
