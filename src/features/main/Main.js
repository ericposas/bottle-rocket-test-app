import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'
import { getFood, setViewType, setCurrentlySelectedRestaurant } from './mainSlice'
import { DetailView, MapContainer, TitleStrip, MapIcon } from '../components/ViewComponents'
import { DESKTOP_LAYOUT, TABLET_LAYOUT, MOBILE_LAYOUT, DETAIL_VIEW, LIST_VIEW, TITLE_STRIP_HEIGHT } from '../constants/constants'
import View from '../components/View'
import { setUpMap } from '../map/setUpMap'
import { motion, AnimatePresence } from 'framer-motion'
import history from 'history/browser'

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

		window.onpopstate = () => {
			console.log(history.location)
			// if (history.location.pathname === '/') {
				history.push('/')
				dispatch(setViewType(LIST_VIEW))
			// }
		}
	}, [dispatch])

	return (
		<>
			<AnimatePresence>
				<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 1 }}
				>
					<Desktop>
					<View layout={DESKTOP_LAYOUT} apiResults={apiResults} />
					</Desktop>
					<Tablet>
					<View layout={TABLET_LAYOUT} apiResults={apiResults} />
					</Tablet>
					<Mobile>
					<View layout={MOBILE_LAYOUT} apiResults={apiResults} />
					</Mobile>
				</motion.div>
			</AnimatePresence>
			<AnimatePresence>
			{
				currentRestaurant && view === DETAIL_VIEW
				?
				<motion.div
				initial={{ x: '-100vw' }}
				animate={{ x: 0 }}
				transition={{ duration: .5 }}
				exit={{ x: '-100vw' }}
				>
				<div style={{ top: '-100vh', position: 'absolute' }}>
					<div style={{ marginTop: TITLE_STRIP_HEIGHT }}>
					<DetailView currentRestaurant={currentRestaurant}>
						<MapContainer />
					</DetailView>
					</div>
				</div>
				</motion.div>
				: null
			}
			</AnimatePresence>
			<TitleStrip displayBackArrow={ view === DETAIL_VIEW ? true : false } />
			{ view === DETAIL_VIEW ? <MapIcon /> : null }
		</>
	)

}

export default Main
