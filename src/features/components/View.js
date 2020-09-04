import React, { useEffect, Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { MapIcon, DetailView, TitleStrip, Restaurant, Margin, ViewContainer } from '../components/ViewComponents'
import { DETAIL_VIEW, DESKTOP_VIEW, TABLET_VIEW, MOBILE_VIEW } from '../constants/constants'
import { Col, Row, setConfiguration } from 'react-grid-system'
import { setLayout } from '../main/mainSlice'

setConfiguration({ gutterWidth: 0 })

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
						<ViewContainer>
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
							</ViewContainer>
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
