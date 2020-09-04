import { useDispatch, useSelector } from 'react-redux'
import React, { useState, useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'
import { getFood, selectAPIresults } from './mainSlice'
// import MobileView from '../mobile/MobileView'
// import TabletView from '../tablet/TabletView'
// import DesktopView from '../desktop/DesktopView'
import { DESKTOP_VIEW, TABLET_VIEW, MOBILE_VIEW} from '../constants/constants'
import View from '../desktop/View'

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

const Default = ({ children }) => {
  const isNotMobile = useMediaQuery({ minWidth: 768 })
  return isNotMobile ? children : null
}

const Main = () => {

	const dispatch = useDispatch()
	const apiResults = useSelector(selectAPIresults)
	const view = useSelector(state => state.main.view)

	useEffect(() => {
		dispatch(getFood())
	}, [dispatch])

	return (
		<>
			<Desktop>
				<View
					layout={DESKTOP_VIEW}
					apiResults={apiResults}
				/>
			</Desktop>
			<Tablet>
				<View
					layout={TABLET_VIEW}
					apiResults={apiResults}
				/>
			</Tablet>
			<Mobile>
				<View
					layout={MOBILE_VIEW}
					apiResults={apiResults}
				/>
			</Mobile>
			{
				/*
				<Default>
				<TabletView
				view={viewType}
				apiResults={apiResults}
				/>
				</Default>
				*/
			}
		</>
	)

}

export default Main
