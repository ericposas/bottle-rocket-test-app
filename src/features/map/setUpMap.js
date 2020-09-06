import { restaurantNameToURLPath } from '../utils/Utils'
import { setLastRestaurantViewed, setCurrentlySelectedRestaurant } from '../main/mainSlice'
import { MAP_ZOOM_LEVEL_MIN, MAP_ZOOM_LEVEL_MAX, MAP_STYLES, LIGHT_GREEN, DARK_GREEN } from '../constants/constants'
import { mapboxKey as accessToken } from '../../api/url'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import history from 'history/browser'

export const setUpMap = (currentRestaurant, lastRestaurantViewed, apiResults, dispatch) => {

	let { name, location: { lng, lat } } = currentRestaurant

	mapboxgl.accessToken = accessToken

	console.log(lastRestaurantViewed)

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

			popupSm.on('open', () => {
				dispatch(setLastRestaurantViewed(selectedRestaurant))
				dispatch(setCurrentlySelectedRestaurant(restaurant))
				removeMarkers()
				setMarkers(restaurant)
				fly(restaurant)
				history.push(`/${restaurantNameToURLPath(restaurant)}`)
			})

			popup.on('open', () => {
				dispatch(setLastRestaurantViewed(selectedRestaurant))
				dispatch(setCurrentlySelectedRestaurant(restaurant))
				removeMarkers()
				setMarkers(restaurant)
				fly(restaurant)
				history.push(`/${restaurantNameToURLPath(restaurant)}`)
			})
		})
	}

	function fly(restaurant) {
		map.flyTo({
			center: [ restaurant.location.lng, restaurant.location.lat ],
			zoom: MAP_ZOOM_LEVEL_MAX
		})
	}

	function removeMarkers() {
		markers.forEach(marker => {
			marker.remove()
		})
		markers = []
	}

	map.on('load', () => {
		setMarkers(currentRestaurant)
		map.flyTo({
			center: [ lng, lat ],
			zoom: MAP_ZOOM_LEVEL_MAX
		})
	})

	return {
		fly,
		removeMarkers,
		setMarkers,
		markers,
		map,
	}

}
