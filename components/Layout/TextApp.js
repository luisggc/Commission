import styled from 'styled-components'

export default (TextApp = styled.Text`
	color: ${p =>
		p.primary
			? p.theme.color.primary(0)
			: p.secondary
			? p.theme.color.secondary(0)
			: p.dark
			? p.lowContrast
				? p.theme.color.dark.lowContrast
				: p.highContrast
				? p.theme.color.dark.highContrast
				: p.disabled
				? p.theme.color.dark.disabled
				: p.theme.color.dark.contrast
			: p.lowContrast
			? p.theme.color.light.lowContrast
			: p.highContrast
			? p.theme.color.light.highContrast
			: p.disabled
			? p.theme.color.light.disabled
			: p.placeholder
			? p.theme.color.light.placeholder
			: p.theme.color.light.contrast};
`)

// ${p => p.primary ? p.theme.color.primary(0):
// 	p.secondary ? p.theme.color.secondary(0):
// 	p.dark ? (
// 		p.lowContrast ? p.theme.color.dark.lowContrast :
// 		p.highContrast ? p.theme.color.dark.highContrast :
// 		p.disabled ? p.theme.color.dark.disabled :
// 		p.theme.color.dark.contrast
// 	):
// 	p.lowContrast ? p.theme.color.light.lowContrast :
// 	p.highContrast ? p.theme.color.light.highContrast :
// 	p.disabled ? p.theme.color.light.disabled :
// 	p.theme.color.light.contrast
