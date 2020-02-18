import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromSpinner from '../store/reducers/loading-spinner';

export interface State {
  loading: fromSpinner.State
}

export const reducers: ActionReducerMap<State> = {
  loading: fromSpinner.reducer
};

export const getLoadingState = (state: State) => state.loading;

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

export const isLoadingSpinnerActive = createSelector(
  getLoadingState,
  fromSpinner.isLoadingSpinnerActive
);
