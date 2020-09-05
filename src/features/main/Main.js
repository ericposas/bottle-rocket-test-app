import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'
import { getFood } from './mainSlice'
import { DetailView, MapContainer, TitleStrip, MapIcon } from '../components/ViewComponents'
import { DESKTOP_LAYOUT, TABLET_LAYOUT, MOBILE_LAYOUT, DETAIL_VIEW } from '../constants/constants'
import View from '../components/View'
import { setUpMap } from '../map/setUpMap'

const Desktop = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: 992 })
  return isDesktop ? children : null
}

const Tablet = ({ children }) => {
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 })
  return isTablet ? children : null
}

const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 })
  return isMobile ? children : null
}

const Main = () => {

	const dispatch = useDispatch()

	const view = useSelector(state => state.main.view)

	const apiResults = useSelector(state => state.main.apiResults)

	const currentRestaurant = useSelector(state => state.main.currentlySelectedRestaurant)

	const lastRestaurantViewed = useSelector(state => state.main.lastRestaurantViewed)

	useEffect(() => {
		if (view === DETAIL_VIEW) {
			setUpMap(currentRestaurant, lastRestaurantViewed ? lastRestaurantViewed : null, apiResults, dispatch)
		}
	}, [view, apiResults, dispatch])

	useEffect(() => {
		dispatch(getFood())
	}, [dispatch])

	return (
		<>
			<Desktop>
				<View layout={DESKTOP_LAYOUT} apiResults={apiResults} />
			</Desktop>
			<Tablet>
				<View layout={TABLET_LAYOUT} apiResults={apiResults} />
			</Tablet>
			<Mobile>
				<View layout={MOBILE_LAYOUT} apiResults={apiResults} />
			</Mobile>
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
	)

}

export default Main
