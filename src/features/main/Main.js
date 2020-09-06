import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'
import { getFood, setAPIresults, setViewType, setLayout, setCurrentlySelectedRestaurant, goBackOneLastRestaurant } from './mainSlice'
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

	const apiResultsAsObject = useSelector(state => state.main.apiResultsAsObject)

	const currentRestaurant = useSelector(state => state.main.currentlySelectedRestaurant)

	const lastRestaurantViewed = useSelector(state => state.main.lastRestaurantViewed)

	const myRef = React.useRef(0)

	const mapRef = React.useRef(null)

	const handleMapMove = currentRestaurant => {
		if (mapRef.current) {
			mapRef.current.removeMarkers()
			mapRef.current.setMarkers(currentRestaurant)
			mapRef.current.fly(currentRestaurant)
		}
	}

	useEffect(() => {
		if (apiResults.length < 1) {
			dispatch(getFood())
		}
		if (mapRef.current === null) {
			if (currentRestaurant) {
				mapRef.current = setUpMap(currentRestaurant, lastRestaurantViewed ? lastRestaurantViewed : null, apiResults, dispatch)
				console.log(mapRef.current)
			}
		}
		window.onpopstate = () => {
			console.log(history.location)
			let { location: { pathname } } = history
			let cleanPathname = pathname.replace(/\//g, '')
			if (pathname === '/') {
				history.push('/')
				dispatch(setViewType(LIST_VIEW))
			} else {
				handleMapMove(apiResultsAsObject[cleanPathname])
				dispatch(setCurrentlySelectedRestaurant(apiResultsAsObject[cleanPathname]))
			}
		}
	}, [view, currentRestaurant, apiResults, dispatch])

	useEffect(() => {
		myRef.current += 1
		console.log(myRef, mapRef)
	})

	return (
		<>
			<AnimatePresence>
				<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 1 }}
				>
					<Desktop>
						<View handleMapMove={handleMapMove} layout={DESKTOP_LAYOUT} apiResults={apiResults} />
					</Desktop>
					<Tablet>
						<View handleMapMove={handleMapMove} layout={TABLET_LAYOUT} apiResults={apiResults} />
					</Tablet>
					<Mobile>
						<View handleMapMove={handleMapMove} layout={MOBILE_LAYOUT} apiResults={apiResults} />
					</Mobile>
				</motion.div>
			</AnimatePresence>
			<AnimatePresence>
			{
				<motion.div
				initial={{ x: '-100vw' }}
				animate={{
					x:
					view === DETAIL_VIEW ? 0
					: view === LIST_VIEW ? '-100vw' : 0
				}}
				transition={{ duration: .75 }}
				>
					<div style={{ top: '-100vh', position: 'absolute' }}>
						<div style={{ marginTop: TITLE_STRIP_HEIGHT }}>
						<DetailView currentRestaurant={currentRestaurant}>
							<MapContainer />
						</DetailView>
						</div>
					</div>
				</motion.div>
			}
			</AnimatePresence>
			<TitleStrip displayBackArrow={ view === DETAIL_VIEW ? true : false } />
			{ view === DETAIL_VIEW ? <MapIcon /> : null }
		</>
	)

}

export default Main
