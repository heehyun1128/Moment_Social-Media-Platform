from flask import Blueprint
from flask_login import login_required
from app.forms import PostForm
from app.models import Post,db,PostImage
from app.api.auth_routes import validation_errors_to_error_messages
#aws
from flask import Blueprint, request

from flask_login import current_user, login_required
from .s3_helpers import (
    upload_file_to_s3, get_unique_filename)

post_routes = Blueprint('posts', __name__)

@post_routes.route('/')
def get_all_posts():
  posts=Post.query.all()
  post_dict={}
  for post in posts:
    data=post.to_dict()
    images = post.post_images
    creator=post.creator

    for img in images:
      if img.preview:
        data['previewImg'] = img.post_image_url
        break
    data['creator']=creator.to_dict()
    post_dict[str(post.id)] = data
  return {"Posts": post_dict}


 
  # return({'Posts':{idx+1:post.to_dict() for idx,post in enumerate(posts)}})




@post_routes.route('/<int:postId>')
def get_post_detail(postId):
  # check to see if post exists
  post=Post.query.get(postId)
  if not post:
    return {"error":'Post not found'},404
  post_images=post.post_images
  post_comments=post.comments


  data={
    'id':postId,
    'title':post.title,
    'content':post.content,
    'creatorId':post.creator_id,
    'createdAt':post.created_at,
    'updatedAt':post.updated_at,
    'postImages':[img.to_dict() for img in post_images],
    'postComments':[comment.to_dict() for comment in post_comments],
    'numOfComments':len(post_comments)
  }

  return data
  

@post_routes.route('/<int:postId>',methods=['PUT'])
@login_required
def edit_post(postId):
  post = Post.query.get(postId)
  if post.creator_id != current_user.id:
    return {'error':'Unauthorized'},401
  
  form=PostForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    new_post=Post(
      title=form.data['title'],
      content=form.data['content']
    )
    db.session.commit()
    return post.to_dict()
  return {'errors': validation_errors_to_error_messages(form.errors)}, 400