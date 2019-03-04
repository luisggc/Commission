import React from 'react'
import TextApp from './TextApp'
import styled from 'styled-components'

const Li = ({ items = [] }) => {
	return items.map((item, index) => {
		return (
			<LiContainer key={index}>
				<LiIcon />
				<TextApp>{item}</TextApp>
			</LiContainer>
		)
	})
}

export default Li

const LiIcon = styled.View`
	background-color: ${({ theme }) => theme.color.primary()};
	height: 6px;
	width: 6px;
	margin-right: 8px;
	align-self: center;
`

const LiContainer = styled.View`
	flex-direction: row;
	align-self: flex-start;
`
