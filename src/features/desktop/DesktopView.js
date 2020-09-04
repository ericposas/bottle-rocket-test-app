import React from 'react'
import { useSelector } from 'react-redux'
import { MapIcon, DetailView, TitleStrip, Restaurant } from '../components/ViewComponents'
import { TabletContainer, ColumnView } from '../components/TabletViewComponents'
import { DETAIL_VIEW, TITLE_STRIP_HEIGHT, DESKTOP_VIEW } from '../constants/constants'
import { Container, Col, Row } from 'react-grid-system'
import styled from 'styled-components'

const DesktopContainer = styled.div`
	margin-top: ${TITLE_STRIP_HEIGHT};
	overflow-x: hidden;
	overflow-y: scroll;
	height: 100vh;
`

const DesktopView = ({ view, apiResults }) => {

	const currentRestaurant = useSelector(state => state.main.currentlySelectedRestaurant)

	return (
		<>
			{
				apiResults
				?
					<>
						<DesktopContainer>
								<Row>
								{
									apiResults.map((restaurant, i) => (
										<>
											<Col key={i} sm={4}>
												<Restaurant
													restaurant={restaurant}
													layout={DESKTOP_VIEW}
												/>
											</Col>
										</>
									))
								}
								</Row>
							</DesktopContainer>
							{
								currentRestaurant && view === DETAIL_VIEW
								? <DetailView currentRestaurant={currentRestaurant} /> : null
							}
						<TitleStrip displayBackArrow={ view === DETAIL_VIEW ? true : false } />
						{ view === DETAIL_VIEW ? <MapIcon /> : null }
					</>
				: null
			}
		</>
	)
}

export default DesktopView
