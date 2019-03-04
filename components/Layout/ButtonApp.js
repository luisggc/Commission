import styled from 'styled-components'
import React from 'react'
import { TextApp } from '.'

export const ButtonAppOnly = styled.TouchableOpacity`
	min-width: 90;
	align-items: center;
	padding: 10px;
	border-radius: 2;
	background-color: ${p => (p.primary ? p.theme.color.primary() : p.theme.color.secondary(0))};
`

export default ButtonApp = props => {
	const { text, children, ...buttonProps } = props
	const textProps = text ? text : { dark: true }
	return (
		<ButtonAppOnly {...buttonProps}>
			<TextApp {...textProps}>{children}</TextApp>
		</ButtonAppOnly>
	)
}
