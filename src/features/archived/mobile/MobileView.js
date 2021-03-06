import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Restaurant, TitleStrip, MapIcon, DetailView } from '../components/ViewComponents'
import { MOBILE_VIEW, LIST_VIEW, DETAIL_VIEW, TITLE_STRIP_HEIGHT } from '../constants/constants'
import styled from 'styled-components'

const MobileContainer = styled.div`
	margin-top: ${TITLE_STRIP_HEIGHT};
	height: 100vh;
	overflow-y: scroll;
`

const MobileView = ({ view, apiResults }) => {

	const currentRestaurant = useSelector(state => state.main.currentlySelectedRestaurant)

	return (
		<>
			{
				apiResults
				?
					<>
						<MobileContainer>
							{
								apiResults.map((restaurant, i) => (
									<Restaurant
										key={i}
										restaurant={restaurant}
										layout={MOBILE_VIEW}
										/>
								))
							}
							{
								currentRestaurant && view === DETAIL_VIEW
								? <DetailView currentRestaurant={currentRestaurant} /> : null
							}
						</MobileContainer>
						<TitleStrip displayBackArrow={ view === DETAIL_VIEW ? true : false } />
						{ view === DETAIL_VIEW ? <MapIcon /> : null }
					</>
				: null
			}
		</>
	)
}

export default MobileView
