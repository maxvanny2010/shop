import { useEffect } from 'react';

export const useScrollBodyControl = (isOpen) => {
	useEffect(() => {
		document.documentElement.style.overflowY = isOpen ? 'hidden' : '';
		return () => {
			document.documentElement.style.overflowY = '';
		};
	}, [isOpen]);
};
