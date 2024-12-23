import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useLayoutEffect, useState } from 'react';

import {
	BlurBackground,
	CartSlider,
	Error,
	Footer,
	Header,
	Login,
	Modal,
	ProtectedRoute,
	Registration,
} from './component';
import { setUser } from './redux/action';
import { OrdersSlider } from './pages/order/components/';
import { Route, Routes, useLocation } from 'react-router-dom';
import { ERROR, PATH, ROLE, STORAGE_USER_DATA, SYMBOLS } from './utils';
import { AdminArticle, AdminAside, Article, ArticleCategory, Aside, Order, Product, Users } from './pages/';
import {
	selectSideCart,
	selectSideLogin,
	selectSideOrders,
	selectSideRegister,
	selectUserRole,
} from './redux/selectors';

const App = styled.div`
	max-width: 100%;
	align-items: stretch;
	height: 100vh;
	display: flex;
	margin: 0 auto;
	flex-direction: column;
	justify-content: space-betweent;
`;
const ArticleWrapper = styled.div`
	flex: 3;
	padding-right: 1rem;
`;

const AsideWrapper = styled.div`
	flex: 1;
`;
const PageContainer = styled.div`
	flex-grow: 1;
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: stretch;
	margin-top: 30px;
`;

const MainContent = styled.main`
	max-width: 1200px;
	margin: 0 auto;
	flex-grow: 1;
	display: flex;
	flex-direction: row;
	padding: 1rem;
`;

export default function Shop() {
	const dispatch = useDispatch();
	const location = useLocation();

	const isAdminRoute = location.pathname.startsWith(PATH.ADMIN);
	const [isInitialized, setIsInitialized] = useState(false);

	const userRole = useSelector(selectUserRole);
	const isSideCart = useSelector(selectSideCart);
	const isSideLogin = useSelector(selectSideLogin);
	const isSideOrders = useSelector(selectSideOrders);
	const isSideRegistered = useSelector(selectSideRegister);

	const isAdmin = userRole === ROLE.ADMIN;

	useLayoutEffect(() => {
		const userData = sessionStorage.getItem(STORAGE_USER_DATA);
		if (!userData) {
			setIsInitialized(true);
			return;
		}
		const currentUser = JSON.parse(userData);
		dispatch(
			setUser({
				...currentUser,
				roleId: Number(currentUser.roleId),
			}),
		);
		setIsInitialized(true);
	}, [dispatch]);

	const renderAside = () => {
		if (!isInitialized) return null;
		return isAdminRoute && isAdmin ? <AdminAside /> : <Aside />;
	};
	const showBlur = isSideLogin || isSideRegistered || isSideCart || isSideOrders;

	if (!isInitialized) {
		return <div>{SYMBOLS.IS_LOADING}</div>;
	}
	return (
		<>
			{showBlur && <BlurBackground />}
			<App>
				<Header />
				<PageContainer>
					<MainContent>
						<AsideWrapper>{renderAside()}</AsideWrapper>
						<ArticleWrapper>
							<Routes>
								<Route path={`${PATH.HOME}`}
									   element={<ArticleCategory />}
								/>
								<Route path={`${PATH.CATEGORIES}/:categoryId${PATH.PRODUCTS}`}
									   element={<Article />}
								/>
								<Route path={`${PATH.PRODUCTS}/:id`}
									   element={<Product />}
								/>
								<Route
									path={`${PATH.ADMIN}`}
									element={
										<ProtectedRoute allowedRoles={[ROLE.ADMIN]}
														userRole={userRole}>
											<AdminArticle />
										</ProtectedRoute>
									}
								/>
								<Route
									path={`${PATH.USERS}`}
									element={
										<ProtectedRoute allowedRoles={[ROLE.ADMIN]}
														userRole={userRole}>
											<Users />
										</ProtectedRoute>
									}
								/>
								<Route
									path={`${PATH.ORDERS}`}
									element={
										<ProtectedRoute allowedRoles={[ROLE.USER]}
														userRole={userRole}>
											<Order />
										</ProtectedRoute>
									}
								/>
								<Route path="*"
									   element={<Error error={ERROR.PAGE_NOT_EXIT} />} />
							</Routes>
						</ArticleWrapper>

					</MainContent>

				</PageContainer>
				<Footer />
				<Modal />
			</App>

			{isSideRegistered && <Registration />}
			{isSideLogin && <Login />}

			{isSideCart && <CartSlider />}
			{isSideOrders && <OrdersSlider />}

		</>
	);
}
