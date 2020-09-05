import React, { useEffect, Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { MapIcon, DetailView, TitleStrip, Restaurant, Margin, ViewContainer, MapContainer } from '../components/ViewComponents'
import { DETAIL_VIEW, DESKTOP_VIEW, TABLET_VIEW, MOBILE_VIEW, MAP_ZOOM_LEVEL_MIN, MAP_ZOOM_LEVEL_MAX, MAP_STYLES, LIGHT_GREEN, DARK_GREEN } from '../constants/constants'
import { Col, Row, setConfiguration } from 'react-grid-system'
import { setLayout, setLastRestaurantViewed, setCurrentlySelectedRestaurant } from '../main/mainSlice'
import { mapboxKey as accessToken } from '../../api/url'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

setConfiguration({ gutterWidth: 0 })

const View = ({ apiResults, layout }) => {

	const dispatch = useDispatch()

	const lastRestaurantViewed = useSelector(state => state.main.lastRestaurantViewed)

	const currentRestaurant = useSelector(state => state.main.currentlySelectedRestaurant)

	const view = useSelector(state => state.main.view)

	const currentLayout = useSelector(state => state.main.layout)

	const setUpMap = (currentRestaurant, lastRestaurantViewed, apiResults, dispatch) => {

		let { name, location: { lng, lat } } = currentRestaurant

		mapboxgl.accessToken = accessToken

		console.log(
			lastRestaurantViewed
		)

		let map = new mapboxgl.Map({
			container: 'map',
			style: MAP_STYLES._4,
			center: (
				lastRestaurantViewed
				? [ lastRestaurantViewed.location.lng, lastRestaurantViewed.location.lat ]
				: [ lng, lat ]
			),
			zoom: MAP_ZOOM_LEVEL_MAX,
			minZoom: MAP_ZOOM_LEVEL_MIN,
			maxZoom: MAP_ZOOM_LEVEL_MAX,
		})

		map.on('load', () => {

			let markers = []

			function setMarkers(selectedRestaurant) {
				apiResults.forEach(restaurant => {
					let {
						name: _name,
						location: {
							lat: _lat, lng: _lng
						}
					} = restaurant

					let popup = new mapboxgl.Popup({ closeButton: false })
					.setHTML(`<div class='mapbox-popup'>${_name}</div>`)
					.addTo(map)

					let popupSm = new mapboxgl.Popup({ closeButton: false })
					.setHTML(`<div class='mapbox-popup-minor'>${_name}</div>`)
					.addTo(map)

					console.log(
						// _name,
						selectedRestaurant.name
					)

					if (_name !== selectedRestaurant.name) {
						let marker = new mapboxgl.Marker({ color: LIGHT_GREEN, scale: .75 })
						.setLngLat([ _lng, _lat ])
						.addTo(map)
						.setPopup(popupSm)
						marker.togglePopup()
						markers.push(marker)
					} else {
						let mainMarker = new mapboxgl.Marker({ color: DARK_GREEN, scale: 1.5 })
						.setLngLat([ _lng, _lat ])
						.addTo(map)
						.setPopup(popup)
						markers.push(mainMarker)
					}

					// map.on('moveend', () => { setMarkers(selectedRestaurant) })

					popupSm.on('open', () => {
						dispatch(setLastRestaurantViewed(selectedRestaurant))
						dispatch(setCurrentlySelectedRestaurant(restaurant))
						removeMarkers()
						setMarkers(restaurant)
						map.flyTo({
							center: [ restaurant.location.lng, restaurant.location.lat ],
							zoom: MAP_ZOOM_LEVEL_MAX
						})
					})

					popup.on('open', () => {
						dispatch(setLastRestaurantViewed(selectedRestaurant))
						dispatch(setCurrentlySelectedRestaurant(restaurant))
						removeMarkers()
						setMarkers(restaurant)
						map.flyTo({
							center: [ restaurant.location.lng, restaurant.location.lat ],
							zoom: MAP_ZOOM_LEVEL_MAX
						})
					})
				})
			}

			function removeMarkers() {
				markers.forEach(marker => {
					console.log(marker)
					marker.remove()
				})
			}

			setMarkers(currentRestaurant)

			map.flyTo({
				center: [ lng, lat ],
				zoom: MAP_ZOOM_LEVEL_MAX
			})

		})

	}

	useEffect(() => {
		if (view === DETAIL_VIEW) {
			setUpMap(currentRestaurant, lastRestaurantViewed ? lastRestaurantViewed : null, apiResults, dispatch)
		}
	}, [view, apiResults, dispatch])

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
