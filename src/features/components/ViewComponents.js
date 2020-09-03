import React from 'react'
import styled from 'styled-components'
import gradient from '../../TEST_ASSETS/Cuts/cellGradientBackground@2x.png'
import './restaurant.module.css'
import { APP_NAME, DARK_GREEN, LIGHT_GREEN, TITLE_STRIP_HEIGHT, TABLET_VIEW } from '../constants/constants'

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

export const TitleStrip = () => (
	<StyledTitle>{APP_NAME}</StyledTitle>
)

export const RestaurantContainer = styled.div.attrs({ className: 'restaurant' })`
	display: flex;
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

export const RestaurantGradient = styled.img`
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

export const Restaurant = ({ name, bgImg, category, layout }) => {
	if (layout === TABLET_VIEW) {
		return (
			<RestaurantContainer layout={layout}>
				<RestaurantImage layout={layout} src={bgImg} />
				<RestaurantGradient layout={layout} src={gradient} />
				<RestaurantName>{name}</RestaurantName>
				<RestaurantCategory>{category}</RestaurantCategory>
			</RestaurantContainer>
		)
	}
	return (
		<RestaurantContainer>
			<RestaurantImage src={bgImg} />
			<RestaurantGradient src={gradient} />
			<RestaurantName>{name}</RestaurantName>
			<RestaurantCategory>{category}</RestaurantCategory>
		</RestaurantContainer>
	)
}
