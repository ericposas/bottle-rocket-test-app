import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setViewType } from '../main/mainSlice'
import { Restaurant, TitleStrip, HeaderStrip } from '../components/ViewComponents'
import { TITLE_STRIP_HEIGHT, TABLET_VIEW, LIST_VIEW, DETAIL_VIEW } from '../constants/constants'
import backArrowIcon from '../../TEST_ASSETS/Cuts/ic_webBack@2x.png'
import styled from 'styled-components'

const ColumnLeft = styled.div`
	width: 50vh;
	position: absolute;
	top: ${TITLE_STRIP_HEIGHT};
`

const ColumnRight = styled.div`
	left: 50%;
	width: 50vh;
	position: absolute;
	top: ${TITLE_STRIP_HEIGHT};
`

const TabletItem = styled.div`
	flex-basis: 50%;
`

const BackArrow = styled.img.attrs({ src: backArrowIcon })`
	top: 10px;
	left: 12px;
	width: ${26 * .85}px;
	height: ${50 * .85}px;
	position: absolute;
`

const DetailViewContainer = styled.div`
	top: 0;
	position: absolute;
`

const DetailBG = styled.div`
	background-color: #fff;
	height: 100vh;
`

const TabletView = ({ view, apiResults }) => {

	const dispatch = useDispatch()

	const currentRestaurant = useSelector(state => state.main.currentlySelectedRestaurant)

	const handleBackArrow = () => { dispatch(setViewType(LIST_VIEW)) }

	useEffect(() => {
		console.log(
			view
		)
	}, [view, apiResults])

	return (
		<>
				{

						<>
							<TitleStrip />
							{
								apiResults
								?
									<>
										<ColumnLeft>
											{
												apiResults
												.filter((restaurant, i) => i % 2 === 0)
												.map((restaurant, i) => {
													// let { name, category, backgroundImageURL: bgImg } = restaurant
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
										<ColumnRight>
											{
												apiResults
												.filter((restaurant, i) => i % 2 === 1)
												.map((restaurant, i) => {
													// let { name, category, backgroundImageURL: bgImg } = restaurant
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

				}
				{
					view === DETAIL_VIEW
					?
						<>
							<DetailViewContainer>
								<TitleStrip />
								<BackArrow
									onClick={handleBackArrow}
									/>
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
										<div>
											{
												currentRestaurant.location.address
											}
										</div>
									</DetailBG>
								</div>
							</DetailViewContainer>

						</>
					: null
				}
		</>
	)
}

export default TabletView
