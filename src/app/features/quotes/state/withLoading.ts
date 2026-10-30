import { patchState, signalStoreFeature, withMethods, withState, } from '@ngrx/signals';
import { ILoadingState } from '../interfaces/ILoadingState';

const initialLoadingState: ILoadingState = {
  loading: false,
  error: null,
};

export function withLoading() {
  return signalStoreFeature(
    withState(() => initialLoadingState),
    withMethods((store) => ({
      setLoading(value: boolean): void {
        patchState(store, { loading: value });
      },
      setError(message: string | null): void {
        patchState(store, { error: message });
      },
    })),
  );
}