import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setViewType } from '../main/mainSlice'
import { Restaurant, TitleStrip, HeaderStrip } from '../components/ViewComponents'
import { TabletContainer, DetailViewContainer, DetailBG, renderColumns } from '../components/TabletViewComponents'
import { TITLE_STRIP_HEIGHT, TABLET_VIEW, LIST_VIEW, DETAIL_VIEW } from '../constants/constants'

const TabletView = ({ view, apiResults }) => {

	const dispatch = useDispatch()

	const currentRestaurant = useSelector(state => state.main.currentlySelectedRestaurant)

	return (
		<>
				<TabletContainer>
					{
						apiResults
						?	<>
								{
									view === LIST_VIEW
									? renderColumns(apiResults)
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
							<div style={{ margin: 0 }}>
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
												${currentRestaurant.location.postalCode ? currentRestaurant.location.postalCode : ''}
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
