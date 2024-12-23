import styled from 'styled-components';
import PropTypes from 'prop-types';

export const CounterComponent = ({ className, counter, setCounter }) => {
	const handleIncrement = () => {
		setCounter((prevCount) => prevCount + 1);
	};

	const handleDecrement = () => {
		setCounter((prevCount) => (prevCount > 1 ? prevCount - 1 : prevCount));
	};

	return (
		<div className={className}>
			<button
				className="button-minus"
				onClick={handleDecrement}
				disabled={counter <= 1}
			>
				-
			</button>
			<span className="count">{counter}</span>
			<button className="button-plus"
					onClick={handleIncrement}>
				+
			</button>
		</div>
	);
};

export const Counter = styled(CounterComponent)`
	display: flex;
	align-items: center;
	justify-content: flex-start;
	transition: transform 0.1s ease;

	.button-plus:hover,
	.button-minus:hover {
		background: #007bff;
	}

	.button-plus:active,
	.button-minus:active {
		transform: scale(0.95);
	}

	.button-minus,
	.button-plus {
		font-size: ${({ sizeFactor }) => `calc(20px * ${sizeFactor})`};
		padding: ${({ sizeFactor }) => `calc(5px * ${sizeFactor}) calc(20px * ${sizeFactor})`};
		background-color: #0567ce;
		color: white;
		border: none;
		border-radius: 4px;
		box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
		text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);

		&:disabled {
			background-color: #cccccc;
			cursor: not-allowed;
		}
	}

	& span.count {
		font-size: ${({ sizeFactor }) => `calc(24px * ${sizeFactor})`};
		font-weight: bold;
		min-width: ${({ sizeFactor }) => `calc(60px * ${sizeFactor})`};
		text-align: center;
	}
`;

CounterComponent.propTypes = {
	className: PropTypes.string,
	counter: PropTypes.number.isRequired,
	setCounter: PropTypes.func.isRequired,
};

Counter.defaultProps = {
	sizeFactor: 1,
};
