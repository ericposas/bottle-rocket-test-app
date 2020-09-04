import { useDispatch, useSelector } from 'react-redux'
import React, { useState, useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'
import { getFood, selectAPIresults } from './mainSlice'
import MobileView from '../mobile/MobileView'
import TabletView from '../tablet/TabletView'

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
				<TabletView
					view={view}
					apiResults={apiResults}
				/>
			</Desktop>
			<Tablet>
				<TabletView
					view={view}
					apiResults={apiResults}
				/>
			</Tablet>
			<Mobile>
				<MobileView
					view={view}
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
