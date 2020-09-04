import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'
import { getFood } from './mainSlice'
import { DESKTOP_VIEW, TABLET_VIEW, MOBILE_VIEW} from '../constants/constants'
import View from '../components/View'

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
	
	const apiResults = useSelector(state => state.main.apiResults)

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
		</>
	)

}

export default Main
