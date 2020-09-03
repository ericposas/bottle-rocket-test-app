import React, { useEffect } from 'react'
import { Restaurant, TitleStrip, HeaderStrip } from '../components/ViewComponents'
import { TITLE_STRIP_HEIGHT, TABLET_VIEW } from '../constants/constants'
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

const TabletView = ({ listView, detailView, apiResults }) => {

	useEffect(() => {
	}, [listView, detailView, apiResults])

	return (
		<>
			<TitleStrip />
				{
					listView
					?
						<>
							{
								apiResults
								?
									<>
										<ColumnLeft>
											{
												apiResults
												.filter((restaurant, i) => i % 2 === 0)
												.map((restaurant, i) => {
													let { name, category, backgroundImageURL: bgImg } = restaurant
													return (
														<TabletItem key={i}>
															<Restaurant
																name={name}
																bgImg={bgImg}
																category={category}
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
													let { name, category, backgroundImageURL: bgImg } = restaurant
													return (
														<TabletItem key={i}>
															<Restaurant
																name={name}
																bgImg={bgImg}
																category={category}
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
					detailView
					? <HeaderStrip/>
					: null
				}
		</>
	)
}

export default TabletView
