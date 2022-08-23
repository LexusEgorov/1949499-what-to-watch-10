import { store } from '../store/store';

export type AppDispatchType = typeof store.dispatch;

export type State = ReturnType<typeof store.getState>;
