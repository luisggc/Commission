import { newColor } from '../../utils/colors'

const { lowContrast, background } = newColor.light

export default mapStyle = [
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
				color: lowContrast
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
				color: lowContrast
			}
		]
	},
	{
		featureType: 'administrative',
		elementType: 'geometry.stroke',
		stylers: [
			{
				color: background
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
				color: lowContrast
			}
		]
	},
	{
		featureType: 'poi',
		elementType: 'geometry',
		stylers: [
			{
				color: lowContrast
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
				color: background
			}
		]
	},
	{
		featureType: 'road.highway',
		elementType: 'geometry.fill',
		stylers: [
			{
				color: background
			}
		]
	},
	{
		featureType: 'road.highway',
		elementType: 'geometry.stroke',
		stylers: [
			{
				color: background
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
				color: lowContrast
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
				color: background
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
				color: background
			}
		]
	},
	{
		featureType: 'transit',
		elementType: 'geometry',
		stylers: [
			{
				color: background
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
				color: lowContrast
			},
			{
				// lightness: 17
			}
		]
	}
]
