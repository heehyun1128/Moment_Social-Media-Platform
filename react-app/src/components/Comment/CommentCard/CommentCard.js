import React from 'react'
import './CommentCard.css'

const CommentCard = ({ comment }) => {
  console.log(comment.commentImages)
  return (
    <div id='comment-card-div'>

      <div id="comment-creator-div">
        <div id="comment-creator-pic-div">
          {comment.commentCreator.profileImage ? <img src={comment.commentCreator.profileImage
          } alt="" /> : <i class="fa-solid fa-user fa-lg"></i>}

        </div>
        <p id="comment-creator-username">{comment.commentCreator.username}</p>

      </div>
      <div id="comment-content-div">
        <div id="comment-content">{comment.content}</div>
        <div id='comment-img-div'>{comment.commentImages.map(image =>
          <img src={image} alt="" />
        )}</div>
      </div>

    </div>
  )
}

export default CommentCard