import color from './colors'

function rgb2hex(rgb) {
	rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i)
	return rgb && rgb.length === 4
		? '#' +
				('0' + parseInt(rgb[1], 10).toString(16)).slice(-2) +
				('0' + parseInt(rgb[2], 10).toString(16)).slice(-2) +
				('0' + parseInt(rgb[3], 10).toString(16)).slice(-2)
		: ''
}

// const primaryLightColor = rgb2hex(color.primary.light)
// const primaryLight0Color = rgb2hex(color.primary['400'])

const primaryLightColor = color.primary.light
const primaryLight0Color = color.primary['400']

console.log()
export const mapStyle = [
	{
		featureType: 'all',
		elementType: 'labels.text.fill',
		stylers: [
			{
				// color: white_pastel_transp
			}
		]
	},
	{
		featureType: 'all',
		elementType: 'labels.text.stroke',
		stylers: [
			{
				visibility: 'on'
			},
			{
				color: primaryLight0Color
			}
		]
	},
	{
		featureType: 'all',
		elementType: 'labels.icon',
		stylers: [
			{
				visibility: 'off'
			}
		]
	},
	{
		featureType: 'administrative',
		elementType: 'geometry.fill',
		stylers: [
			{
				color: primaryLight0Color
			}
		]
	},
	{
		featureType: 'administrative',
		elementType: 'geometry.stroke',
		stylers: [
			{
				color: primaryLightColor
			},
			{
				// lightness: 17
			},
			{
				weight: 1.2
			}
		]
	},
	{
		featureType: 'landscape',
		elementType: 'geometry',
		stylers: [
			{
				color: primaryLight0Color
			}
		]
	},
	{
		featureType: 'poi',
		elementType: 'geometry',
		stylers: [
			{
				color: primaryLight0Color
			},
			{
				// lightness: 21
			}
		]
	},
	{
		featureType: 'road',
		elementType: 'geometry',
		stylers: [
			{
				color: primaryLightColor
			}
		]
	},
	{
		featureType: 'road.highway',
		elementType: 'geometry.fill',
		stylers: [
			{
				color: primaryLightColor
			}
		]
	},
	{
		featureType: 'road.highway',
		elementType: 'geometry.stroke',
		stylers: [
			{
				color: primaryLightColor
			},
			{
				weight: 0.2
			}
		]
	},
	{
		featureType: 'road.arterial',
		elementType: 'geometry',
		stylers: [
			{
				color: primaryLight0Color
			},
			{
				// lightness: 18
			}
		]
	},
	{
		featureType: 'road.local',
		elementType: 'geometry',
		stylers: [
			{
				color: primaryLightColor
			},
			{
				// lightness: 16
			}
		]
	},
	{
		featureType: 'road.local',
		elementType: 'geometry.stroke',
		stylers: [
			{
				color: primaryLightColor
			}
		]
	},
	{
		featureType: 'transit',
		elementType: 'geometry',
		stylers: [
			{
				color: primaryLightColor
			},
			{
				// lightness: 19
			}
		]
	},
	{
		featureType: 'water',
		elementType: 'geometry',
		stylers: [
			{
				color: primaryLight0Color
			},
			{
				// lightness: 17
			}
		]
	}
]
