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
export default color

/*
export const white = '#EFF2F7'
export const white_pastel = '#EFF2F7'
// export const white_pastel = '#F5F5F5'
export const white_pastel_transp ='rgba(245, 245, 245,.8)'
// export const dark_blue = '#101727' início
export const dark_blue = '#282a2d'
// export const brown = '#707070'
export const brown = '#383a3e'
// export const dark_blue = '#272a3b'
export const brown_blue = '#282a2d'
export const black = '#383a3e'

export const gray_secondary= '#929498'
export const white_transp = '#41444a' //rgba(255, 255, 255, 0.15)'
export const orange = '#F5706C'
export const green = '#49BEAD'
export const red= '#ED7176'
export const gray = '#2D3239'

export const primaryLightColor = '#5c5c5c'

export const primaryDarkColor = '#0c0c0c'
export const secondaryLightColor = '#5ca9ff'
export const secondaryDarkColor = '#004f9b'

export const primaryTextColor = '#ffffff'
export const secondaryTextColor = '#ffffff'

let styled = {
    primary: {
      '-1': "asd",
      0: '#fff',
      1: '#f1',
      2:'#f1dsd',
    }
  }
*/