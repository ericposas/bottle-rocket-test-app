import React, { useEffect } from 'react'
import { Restaurant, TitleStrip, HeaderStrip, MobileContainer } from '../components/ViewComponents'

const MobileView = ({ listView, detailView, apiResults }) => {

	useEffect(() => {
	}, [listView, detailView, apiResults])

	return (
		<>
			<TitleStrip />
			<MobileContainer>
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
													<Restaurant
														key={i}
														name={name}
														bgImg={bgImg}
														category={category}
														/>
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
			</MobileContainer>
		</>
	)
}

export default MobileView
