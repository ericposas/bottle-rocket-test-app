import React from 'react'
import { TITLE_STRIP_HEIGHT, TABLET_VIEW } from '../constants/constants'
import { Restaurant } from '../components/ViewComponents'
import styled from 'styled-components'

export const ColumnView = ({ apiResults }) => (
	<>
		<ColumnLeft>
			{
				apiResults
				.filter((restaurant, i) => i % 2 === 0)
				.map((restaurant, i) => {
					return (
						<Row key={i}>
							<Column>
								<Restaurant
									restaurant={restaurant}
									layout={TABLET_VIEW}
									/>
							</Column>
						</Row>
					)
				})
			}
		</ColumnLeft>
		<ColumnRight>
			{
				apiResults
				.filter((restaurant, i) => i % 2 === 1)
				.map((restaurant, i) => {
					return (
						<Row key={i}>
							<Column>
								<Restaurant
									restaurant={restaurant}
									layout={TABLET_VIEW}
									/>
							</Column>
						</Row>
					)
				})
			}
		</ColumnRight>
	</>
)

export const ColumnLeft = styled.div`
	margin-top: ${TITLE_STRIP_HEIGHT};
	height: 0px;
`

export const ColumnRight = styled.div`
	float: right;
	height: 0px;
`

export const TabletContainer = styled.div`
	height: 100vh;
	overflow-y: scroll;
`

export const Row = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	width: 100%;
`

export const Column = styled.div`
	display: flex;
	flex-direction: column;
	flex-basis: 100%;
	flex: 1;
`
