import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setViewType, setCurrentlySelectedRestaurant } from '../main/mainSlice'
import { APP_NAME, DARK_GREEN, LIGHT_GREEN, TITLE_STRIP_HEIGHT, TABLET_VIEW, LIST_VIEW, DETAIL_VIEW } from '../constants/constants'
import gradient from '../../TEST_ASSETS/Cuts/cellGradientBackground@2x.png'
import backArrowIcon from '../../TEST_ASSETS/Cuts/ic_webBack@2x.png'
import mapIcon from '../../TEST_ASSETS/Cuts/icon_map@2x.png'
import styled from 'styled-components'

export const MobileContainer = styled.div`
	top: ${TITLE_STRIP_HEIGHT};
	position: absolute;
`

export const HeaderStrip = styled.div`
	color: #fff;
	width: 100vw;
	height: 60px;
	font-size: 17px;
	background-color: ${DARK_GREEN};
	font-family: Avenir Next Demi Bold, Arial;
`

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
	${
		({ layout }) =>
			layout === TABLET_VIEW
			? `width: 50vw`
			: `width: 100vw`
	}
`

const MapIcon = styled.img.attrs({ src: mapIcon })`
	top: 12px;
	right: 12px;
	width: 40px;
	height: 40px;
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
	const handleBackArrow = () => { dispatch(setViewType(LIST_VIEW)) }
	return (
			<>
				<div style={{ top: 0, position: 'absolute' }}>
					<StyledTitle>{APP_NAME}</StyledTitle>
					<MapIcon />
					{ displayBackArrow ? <BackArrow onClick={handleBackArrow} /> : null }
				</div>
			</>
	)
}

export const RestaurantContainer = styled.div.attrs({ className: 'restaurant' })`
	display: flex;
	user-select: none;
	position: relative;
	${
		({ layout }) =>
			layout === TABLET_VIEW
			? `width: 50vw`
			: `width: 100vw`
	}
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
	${
		({ layout }) =>
			layout === TABLET_VIEW
			? `width: 50vw`
			: `width: 100vw`
	}
`

export const RestaurantGradient = styled.img.attrs({ draggable: false })`
	bottom: 0;
	height: 100%;
	position: absolute;
	${
		({ layout }) =>
			layout === TABLET_VIEW
			? `width: 50vw`
			: `width: 100vw`
	}
`

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
