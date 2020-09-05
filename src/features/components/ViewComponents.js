import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setViewType, setCurrentlySelectedRestaurant, setLastRestaurantViewed } from '../main/mainSlice'
import { APP_NAME, DARK_GREEN, LIGHT_GREEN, TITLE_STRIP_HEIGHT,
	LIST_VIEW, DETAIL_VIEW, DESKTOP_LAYOUT, TABLET_LAYOUT } from '../constants/constants'
import gradient from '../../TEST_ASSETS/Cuts/cellGradientBackground@2x.png'
import backArrowIcon from '../../TEST_ASSETS/Cuts/ic_webBack@2x.png'
import mapIcon from '../../TEST_ASSETS/Cuts/icon_map@2x.png'
import styled from 'styled-components'

export const MapContainer = styled.div.attrs({ id: 'map' })`
	width: 100vw;
	height: 400px;
`

export const Margin = styled.div`
	width: 100vw;
	height: ${TITLE_STRIP_HEIGHT};
`

export const ViewContainer = styled.div`
	overflow-x: hidden;
	overflow-y: scroll;
	height: 100vh;
`

export const StyledHeaderStrip = styled.div`
	color: #fff;
	width: 100vw;
	height: 60px;
	font-size: 17px;
	background-color: ${DARK_GREEN};
	font-family: Avenir Next Demi Bold, Arial;
`

export const HeaderStrip = ({ children }) => (
	<StyledHeaderStrip>
		<div style={{ padding: '8px 0 0 0', margin: '0 0 0 12px' }}>
			{children}
		</div>
	</StyledHeaderStrip>
)

const checkLayout = ({ layout }) => (
	layout === TABLET_LAYOUT
	? `width: 50vw`
	:
		layout === DESKTOP_LAYOUT
		? `width: 35vw`
		: `width: 100vw`
)

const StyledTitle = styled.div`
	color: #fff;
	position: absolute;
	height: ${TITLE_STRIP_HEIGHT};
	font-size: 17px;
	font-weight: bold;
	line-height: 77px;
	text-align: center;
	background-color: ${LIGHT_GREEN};
	font-family: Avenir Next Demi Bold, Arial;
	${checkLayout}
`

export const MapIcon = styled.img.attrs({ src: mapIcon })`
	top: 8px;
	right: 12px;
	width: 44px;
	position: absolute;
`

const BackArrow = styled.img.attrs({ src: backArrowIcon })`
	top: 10px;
	left: 12px;
	width: ${26 * .85}px;
	height: ${50 * .85}px;
	position: absolute;
`

export const TitleStrip = ({ displayBackArrow }) => {
	const dispatch = useDispatch()
	const state = useSelector(state => state.main)
	const currentRestaurant = useSelector(state => state.main.currentlySelectedRestaurant)
	const handleBackArrow = () => {
		dispatch(setLastRestaurantViewed(currentRestaurant))
		dispatch(setViewType(LIST_VIEW))
		console.log(
			state
		)
	}
	return (
			<>
				<div style={{ top: 0, position: 'absolute' }}>
					<StyledTitle>{APP_NAME}</StyledTitle>
					{ displayBackArrow ? <BackArrow onClick={handleBackArrow} /> : null }
				</div>
			</>
	)
}

export const RestaurantContainer = styled.div.attrs({ className: 'restaurant' })`
	display: flex;
	user-select: none;
	position: relative;
	${checkLayout}
`

export const RestaurantName = styled.div`
	left: 12px;
	bottom: 20px;
	color: #fff;
	font-size: 16px;
	font-weight: bold;
	position: absolute;
`

export const RestaurantCategory = styled.div`
	left: 12px;
	color: #fff;
	bottom: 6px;
	font-size: 12px;
	position: absolute;
`

export const RestaurantImage = styled.img`
	${checkLayout}
`

export const RestaurantGradient = styled.img.attrs({ draggable: false })`
	bottom: 0;
	height: 100%;
	position: absolute;
	${checkLayout}
`

export const DetailViewContainer = styled.div`
	top: ${TITLE_STRIP_HEIGHT};
	background-color: #fff;
	overflow: hidden;
	position: fixed;
`

export const DetailBG = styled.div`
	background-color: #fff;
	overflow: hidden;
	height: 100vh;
`

const Phone = styled.div`
	margin: 26px 0 26px 12px;
`

const Address = styled.div`
	margin: 16px 0 0 12px;
`

const Twitter = styled.div`
	margin: 26px 0 0 12px;
`

const BoldName = styled.div`
	font-weight: bold;
	font-size: 20px;
`

const HeaderStripWithDetails = ({ currentRestaurant }) => (
	<HeaderStrip>
		<BoldName>
			{ currentRestaurant.name }
		</BoldName>
		{ currentRestaurant.category }
	</HeaderStrip>
)

const ContactInfo = ({ currentRestaurant }) => (
	<DetailBG>
		<div>
			<Address>
				{
					currentRestaurant.location.address
				}
				<br/>
				{
					`
					${currentRestaurant.location.city},
					${currentRestaurant.location.state}
					${currentRestaurant.location.postalCode ? currentRestaurant.location.postalCode : ''}
					`
				}
			</Address>
			<Phone>
				{
					currentRestaurant && currentRestaurant.contact && currentRestaurant.contact.formattedPhone
					? currentRestaurant.contact.formattedPhone
					: 'No phone available'
				}
			</Phone>
			<Twitter>
				{
					currentRestaurant && currentRestaurant.contact && currentRestaurant.contact.twitter
					? '@' + currentRestaurant.contact.twitter
					: 'No twitter handle available'
				}
			</Twitter>
		</div>
	</DetailBG>
)

export const DetailView = ({ currentRestaurant, children }) => (
	<DetailViewContainer>
		{children}
		<HeaderStripWithDetails currentRestaurant={currentRestaurant} />
		<>
			<ContactInfo currentRestaurant={currentRestaurant} />
		</>
	</DetailViewContainer>
)

export const Restaurant = ({ restaurant, layout }) => {

	const dispatch = useDispatch()

	const handleSelectItem = e => {
		dispatch(setCurrentlySelectedRestaurant(restaurant))
		dispatch(setViewType(DETAIL_VIEW))
	}

	return (
		<RestaurantContainer
			onClick={handleSelectItem}
			layout={layout}
			>
			<RestaurantImage layout={layout} src={restaurant.backgroundImageURL} />
			<RestaurantGradient layout={layout} src={gradient} />
			<RestaurantName>{restaurant.name}</RestaurantName>
			<RestaurantCategory>{restaurant.category}</RestaurantCategory>
		</RestaurantContainer>
	)
}
