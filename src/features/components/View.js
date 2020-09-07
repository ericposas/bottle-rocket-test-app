import React, { Fragment, useEffect } from 'react'
import { Restaurant, Margin, ViewContainer } from '../components/ViewComponents'
import { DESKTOP_LAYOUT, TABLET_LAYOUT, MOBILE_LAYOUT } from '../constants/constants'
import { Col, Row, setConfiguration } from 'react-grid-system'

setConfiguration({ gutterWidth: 0 })

const View = ({ handleMapMove, apiResults, layout }) => {

	return (
		<>
			{
				apiResults
				?
				<>
				<ViewContainer>
					<Margin />
					<Row>
						{
							apiResults.map((restaurant, i) => {
								let props = {}
								if (layout === DESKTOP_LAYOUT) { props.sm = 4 }
								if (layout === TABLET_LAYOUT) { props.md = 6 }
								if (layout === MOBILE_LAYOUT) { props.lg = 12 }
								return (
									<Fragment key={i}>
										<Col { ...props }>
											<Restaurant
											handleMapMove={handleMapMove}
											restaurant={restaurant}
											layout={layout}
											/>
										</Col>
									</Fragment>
								)
							})
						}
					</Row>
				</ViewContainer>
				</>
			: null
		}
		</>
	)
}

export default View
