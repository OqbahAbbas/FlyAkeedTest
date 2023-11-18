import { createContext, useContext } from 'react'

let initialState = {
	handleMenuClose: () => {},
}
const MenuContext = createContext(initialState)

export const MenuContextNexus = () => {
	initialState = useContext(MenuContext)
	return null
}

export const getMenuContext = () => initialState

export default MenuContext
