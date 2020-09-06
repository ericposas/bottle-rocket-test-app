export const restaurantNameToURLPath = (restaurant) => {
	return restaurant.name.split(' ').join('').toLowerCase().replace(/'/g, '')
}
