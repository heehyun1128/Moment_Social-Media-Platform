import React, { useEffect } from 'react'
import './CommentCard.css'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSingleComment } from '../../../store/comment'
import OpenModalButton from '../../OpenModalButton'
import EditCommentModal from '../CommentModal/EditCommentModal'
import DeleteCommentModal from '../CommentModal/DeleteCommentModal'



const CommentCard = ({ comment }) => {
  // const singleComment = useSelector(state => state.comments?.singleComment)
  console.log(comment?.commentImages)
  const sessionUser = useSelector((state) => state.session.user)
  // const commentImages = useSelector(state => state.comments?.singleComment?.commentImages)
  const dispatch = useDispatch()

  // console.log(commentImages)
  useEffect(() => {
    dispatch(fetchSingleComment(comment.id))
  }, [dispatch])

  // console.log(singleComment?.commentImages)
  // singleComment?.commentImages.forEach(c => console.log(c.commentImageUrl))
  // if (!singleComment) {
  //   return null
  // }
  return (
    <div id='comment-card-div'>

      <div id="comment-creator-div">
        <div id='comment-creator-pic-div'>
          {comment?.commentCreator?.profileImage ?
            <img src={comment?.commentCreator?.profileImage} alt="" />
            : <i class="fa-solid fa-user fa-lg"></i>
          }
          {/* {comment.commentCreator?.profileImage ?
            <img src={comment.commentCreator?.profileImage} alt="" />
            : <i class="fa-solid fa-user fa-lg"></i>
          } */}
          
        </div>
        {comment?.commentCreator?.username && <p id="comment-creator-username">{comment?.commentCreator?.username}</p>}

        {/* {comment && comment.commentCreator && comment.commentCreator.username && <p id="comment-creator-username">{comment.commentCreator.username}</p>} */}

      </div>
      <div id="comment-content-div">
        <div id="comment-content">{comment?.content}</div>

        {/* <div id='comment-img-div'>{singleComment?.commentImages && singleComment?.commentImages?.map(image =>
          <img src={image.commentImageUrl} alt="" />
        )}</div> */}
        <div id='comment-img-div'>{comment?.commentImages && comment?.commentImages?.map(image =>
          <img src={image?.commentImageUrl} alt="" />
        )}</div>
      </div>
      <div>
        {sessionUser && comment?.userId === sessionUser?.id &&
          <><OpenModalButton
            buttonText="Edit Comment"

            modalComponent={<EditCommentModal comment={comment} />}

          />
            <OpenModalButton
              buttonText="Delete Comment"

              modalComponent={<DeleteCommentModal commentId={comment?.id} />}

            />
          </>
        }
      </div>

    </div>
  )
}

export default CommentCard