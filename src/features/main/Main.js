import { useDispatch, useSelector } from 'react-redux'
import React, { useState, useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'
import { getFood, selectAPIresults } from './mainSlice'
import MobileView from '../mobile/MobileView'
import {
	AppName, Restaurant
} from '../components/ViewComponents'
import styled from 'styled-components'

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

const ColumnLeft = styled.div`
	width: 50vh;
`

const ColumnRight = styled.div`
	top: 0;
	left: 50%;
	width: 50vh;
	position: absolute;
`

const TabletItem = styled.div`
	flex-basis: 50%;
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
			<>
				<ColumnLeft>
				{
					apiResults
					.filter((restaurant, i) => i % 2 == 0)
					.map((restaurant, i) => {
						let { name, category, backgroundImageURL: bgImg } = restaurant
						return (
							<TabletItem key={i}>
								<Restaurant
									name={name}
									bgImg={bgImg}
									category={category}
									layout={'tablet'}
								/>
							</TabletItem>
						)
					})
				}
				</ColumnLeft>
				<ColumnRight>
				{
					apiResults
					.filter((restaurant, i) => i % 2 == 1)
					.map((restaurant, i) => {
						let { name, category, backgroundImageURL: bgImg } = restaurant
						return (
							<TabletItem key={i}>
								<Restaurant
									name={name}
									bgImg={bgImg}
									category={category}
									layout={'tablet'}
								/>
							</TabletItem>
						)
					})
				}
				</ColumnRight>
			</>
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
