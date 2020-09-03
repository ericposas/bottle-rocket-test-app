import styled from 'styled-components'

export const AppName = 'Lunch Tyme'
export const darkGreen = '#34B379'
export const lightGreen = '#43E895'

export const HeaderStrip = styled.div`
	color: #fff;
	width: 100vw;
	height: 60px;
	font-size: 17px;
	background-color: ${darkGreen};
	font-family: Avenir Next Demi Bold, Arial;
`

export const RestaurantContainer = styled.div`
	width: 100vw;
	position: relative;
	display: flex;
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

export const TitleStrip = styled.div`
	color: #fff;
	width: 100vw;
	height: 60px;
	font-size: 17px;
	font-weight: bold;
	line-height: 77px;
	text-align: center;
	background-color: ${lightGreen};
	font-family: Avenir Next Demi Bold, Arial;
`

export const RestaurantImage = styled.img`
	width: 100vw;
`

export const RestaurantGradient = styled.img`
	bottom: 0;
	width: 100vw;
	height: 100%;
	position: absolute;
`
