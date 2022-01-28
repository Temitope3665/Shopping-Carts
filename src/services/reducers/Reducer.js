import { ADD_TO_CART } from "../Constants"

const initialState = {
    cardData: []
}

export const cardItems = (state = [], action) => {
    switch(action.type) {
        case ADD_TO_CART:
            return [
                ...state,
                {cardData: action.cardData}
            ]
        default:
            return state
    }
}