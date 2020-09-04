import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setViewType } from '../main/mainSlice'
import { Restaurant, TitleStrip, HeaderStrip, MapIcon, ContactInfo, DetailViewContainer, DetailBG, HeaderStripWithDetails, DetailView } from '../components/ViewComponents'
import { TabletContainer, ColumnView } from '../components/TabletViewComponents'
import { TITLE_STRIP_HEIGHT, TABLET_VIEW, LIST_VIEW, DETAIL_VIEW } from '../constants/constants'
import styled from 'styled-components'

const TabletView = ({ view, apiResults }) => {

	const dispatch = useDispatch()

	const currentRestaurant = useSelector(state => state.main.currentlySelectedRestaurant)

	return (
		<>
			{
				apiResults
				?
					<>
						<TabletContainer>
							<ColumnView apiResults={apiResults} />
							{
								currentRestaurant && view === DETAIL_VIEW
								? <DetailView currentRestaurant={currentRestaurant} /> : null
							}
						</TabletContainer>
						<TitleStrip displayBackArrow={ view === DETAIL_VIEW ? true : false } />
						{ view === DETAIL_VIEW ? <MapIcon /> : null }
					</>
				: null
			}
		</>
	)
}

export default TabletView
