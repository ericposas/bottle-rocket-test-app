import React, { useEffect } from 'react'
import { Restaurant, TitleStrip, HeaderStrip, MobileContainer } from '../components/ViewComponents'
import { MOBILE_VIEW, LIST_VIEW, DETAIL_VIEW } from '../constants/constants'

const MobileView = ({ view, apiResults }) => {

	useEffect(() => {
	}, [view, apiResults])

	return (
		<>
			<TitleStrip />
			<MobileContainer>
				{
					view === LIST_VIEW
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
														layout={MOBILE_VIEW}
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
					view === DETAIL_VIEW
					? <HeaderStrip/>
					: null
				}
			</MobileContainer>
		</>
	)
}

export default MobileView
