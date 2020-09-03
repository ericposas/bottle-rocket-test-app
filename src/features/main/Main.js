import { useDispatch, useSelector } from 'react-redux'
import React, { useState, useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'
import styled from 'styled-components'
import { getFood, selectAPIresults } from './mainSlice'
import gradient from '../../TEST_ASSETS/Cuts/cellGradientBackground@2x.png'

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

const AppName = 'Lunch Tyme'
const darkGreen = '#34B379'
const lightGreen = '#43E895'

const HeaderStrip = styled.div`
	color: #fff;
	width: 100vw;
	height: 60px;
	font-size: 17px;
	background-color: ${darkGreen};
	font-family: Avenir Next Demi Bold, Arial;
`

const RestaurantContainer = styled.div`
	width: 100vw;
	position: relative;
	display: flex;
`

const RestaurantName = styled.div`
	left: 12px;
	bottom: 20px;
	color: #fff;
	font-size: 16px;
	font-weight: bold;
	position: absolute;
`

const RestaurantCategory = styled.div`
	left: 12px;
	color: #fff;
	bottom: 6px;
	font-size: 12px;
	position: absolute;
`

const TitleStrip = styled.div`
	color: #fff;
	width: 100vw;
	height: 60px;
	font-size: 17px;
	font-weight: bold;
	line-height: 77px;
	text-align: center;
	background-color: ${lightGreen};
	font-family: Avenir Next Demi Bold, Arial;
`

const RestaurantImage = styled.img`
	width: 100vw;
`

const RestaurantGradient = styled.img`
	bottom: 0;
	width: 100vw;
	height: 100%;
	position: absolute;
`

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
		{/*<div>Mobile</div>*/}
		<TitleStrip>{AppName}</TitleStrip>
		{
			listView
			?
				<>
					{
						apiResults
						?
						<>
							{
								apiResults.map((restaurant, i) => (
									<div
									key={i}>
									{
										<RestaurantContainer>
											<RestaurantImage src={restaurant.backgroundImageURL} />
											<RestaurantGradient src={gradient} />
											<RestaurantName>{restaurant.name}</RestaurantName>
											<RestaurantCategory>{restaurant.category}</RestaurantCategory>
										</RestaurantContainer>
									}
									</div>
								))
							}
						</>
						: null
					}
				</>
			: null
		}
		{
			detailView
			? <HeaderStrip/>
			: null
		}
		</Mobile>
		<Default>
		<div>Not mobile (desktop or laptop or tablet)</div>

		</Default>
		</div>
	)

}

export default Main
