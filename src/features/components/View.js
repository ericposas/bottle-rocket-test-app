import React, { useEffect, Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { MapIcon, DetailView, TitleStrip, Restaurant, Margin, ViewContainer } from '../components/ViewComponents'
import { DETAIL_VIEW, DESKTOP_VIEW, TABLET_VIEW, MOBILE_VIEW, MAP_ZOOM_LEVEL, MAP_STYLES } from '../constants/constants'
import { Col, Row, setConfiguration } from 'react-grid-system'
import { setLayout } from '../main/mainSlice'
import { mapboxKey as accessToken } from '../../api/url'
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl'

setConfiguration({ gutterWidth: 0 })

const Map = ReactMapboxGl({ accessToken })

const View = ({ apiResults, layout }) => {

	const dispatch = useDispatch()

	const currentRestaurant = useSelector(state => state.main.currentlySelectedRestaurant)

	const view = useSelector(state => state.main.view)

	const currentLayout = useSelector(state => state.main.layout)

	const mapRef = React.useRef(null)

	useEffect(() => {
		dispatch(setLayout(layout))
	}, [layout, dispatch, currentRestaurant])

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
								?
									<>
										<DetailView currentRestaurant={currentRestaurant}>
											<Map
												zoom={[ MAP_ZOOM_LEVEL ]}
												center={[ currentRestaurant.location.lng, currentRestaurant.location.lat ]}
												style={ 'https://raw.githubusercontent.com/mapbox/mapbox-gl-styles/master/styles/bright-v9.json' }
												containerStyle={{
													width: '100vw',
													height: '400px',
												}}
												>
												<Layer
													type='symbol'
													id='marker'
													layout={{
														'icon-image': 'star-15',
														'icon-size': 2.5
													}}
													>
													<Feature coordinates={[ currentRestaurant.location.lng, currentRestaurant.location.lat ]} />
												</Layer>
											</Map>
										</DetailView>
									</>
								: null
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
