import { useEffect } from 'react';
import { useStore } from 'react-redux';

export const useResetForm = (reset) => {
	const store = useStore();
	useEffect(() => {
		return store.subscribe(() => {
			if (store.getState().app.isLogout) reset();
		});
	}, [reset, store]);
};
