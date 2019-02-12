import { gql } from 'apollo-boost'

export const getEventsQuery = gql`
	{
		events {
			id
			name
			host
			description
		}
	}
`
export const getEventQuery = gql`
	query GetEvent($id: ID) {
		event(id: $id) {
			id
			name
			host
			description
			user {
				name
			}
			assistances {
				users {
					name
				}
			}
		}
	}
`
