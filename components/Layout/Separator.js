import styled from 'styled-components'

export default styled.View`
	height: 1px;
	background-color: ${({ theme }) => theme.color.secondary()};
	margin: 0 30px;
`
