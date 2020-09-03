import { useDispatch, useSelector } from 'react-redux'
import React, { useState, useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'
import { getFood, selectAPIresults } from './mainSlice'
import MobileView from '../mobile/MobileView'

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

	const [detailView, setDetailView] = useState(false)
	const [listView, setListView] = useState(true)
	const dispatch = useDispatch()
	const apiResults = useSelector(selectAPIresults)

	useEffect(() => {
		dispatch(getFood())
	}, [])

	return (
		<div>
		<Desktop>
		<div>Desktop or laptop</div>

		</Desktop>
		<Tablet>
		<div>Tablet</div>

		</Tablet>
		<Mobile>
			<MobileView
				listView={listView}
				detailView={detailView}
				apiResults={apiResults}
			/>
		</Mobile>
		<Default>
		<div>Not mobile (desktop or laptop or tablet)</div>

		</Default>
		</div>
	)

}

export default Main
