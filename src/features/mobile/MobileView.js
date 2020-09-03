import React, { useEffect } from 'react'
import {
	AppName,
	RestaurantName, RestaurantImage,
	RestaurantCategory, RestaurantGradient,
	RestaurantContainer,
	TitleStrip, HeaderStrip
} from '../components/ViewComponents'
import gradient from '../../TEST_ASSETS/Cuts/cellGradientBackground@2x.png'

const MobileView = ({ listView, detailView, apiResults }) => {

	useEffect(() => {
	}, [listView, detailView, apiResults])
	
	return (
		<>
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
		</>
	)
}

export default MobileView
