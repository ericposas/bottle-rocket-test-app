import React, { useEffect, Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { MapIcon, DetailView, TitleStrip, Restaurant, Margin, ViewContainer, MapContainer } from '../components/ViewComponents'
import { DETAIL_VIEW, DESKTOP_VIEW, TABLET_VIEW, MOBILE_VIEW, MAP_ZOOM_LEVEL_MIN, MAP_ZOOM_LEVEL_MAX, MAP_STYLES, LIGHT_GREEN, DARK_GREEN } from '../constants/constants'
import { Col, Row, setConfiguration } from 'react-grid-system'
import { setLayout } from '../main/mainSlice'
import { mapboxKey as accessToken } from '../../api/url'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

setConfiguration({ gutterWidth: 0 })

const View = ({ apiResults, layout }) => {

	const dispatch = useDispatch()

	const currentRestaurant = useSelector(state => state.main.currentlySelectedRestaurant)

	const view = useSelector(state => state.main.view)

	const currentLayout = useSelector(state => state.main.layout)

	const setUpMap = (currentRestaurant) => {

		let { name, location: { lng, lat } } = currentRestaurant

		mapboxgl.accessToken = accessToken

		let map = new mapboxgl.Map({
			container: 'map',
			style: MAP_STYLES._4,
			center: [ lng, lat ],
			zoom: MAP_ZOOM_LEVEL_MIN
		})

		map.on('load', () => {

			let popup = new mapboxgl.Popup({
				closeButton: false
			})
			.setHTML(`
				<div class='mapbox-popup'>
					${name}
				</div>
			`)
			.addTo(map);

			map.flyTo({
				center: [ lng, lat ],
				zoom: MAP_ZOOM_LEVEL_MAX
			})

			let marker = new mapboxgl.Marker({
				color: DARK_GREEN,
				scale: 1.5
			})
			.setLngLat([ lng, lat ])
			.addTo(map)
			.setPopup(popup);

		})

	}

	useEffect(() => {
		if (view === DETAIL_VIEW) {
			setUpMap(currentRestaurant)
		}
	}, [view, currentRestaurant])

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
											<MapContainer />
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
