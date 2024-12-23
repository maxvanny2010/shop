import { ACTIONS } from '../../utils';

export const addCategory = (data) => ({
	type: ACTIONS.CATEGORY_ADD,
	payload: data,
});
