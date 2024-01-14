import { useReducer } from 'react';
import { DRAWER } from '../constants/drawer.constants';

type Drawer = {
    isMobileDrawer: boolean;
    isCartDrawer: boolean;
};


const drawerReducer = (
    state: Drawer,
    action: { type: string; payload: boolean }
) => {
    switch (action.type) {
        case DRAWER.SHOW_MOBILE:
            return { ...state, isMobileDrawer: action.payload };
        case DRAWER.SHOW_CART:
            return { ...state, isCartDrawer: action.payload };
        default:
            return state;
    }
};

export const useDrawer = () => {
    const initialState: Drawer = {
        isMobileDrawer: false,
        isCartDrawer: false,
    };
    const [state, dispatch] = useReducer(drawerReducer, initialState);

    return { state, dispatch };
}