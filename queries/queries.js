import { gql } from 'apollo-boost'

export const getEventsQuery = gql`
	query GetEvents($location: [Float]) {
		events(location: $location) {
			_id
			avatar
			name
			host
			description
			distance
			location {
				coordinates
			}
		}
	}
`
export const getEventQuery = gql`
	query GetEvent($_id: ID!) {
		event(_id: $_id) {
			_id
			avatar
			eventDate
			name
			host
			description
			creator {
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
