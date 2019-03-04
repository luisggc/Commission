import styled from 'styled-components'
import React from 'react'

const ThumbContainer = styled.View`
	elevation: 5;
`
const ThumbImage = styled.Image`
	border-color: ${({ theme }) => theme.color.primary(1)};
	border-width: 6px;
	align-items: center;
	align-self: center;
	justify-content: center;
	margin-right: 10;
	height: ${p => (p.small ? '75px' : '150px')};
	width: ${p => (p.small ? '75px' : '150px')};
	border-radius: ${p => (p.small ? '37.5px' : '75px')};
`

export default props => (
	<ThumbContainer>
		<ThumbImage {...props} />
	</ThumbContainer>
)
