import React, { useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'
import { useDispatch, useSelector, batch } from 'react-redux'
import { getFood, setViewType, setCurrentlySelectedRestaurant, setLayout } from './mainSlice'
import { DESKTOP_LAYOUT, TABLET_LAYOUT, MOBILE_LAYOUT, DETAIL_VIEW, LIST_VIEW, TITLE_STRIP_HEIGHT } from '../constants/constants'
import { DetailView, MapContainer, TitleStrip, MapIcon } from '../components/ViewComponents'
import View from '../components/View'
import { Desktop, Tablet, Mobile } from '../utils/Utils'
import { motion, AnimatePresence } from 'framer-motion'
import { setUpMap } from '../map/setUpMap'
import history from 'history/browser'

const Main = () => {

	const isDesktop = useMediaQuery({ minWidth: 992 })

	const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 })

	const isMobile = useMediaQuery({ maxWidth: 767 })

	const dispatch = useDispatch()

	const view = useSelector(state => state.main.view)

	const apiResults = useSelector(state => state.main.apiResults)

	const apiResultsAsObject = useSelector(state => state.main.apiResultsAsObject)

	const currentRestaurant = useSelector(state => state.main.currentlySelectedRestaurant)

	const lastRestaurantViewed = useSelector(state => state.main.lastRestaurantViewed)

	const currentLayout = useSelector(state => state.main.layout)

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
		let { location: { pathname } } = history
		let cleanPathname = pathname.replace(/\//g, '')
		if (pathname !== '/' && apiResultsAsObject !== null) {
			handleMapMove(apiResultsAsObject[cleanPathname])
			batch(() => {
				dispatch(setViewType(DETAIL_VIEW))
				dispatch(setCurrentlySelectedRestaurant(apiResultsAsObject[cleanPathname]))
			})
		}
	}, [mapRef, apiResultsAsObject, dispatch])

	useEffect(() => {
		if (apiResults.length < 1) {
			dispatch(getFood())
		}
		if (mapRef.current === null) {
			if (currentRestaurant) {
				mapRef.current = setUpMap(currentRestaurant, lastRestaurantViewed, apiResults, dispatch)
			}
		}
		window.onpopstate = () => {
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
	}, [view, currentRestaurant, lastRestaurantViewed, apiResults, apiResultsAsObject, dispatch])

	useEffect(() => {
		myRef.current += 1
		console.log(myRef, mapRef)
	})

	useEffect(() => {
		if (isDesktop) {
			dispatch(setLayout(DESKTOP_LAYOUT))
		} else if (isTablet) {
			dispatch(setLayout(TABLET_LAYOUT))
		} else if (isMobile) {
			dispatch(setLayout(MOBILE_LAYOUT))
		}
	}, [isDesktop, isTablet, isMobile])

	return (
		<>
			<AnimatePresence>
				<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 1 }}
				>
					{
						currentLayout
						? <View handleMapMove={handleMapMove} layout={currentLayout} apiResults={apiResults} />
						: null
					}
				</motion.div>
			</AnimatePresence>
			<AnimatePresence>
			{
				<motion.div
				animate={{ x: view === DETAIL_VIEW ? 0 : '-100vw' }}
				transition={{ duration: .75 }}
				>
					<div style={{
						top: `calc(-100vh + ${TITLE_STRIP_HEIGHT})`,
						position: 'absolute',
						overflow: 'hidden'
					}}>
						<MapContainer layout={currentLayout} />
						<DetailView layout={currentLayout} currentRestaurant={currentRestaurant}/>
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
