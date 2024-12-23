import styled from 'styled-components';
import PropTypes from 'prop-types';
import {useEffect, useState} from 'react';
import * as yup from 'yup';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {AuthErrorForm, Button, ButtonAddNewComponent, Input} from '../../component/index.jsx';
import {StyleSelect} from '../users/components/index.jsx';
import {ERROR, METHOD, PATH, requests, SUCCESS} from '../../utils/index.jsx';
import {useDispatch, useSelector} from 'react-redux';
import {selectCategories, selectProduct} from '../../redux/selectors/index.jsx';
import {ToolTip} from '../order/components/index.jsx';
import {addCategory, CLEAR_PRODUCT, updateProducts} from '../../redux/action/index.jsx';
import {useLocation} from 'react-router-dom';

const categoryFormSchema = yup.object().shape({
	newCategory: yup.string()
		.required('Category is required')
		.matches(/^[a-zA-Z]+$/, 'Invalid category format')
		.min(3, 'Category: min 3 symbols')
		.max(10, 'Category: max 10 symbols'),
});
const productFormSchema = yup.object().shape({
	name: yup.string()
		.required('Name is required')
		.matches(/^[a-zA-Z-_]+$/, 'Invalid name format')
		.min(3, 'Name: min 3 symbols')
		.max(10, 'Name: max 10 symbols'),
	price: yup
		.string()
		.required('Price is required')
		.matches(/^\d+(\.\d{1,2})?$/, 'Example: 10 or 10.99')
		.test('is-positive', 'Price > 0', value => parseFloat(value) > 0),
	quantity: yup
		.string()
		.required('Quantity is required')
		.matches(/^[1-9]\d*$/, 'Quantity only > 0')
		.test('is-integer', 'Only an integer', value => Number.isInteger(Number(value))),
});

