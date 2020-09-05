import React, { useEffect, Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { MapIcon, TitleStrip, Restaurant, Margin, ViewContainer, MapContainer } from '../components/ViewComponents'
import { DETAIL_VIEW, DESKTOP_LAYOUT, TABLET_LAYOUT, MOBILE_LAYOUT } from '../constants/constants'
import { Col, Row, setConfiguration } from 'react-grid-system'
import { setLayout } from '../main/mainSlice'
import { motion, AnimatePresence } from 'framer-motion'

setConfiguration({ gutterWidth: 0 })

const View = ({ apiResults, layout }) => {

	const dispatch = useDispatch()

	const currentRestaurant = useSelector(state => state.main.currentlySelectedRestaurant)

	const currentLayout = useSelector(state => state.main.layout)

	useEffect(() => {
		dispatch(setLayout(layout))
	}, [layout, dispatch, currentRestaurant])

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
								if (currentLayout === DESKTOP_LAYOUT) { props.sm = 4 }
								if (currentLayout === TABLET_LAYOUT) { props.md = 6 }
								if (currentLayout === MOBILE_LAYOUT) { props.lg = 12 }
								return (
									<Fragment key={i}>
										<Col { ...props }>
											<AnimatePresence>
												<motion.div
													initial={{ y: '-50px' }}
													animate={{ y: 0 }}
													transition={{
														delay: .05 * i,
														duration: .35
													}}
													>
													<Restaurant
														restaurant={restaurant}
														layout={currentLayout}
														/>
												</motion.div>
											</AnimatePresence>
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
