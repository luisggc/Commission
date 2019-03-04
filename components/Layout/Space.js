import React from 'react'
import { View } from 'react-native'

export default function Space(props) {
	const dp = {
		m: 'margin',
		mv: 'marginVertical',
		mh: 'marginHorizontal',
		mt: 'marginTop',
		mb: 'marginBottom',
		mr: 'marginRight',
		ml: 'marginLeft',
		p: 'padding',
		pv: 'paddingVertical',
		ph: 'paddingHorizontal',
		pt: 'paddingTop',
		pb: 'paddingBottom',
		pr: 'paddingRight',
		pl: 'paddingLeft',
		fd: 'flexDirection'
	}
	const dp_styles = Object.keys(props).reduce((previous, current) => {
		return dp[current]
			? {
					...previous,
					[dp[current]]: props[current]
					// typeof props[current] == 'number' ? 6
					// 	: props[current]
			  }
			: previous
	}, {})

	const standAloneProps = {
		...(props.alignItemsCenter ? { alignItems: 'center' } : null)
	}

	let passedProps = { ...props }
	;['alignItemsCenter'].forEach(e => delete passedProps[e])

	const styles = {
		...(dp_styles.flexDirection ? { display: 'flex' } : null),
		...standAloneProps,
		...dp_styles,
		...props.styles
	}

	return <View {...passedProps} style={styles} />
}
