import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { PATH } from '../../utils/index.jsx';
import { StyledLink } from '../link-styled/link-styled.jsx';
import { selectCategories, selectProduct } from '../../redux/selectors/index.jsx';

const createLinks = (path, categories, product) => {
	let links = [{ name: 'Home', path: PATH.HOME }];
	if (location.pathname.includes('categories')) {
		const id = location.pathname.split('/')[2];
		const name = categories.find(category => category.id === id)?.name;
		links.push({ name, path });
	}
	if (location.pathname.split('/')[1].includes('products')) {
		if (product.id) {
			const { name, category } = product;
			let categoryName = category.name;
			links.push({
				name: categoryName,
				path: `${PATH.CATEGORIES}/${category.id}${PATH.PRODUCTS}`,
			});
			links.push({ name, path });
		}
	}
	if (location.pathname.includes(PATH.CARTS)) {
		links.push({ name: 'Carts', path });
	}
	if (location.pathname.includes(PATH.ORDERS)) {
		links.push({ name: 'Orders', path });
	}
	if (location.pathname.includes(PATH.USERS)) {
		links.push({ name: 'Users', path });
	}
	if (location.pathname.includes(PATH.ADMIN)) {
		links.push({ name: 'Admin', path });
	}
	return links;
};
const HeaderNavComponent = ({ className }) => {
	const categories = useSelector(selectCategories);
	const product = useSelector(selectProduct);
	const location = useLocation();
	const [links, setLinks] = useState([]);
	useEffect(() => {
		setLinks(createLinks(location.pathname, categories, product));
	}, [categories, location, product]);

	return (
		<div className={className}>
			<div className="container">
				<div className="current-path">
					<div className="breadcrumbs">
						{links.map((link, index) => (
							<span
								key={index}>
              					<StyledLink to={link.path}>{link.name}</StyledLink>
								{index < links.length - 1 && ' | '}
            				</span>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export const HeaderNav = styled(HeaderNavComponent)`
	background: #111111;
	color: #f5efef;

	.container {
		width: 100%;
		max-width: 1200px;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 30px;
	}

	.current-path {
		font-size: 12px;
		color: #ffffff;
	}

	.current-path span {
		font-weight: bold;
		color: #eaece6;
	}

	.breadcrumbs {
		margin-left: 21px;
	}
`;

HeaderNavComponent.propTypes = {
	className: PropTypes.string,
};
