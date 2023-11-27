import { createReducer, on } from '@ngrx/store';
import { OrdersActions } from './orders.actions';

export const ordersFeatureKey = 'orders';

export interface State {

}

export const initialState: State = {

};

export const reducer = createReducer(
  initialState,
);

