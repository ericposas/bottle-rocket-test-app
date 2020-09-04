import React, { useEffect, Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { MapIcon, DetailView, TitleStrip, Restaurant } from '../components/ViewComponents'
import { TabletContainer, ColumnView } from '../components/TabletViewComponents'
import { DETAIL_VIEW, TITLE_STRIP_HEIGHT, DESKTOP_VIEW, TABLET_VIEW, MOBILE_VIEW } from '../constants/constants'
import { Container, Col, Row, setConfiguration } from 'react-grid-system'
import { setLayout } from '../main/mainSlice'
import styled from 'styled-components'

setConfiguration({ gutterWidth: 0 })

const Margin = styled.div`
	width: 100vw;
	height: ${TITLE_STRIP_HEIGHT};
`

const DesktopContainer = styled.div`
	overflow-x: hidden;
	overflow-y: scroll;
	height: 100vh;
`

const View = ({ apiResults, layout }) => {

	const dispatch = useDispatch()

	const currentRestaurant = useSelector(state => state.main.currentlySelectedRestaurant)

	const view = useSelector(state => state.main.view)

	const currentLayout = useSelector(state => state.main.layout)

	useEffect(() => {
		dispatch(setLayout(layout))
	}, [layout, dispatch])

	return (
		<>
			{
				apiResults
				?
					<>
						<DesktopContainer>
								<Margin />
								<Row>
								{
									apiResults.map((restaurant, i) => {
										let props = {}
										if (currentLayout === DESKTOP_VIEW) { props.sm = 4 }
										if (currentLayout === TABLET_VIEW) { props.md = 6 }
										if (currentLayout === MOBILE_VIEW) { props.lg = 12 }
										return (
											<Fragment key={i}>
												<Col { ...props }>
													<Restaurant
														restaurant={restaurant}
														layout={currentLayout}
														/>
												</Col>
											</Fragment>
										)
									})
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

export default View
