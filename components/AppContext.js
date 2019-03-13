import React from 'react'
const AppPureContext = React.createContext({})
const AppProvider = AppPureContext.Provider
const AppConsumer = AppPureContext.Consumer

export const StateApp = Component => {
	return (WrappedComponent = props => {
		return (
			<AppConsumer>{contextApp => <Component contextApp={contextApp} {...props} />}</AppConsumer>
		)
	})
}

export { AppProvider, AppConsumer, StateApp as default }
