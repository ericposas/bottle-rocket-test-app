import React, { useEffect } from 'react'
import {
	AppName,
	Restaurant,
	TitleStrip, HeaderStrip
} from '../components/ViewComponents'

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
					apiResults.map((restaurant, i) => {
						let { name, backgroundImageURL: bgImg, category } = restaurant
						return (
							<div key={i}>
								<Restaurant
									name={name}
									bgImg={bgImg}
									category={category}
								/>
							</div>
						)
					})
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