const AdminAsideComponent = ({className}) => {
	const dispatch = useDispatch();

	const product = useSelector(selectProduct);
	const location = useLocation();
	const categories = useSelector(selectCategories).filter(category => category.name !== 'Catalog');
	const {id} = product;
	const {
		register: registerCategory,
		reset: resetCategory,
		handleSubmit: handleSubmitCategory,
		formState: {errors: errorsCategory},
	} = useForm({
		defaultValues: {
			newCategory: '',
		},
		resolver: yupResolver(categoryFormSchema),
	});
	const {
		register,
		reset,
		handleSubmit,
		watch,
		formState: {errors},
	} = useForm({
		defaultValues: {
			name: '', price: 0, quantity: 0,
		},
		resolver: yupResolver(productFormSchema),
	});
	useEffect(() => {
		if (product && product.category) {
			reset({
				name: product.name,
				price: product.price,
				quantity: product.quantity,
			});
			setSelectedCategory(product.category._id || '');
		}
	}, [product, reset]);
	useEffect(() => {
		dispatch(CLEAR_PRODUCT);
		reset({
			name: '',
			price: 0,
			quantity: '',
		});
		setSelectedCategory('');
	}, [dispatch, location.pathname, reset]);

	const [selectedCategory, setSelectedCategory] = useState(product.category._id || '');
	const [isNewCategory, setIsNewCategory] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);
	const [errorServer, setErrorServer] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	const [isFormValid, setIsFormValid] = useState(true);
	const onCategoryChanged = ({target}) => {
		setSelectedCategory(target.value);
	};
	useEffect(() => {
		const values = watch();
		console.log('WATCH:', values, 'SELECT: ', selectedCategory);

	}, [selectedCategory, watch]);
	const onSubmit = async ({name, price, quantity}) => {
		if (Object.keys(errors).length > 0 || !selectedCategory) {
			setIsFormValid(false);
			return;
		}
		try {
			setIsLoading(true);
			setIsFormValid(true);
			const orderRequest = {name, category: selectedCategory, price, quantity};
			console.log('REQUEST:', orderRequest);
			const url = `${PATH.PRODUCTS}/${id ? id : ''}`;
			const method = id ? METHOD.PATCH : METHOD.POST;
			const {
				data,
				error,
			} = await requests(url, method, orderRequest);
			if (data) {
				setIsSuccess(true);
				if (id) dispatch(updateProducts(data));
				setTimeout(() => {
					reset({
						name: '',
						price: 0,
						quantity: '',
					});
					setSelectedCategory('');
					setIsSuccess(false);
				}, 3000);
			} else setErrorServer(`${error}`);
		} catch (err) {
			setErrorServer(err.message);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		const error =
			errors?.name?.message
			|| errors?.price?.message
			|| errors?.quantity?.message
			|| errors?.imageUrl?.message;
		const errorCategory = errorsCategory?.newCategory?.message;
		setErrorMessage(error || errorServer || errorCategory);
		console.log('ERROR:', error);
	}, [errors, errorServer, errorsCategory]);
	useEffect(() => {
		if (errorMessage || !isFormValid) {
			const timeout = setTimeout(() => {
				setIsFormValid(true);
				setErrorMessage('');
			}, 5000);
			return () => clearTimeout(timeout);
		}
	}, [errorMessage, isFormValid]);
	const handlerProductCancel = () => {
		reset();
		setSelectedCategory('');
		dispatch(CLEAR_PRODUCT);
	};
	const handleAddNewCategory = () => {
		setIsNewCategory(true);
	};
	const handlerNewCategoryCancel = () => {
		setIsNewCategory(false);
	};
	const onSubmitCategory = async (data) => {
		requests(`${PATH.CATEGORIES}`, METHOD.POST, {category: data})
			.then((data) => {
				dispatch(addCategory(data));
				setIsSuccess(true);
				setTimeout(() => {
					setIsSuccess(false);
				}, 2000);
			}).catch((err) => {
			setErrorServer(data.error);
			console.error(ERROR.CATEGORY_NOT_FOUND, err);
		});
		resetCategory();
		setIsNewCategory(false);
	};
	const handlerNewCategoryOK = handleSubmitCategory(onSubmitCategory);
	return (
		<aside className={className}>
			<div className="form-container">
				{isSuccess && <ToolTip message={SUCCESS.RECORD_CONFIRM}
									   success="true"/>}
				{!isFormValid && <ToolTip message={ERROR.FORM_NOT_VALID}/>}
				{errorMessage && <ToolTip message={errorMessage}/>}
				{
					!isNewCategory && <ButtonAddNewComponent
						type="button"
						width="260px"
						onClick={handleAddNewCategory}
					>
						+ New Category
					</ButtonAddNewComponent>
				}
				{
					isNewCategory &&
					<div className="new-category">
						<div>
							<label className="aside-label"
								   htmlFor="newCategory">New Category</label>
							<Input type="text"
								   name="newCategory"
								   id="newCategory"
								   autoComplete="category"
								   placeholder="new category..."
								   width="250px"
								   margin="0"
								   padding="4px"
								   background="#eae5e5"
								   {...registerCategory('newCategory', {
									   onChange: () => setErrorServer(null),
								   })} />
						</div>
						<div className="new-category-buttons">
							<div className="new-category-button-ok">
								<Button width="120px"
										fontSize="10px"
										onClick={handlerNewCategoryOK}>OK</Button>
							</div>
							<div className="new-category-button-cancel">
								<Button width="120px"
										fontSize="10px"
										onClick={handlerNewCategoryCancel}>Cancel</Button>
							</div>
						</div>
					</div>
				}
				<form id="order-from"
					  onSubmit={handleSubmit(onSubmit)}>
					<div className="aside-form-container">
						<label className="aside-label"
							   htmlFor="name">Name</label>
						<Input type="text"
							   name="name"
							   id="name"
							   autoComplete="given-name"
							   placeholder="name..."
							   width="250px"
							   margin="0"
							   padding="4px"
							   background="#eae5e5"
							   {...register('name', {
								   onChange: () => setErrorServer(null),
							   })} />
					</div>
					<div className="aside-form-container">
						<label className="aside-label"
							   htmlFor="category">Category</label>
						<StyleSelect
							id="category"
							autoComplete="category"
							value={selectedCategory}
							onChange={onCategoryChanged}
						>
							<option value="">Select category</option>
							{
								categories.length > 0 && categories.map((category) => (
									<option key={category.id}
											value={category.id}>{category.name}</option>
								))
							}
						</StyleSelect>
					</div>
					<div className="aside-form-container">
						<label className="aside-label"
							   htmlFor="price">Price</label>
						<Input type="text"
							   name="price"
							   id="price"
							   autoComplete="price"
							   placeholder="price..."
							   width="250px"
							   margin="0"
							   padding="4px"
							   background="#eae5e5"
							   {...register('price', {
								   onChange: () => setErrorServer(null),
							   })} />
					</div>

					<div className="aside-form-container">
						<label className="aside-label"
							   htmlFor="quantity">Quantity</label>
						<Input type="quantity"
							   name="quantity"
							   id="quantity"
							   autoComplete="quantity"
							   placeholder="quantity..."
							   width="250px"
							   margin="0"
							   padding="4px"
							   background="#eae5e5"
							   {...register('quantity', {
								   onChange: () => setErrorServer(null),
							   })} />
					</div>
					<div className="aside-footer-buttons">
						<Button type="button"
								onClick={handlerProductCancel}
						>
							Cancel
						</Button>
						<Button type="submit"
								disabled={isLoading || !isFormValid}
						>
							{isLoading ? 'Loading...' : 'Confirm'}
						</Button>
					</div>
					<div className="aside-footer-button-new">
						<Button type="button"
								width="100%"
								fontSize="14px"
								onClick={handlerProductCancel}>New</Button>
					</div>
				</form>
				{errorMessage &&
					<AuthErrorForm width="100%">{errorMessage}</AuthErrorForm>
				}
			</div>
		</aside>
	);
};
export const AdminAside = styled(AdminAsideComponent)`
	padding: 10px;

	.aside-form-container {
		display: flex;
		flex-direction: column;
		margin-bottom: 10px;
	}

	.new-category-buttons {
		display: flex;
		align-items: center;
		gap: 10px;
		margin-bottom: 10px;
		padding: 5px;
	}

	.aside-footer-buttons {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 10px;
		margin-bottom: 10px;
		padding: 5px;
	}

	.aside-label {
		font-weight: bolder;
		font-size: 14px;
	}
`;
AdminAsideComponent.propTypes = {
	className: PropTypes.string,
};
