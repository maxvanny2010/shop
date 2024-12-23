import styled from 'styled-components';
import PropTypes from 'prop-types';
import {useEffect, useState} from 'react';

import {Comment} from './index.jsx';
import {Icon} from '../../../../component';
import {useDispatch, useSelector} from 'react-redux';
import {selectProduct, selectUserRole} from '../../../../redux/selectors';
import {addCommentAsync, setCommentsAsync} from '../../../../redux/action';
import {ROLE} from '../../../../utils';
import {checkAccess} from '../../../../redux/utils';

export const CommentContainer = ({className}) => {
	const dispatch = useDispatch();
	const roleId = useSelector(selectUserRole);
	const {id, comments = []} = useSelector(selectProduct);
	const isGuest = checkAccess([ROLE.GUEST], roleId);
	const [newComment, setNewComment] = useState('');
	useEffect(() => {
		if (comments.length < 1) dispatch(setCommentsAsync(id));
	}, [comments.length, dispatch, id]);
	const handlerCommentAdd = (id, content) => {
		dispatch(addCommentAsync(id, content));
		setNewComment('');
	};
	return (
		<div className={className}>
			{!isGuest ? (
				<div className="new-comment">
			<textarea
				name="comment"
				value={newComment}
				placeholder="comments..."
				onChange={({target}) =>
					setNewComment(target.value)}>
			</textarea>
					<Icon
						id="fa-paper-plane-o"
						margin="0 0 0 10px"
						size="18px"
						onClick={() => {
							handlerCommentAdd(id, newComment);
						}}
					/>
				</div>
			) : null}
			<div className="comments">
				{
					comments.length > 0 && comments.map((comment) => (
						<Comment
							key={comment.id}
							comment={comment}
						/>
					))
				}
			</div>
		</div>
	);
};
export const Comments = styled(CommentContainer)`
	width: 580px;
	margin: 0 auto;

	& .new-comment {
		display: flex;
		width: 100%;
		margin: 20px 0 0;
	}

	& .new-comment textarea {
		width: 550px;
		resize: none;
		height: 120px;
		color: black;
		background: #e3dede;
	}
`;
CommentContainer.propTypes = {
	className: PropTypes.string,
	comments: PropTypes.array,
	postId: PropTypes.string,
};
