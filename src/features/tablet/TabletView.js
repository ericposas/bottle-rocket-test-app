import React from 'react'
import { useSelector } from 'react-redux'
import { MapIcon, DetailView, TitleStrip } from '../components/ViewComponents'
import { TabletContainer, ColumnView } from '../components/TabletViewComponents'
import { DETAIL_VIEW } from '../constants/constants'

const TabletView = ({ view, apiResults }) => {

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
