import React from 'react'
import styled from 'styled-components'
import gradient from '../../TEST_ASSETS/Cuts/cellGradientBackground@2x.png'
import './restaurant.module.css'

export const AppName = 'Lunch Tyme'

export const darkGreen = '#34B379'

export const lightGreen = '#43E895'

export const titleStripHeight = '60px'

export const MobileContainer = styled.div`
	top: ${titleStripHeight};
	position: absolute;
`

export const HeaderStrip = styled.div`
	color: #fff;
	width: 100vw;
	height: 60px;
	font-size: 17px;
	background-color: ${darkGreen};
	font-family: Avenir Next Demi Bold, Arial;
`

export const TitleStrip = styled.div`
	color: #fff;
	position: absolute;
	height: ${titleStripHeight};
	font-size: 17px;
	font-weight: bold;
	line-height: 77px;
	text-align: center;
	background-color: ${lightGreen};
	font-family: Avenir Next Demi Bold, Arial;
	${
		({ layout }) =>
			layout === 'tablet'
			? `width: 50vw`
			: `width: 100vw`
	}
`

export const RestaurantContainer = styled.div.attrs({ className: 'restaurant' })`
	display: flex;
	position: relative;
	${
		({ layout }) =>
			layout === 'tablet'
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
			layout === 'tablet'
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
			layout === 'tablet'
			? `width: 50vw`
			: `width: 100vw`
	}
`

export const Restaurant = ({ name, bgImg, category, layout }) => {
	if (layout === 'tablet') {
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
