import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Button } from '../button/button.jsx';
import { selectModalCancel, selectModalConfirm, selectModalOpen, selectModalText } from '../../redux/selectors';

const ModalComponent = ({ className }) => {
	const isOpen = useSelector(selectModalOpen);
	const text = useSelector(selectModalText);
	const onConfirm = useSelector(selectModalConfirm);
	const onCancel = useSelector(selectModalCancel);
	if (!isOpen) return null;
	return (
		<div className={className}>
			<div className="overlay"></div>
			<div className="box">
				<h3>{text}</h3>
				<div className="buttons">
					<Button width="120px"
							onClick={onConfirm}>Confirm</Button>
					<Button width="120px"
							onClick={onCancel}>Cancel</Button>
				</div>
			</div>
		</div>
	);
};
export const Modal = styled(ModalComponent)`
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	z-index: 20;

	& .overlay {
		position: absolute;
		width: 100%;
		height: 100%;
		background-color: rgb(0, 0, 0, 0.8);
	}

	& .box {
		position: relative;
		text-align: center;
		top: 50%;
		width: 400px;
		margin: auto;
		padding: 0 20px 20px;
		background-color: #5f5f5f;
		border: 1px solid #3eb748;
		transform: translate(0, -50%);
		z-index: 30;
	}

	& .buttons {
		display: flex;
		justify-content: space-around;
	}

	h3{
		margin-bottom: 5px;
	}

`;
ModalComponent.propTypes = {
	className: PropTypes.string,
};
