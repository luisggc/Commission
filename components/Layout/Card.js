import React from 'react'
import { color } from 'src/utils/theme'
import {
	ScrollView,
	View,
	StyleSheet,
	TouchableOpacity,
	KeyboardAvoidingView
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import TextApp from './TextApp'
import Separator from './Separator'
import { withNavigation } from 'react-navigation'
import styled from 'styled-components'

const Card = props => {
	const pad = props.padding ? { paddingHorizontal: 23, paddingTop: 15 } : {}

	const { style, navigation, children, headerTitle, goTo } = props
	return (
		<KeyboardAvoidingView behavior={'position'} style={{ flex: 1 }} keyboardVerticalOffset={40}>
			<ScrollView contentContainerStyle={[style, styles.container, pad]} nestedScrollEnabled>
				<TouchableOpacity
					onPress={() => (goTo ? navigation.navigate(goTo) : navigation.goBack(null))}
					style={styles.backButton}
				>
					<Ionicons style={{ color: color.light.contrast }} size={40} name="ios-arrow-back" />
				</TouchableOpacity>

				{headerTitle ? (
					<View>
						<View style={styles.headerTitle}>
							<TextApp style={{ fontSize: 25 }}>{headerTitle}</TextApp>
						</View>
						<Separator style={{ marginBottom: 10 }} />
					</View>
				) : null}

				<View>{children}</View>
			</ScrollView>
		</KeyboardAvoidingView>
	)
}

const styles = StyleSheet.create({
	container: {
		paddingTop: 5,
		paddingBottom: 10,
		flexGrow: 1
	},
	backButton: {
		position: 'absolute',
		left: 0,
		top: 0,
		paddingVertical: 10,
		paddingHorizontal: 20,
		zIndex: 10
	},
	headerTitle: {
		marginBottom: 20,
		marginTop: 10,
		alignSelf: 'center'
	}
})

export default withNavigation(Card)
