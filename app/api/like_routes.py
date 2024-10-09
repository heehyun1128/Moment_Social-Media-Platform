from flask import Blueprint
from app.models import Post, User, db
from flask_login import login_required,current_user

like_routes=Blueprint('likes',__name__)

@like_routes.route('/<int:postId>',methods=['DELETE'])
@login_required
def delete_like(postId):
  """
  remove a like
  """
  post=Post.query.get(postId)
  if not post:
    return {'errors': "Post not found"}, 404
  if current_user not in post.like_users:
    return {"error": 'Liked post not found'}, 401
  
  post.like_users.remove(current_user)
  db.session.commit()

  post.numOfLikes = len(post.like_users)

  return post.to_dict()
  # return {"message":"Successfully removed like on the post."}