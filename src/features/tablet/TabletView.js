import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setViewType } from '../main/mainSlice'
import { Restaurant, TitleStrip, HeaderStrip } from '../components/ViewComponents'
import { TITLE_STRIP_HEIGHT, TABLET_VIEW, LIST_VIEW, DETAIL_VIEW } from '../constants/constants'
import styled from 'styled-components'

const ColumnLeft = styled.div`
	margin-top: ${TITLE_STRIP_HEIGHT};
	width: 50vw;
`

const ColumnRight = styled.div`
	margin-left: 50vw;
	width: 50vw;
`

const TabletItem = styled.div`
	flex-basis: 50%;
`

const DetailViewContainer = styled.div`
	top: ${TITLE_STRIP_HEIGHT};
	position: absolute;
`

const DetailBG = styled.div`
	background-color: #fff;
	height: 100%;
`

const TabletContainer = styled.div`
	overflow-y: scroll;
	height: 100vh;
`

const TabletView = ({ view, apiResults }) => {

	const dispatch = useDispatch()

	const currentRestaurant = useSelector(state => state.main.currentlySelectedRestaurant)

	const leftColumnRef = useRef()

	const [rightColumnMargin, setRightColumnMargin] = useState('0px')

	const onResize = (e) => {
		if (leftColumnRef && leftColumnRef.current) {
			console.log(
				leftColumnRef.current.scrollHeight
			)
			setRightColumnMargin((leftColumnRef.current.scrollHeight * -1)+'px')
		}
	}

	// useEffect(() => {
	// 	setRightColumnMargin(
	// 		(parseInt(
	// 			getComputedStyle(rightColumnRef.current).getPropertyValue('height')
	// 		) * -1) + TITLE_STRIP_HEIGHT + 'px'
	// 	)
	// })

	useEffect(() => {
		// console.log(
		// 	rightColumnRef.current.scrollHeight
		// )
		window.addEventListener('resize', onResize)

		return () => {
			window.removeEventListener('resize', onResize)
		}
	}, [])

	useEffect(() => {
		// onResize()

	}, [view, apiResults])

	// useEffect(() => {
	// 	console.log(
	// 		getComputedStyle(rightColumnRef.current).getPropertyValue('height')
	// 	)
	// }, [rightColumnRef])

	return (
		<>
				<TabletContainer>
					{
						view === LIST_VIEW
						?
						<>
						{
							apiResults
							?
							<>
							<ColumnLeft
								ref={ leftColumnRef }
								>
								{
									apiResults
									.filter((restaurant, i) => i % 2 === 0)
									.map((restaurant, i) => {
										return (
											<TabletItem key={i}>
												<Restaurant
													restaurant={restaurant}
													layout={TABLET_VIEW}
													/>
											</TabletItem>
										)
									})
								}
							</ColumnLeft>
							<ColumnRight
								style={{ marginTop: rightColumnMargin }}
								>
								{
									apiResults
									.filter((restaurant, i) => i % 2 === 1)
									.map((restaurant, i) => {
										return (
											<TabletItem key={i}>
												<Restaurant
													restaurant={restaurant}
													layout={TABLET_VIEW}
													/>
											</TabletItem>
										)
									})
								}
							</ColumnRight>
							</>
						: null
					}
					</>
				: null
			}
			{
				view === DETAIL_VIEW
				?
				<>
				<DetailViewContainer>
					{/* MAP PLACEHOLDER */}
					<div style={{
							marginTop: TITLE_STRIP_HEIGHT,
							margin: 0,
						}}>
						<div
							style={{
								margin: 0,
								width: '100vw',
								height: '400px',
								backgroundColor: 'lightblue',
							}}>
						</div>
					</div>
					{/* MAP PLACEHOLDER */}
					<HeaderStrip/>
					<div>
						<DetailBG>
							<div style={{
									fontSize: '16px',
									padding: '16px 0 0 12px'
								}}>
								<div>
									{currentRestaurant.location.address}
								</div>
								<div>
									{
										`
										${currentRestaurant.location.city},
										${currentRestaurant.location.state}
										${currentRestaurant.location.postalCode}
										`
									}
								</div>
							</div>
						</DetailBG>
					</div>
				</DetailViewContainer>

				</>
			: null
		}
	</TabletContainer>
	<TitleStrip displayBackArrow={ view === DETAIL_VIEW ? true : false } />
		</>
	)
}

export default TabletView
