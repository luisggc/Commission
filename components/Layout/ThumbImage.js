import styled from 'styled-components'
import React from 'react'

export default styled.Image`
	border-color: ${({ theme }) => theme.color.light.contrast};
	border-width: 1px;
	align-items: center;
	align-self: center;
	justify-content: center;
	margin-right: 10;
	height: ${p => (p.small ? '60px' : '150px')};
	width: ${p => (p.small ? '60px' : '150px')};
	/* border-radius: ${p => (p.small ? '37.5px' : '75px')}; */
	border-radius: ${p => (p.small ? '30px' : '75px')};
`