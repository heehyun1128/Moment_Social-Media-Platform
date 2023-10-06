from flask import Blueprint,jsonify
from flask_login import login_required
from app.forms import PostForm,PostImageForm
from app.models import Post,db,PostImage
from app.api.auth_routes import validation_errors_to_error_messages
#aws
from flask import Blueprint, request

from flask_login import current_user, login_required
from .s3_helpers import (
    upload_file_to_s3, get_unique_filename)

post_routes = Blueprint('posts', __name__)

# GET SINGLE POSTS
@post_routes.route('/<int:postId>')
def get_post_detail(postId):
  # check to see if post exists
  post=Post.query.get(postId)
  if not post:
    return {"errors":'Post not found'},404
  post_images=post.post_images
  post_comments=post.comments


  data={
    'id':postId,
    'title':post.title,
    'content':post.content,
    'creatorId':post.creator_id,
    'creator':post.creator.to_dict(),
    'createdAt':post.created_at,
    'updatedAt':post.updated_at,
    'postImages':[img.to_dict() for img in post_images],
    'postComments':[comment.to_dict() for comment in post_comments],
    'numOfComments':len(post_comments)
  }

  return data
  
# GET ALL POSTS
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




# CREATE A POST
@post_routes.route('/new',methods=['POST'])
@login_required
def post_post():
  form=PostForm()
  
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    new_post=Post(
      title=form.data['title'],
      content=form.data['content'],
      creator_id=current_user.id
    )
    db.session.add(new_post)
    db.session.commit()
    return new_post.to_dict()
  return {'errors': validation_errors_to_error_messages(form.errors)}, 400

# CREATE A POST IMAGE
@post_routes.route('/<int:postId>/images',methods=['POST'])
@login_required
def post_image(postId):
  print('innnnnnnnnnnnn')
  post=Post.query.get(postId)
  if not post:
    return {'errors':'Post not found'},404
  if post.creator_id != current_user.id:
    return {'errors':'Unauthorized'},401
  
  form = PostImageForm()
  print('ooooooo',form.data)

  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    image=form.data['post_image_url']
    image.filename = get_unique_filename(image.filename)
    print('imaggggggggeeeee',image)
    upload = upload_file_to_s3(image)

    if "url" not in upload:
            return({'errors': "The image url is not valid"})
    url = upload["url"]
    new_image=PostImage(
      preview=form.data['preview'],
      post_image_url=url,
      post_id=form.data['post_id']
    )
    

    db.session.add(new_image)
    db.session.commit()
    return jsonify({'message': 'Form submitted successfully'})

  if form.errors:
        print('errrrrrrrrrrrr',form.errors)
  return {'errors': validation_errors_to_error_messages(form.errors)}, 400

# EDIT A POST IMAGE
@post_routes.route('/<int:postId>/images/<int:imageId>/edit',methods=['PUT'])
@login_required
def edit_image(postId,imageId):
  post=Post.query.get(postId)
  postImage = PostImage.query.get(imageId)
  if not post:
    return {'errors':'Post not found'},404
  if post.creator_id != current_user.id:
    return {'errors':'Unauthorized'},401
  
  form = PostImageForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    postImage.preview=form.data['preview']
    postImage.post_image_url=form.data['post_image_url']
  
   
    db.session.commit()
    return postImage.to_dict()
  return {'errors': validation_errors_to_error_messages(form.errors)}, 400

# EDIT A POST
@post_routes.route('/<int:postId>/edit',methods=['PUT'])
@login_required
def edit_post(postId):
  post = Post.query.get(postId)
  if not post:
    return {'errors':'Post not found'},404
  if post.creator_id != current_user.id:
    return {'errors':'Unauthorized'},401
  
  form=PostForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    updated_post=Post(
      title=form.data['title'],
      content=form.data['content']
    )
    db.session.commit()
    return post.to_dict()
  return {'errors': validation_errors_to_error_messages(form.errors)}, 400

#DELETE A POST IMAGE
@post_routes.route('/<int:postId>/images/<int:imageId>',methods=['DELETE'])
@login_required
def delete_postimage(postId,imageId):
  post=Post.query.get(postId)
  if not post:
    return {'errors':'404 Post not found'},404
  if post.creator_id != current_user.id:
    return {'errors':'You do not have the authorization to delete the post'},403
  
  image=PostImage.query.get(imageId)

  if not image:
    return {'errors':'404 Image not found'},404
  post.post_images.remove(image)
  db.session.delete(image)
  db.session.commit()
  return {'message':'Post image successfully deleted!'},200

#DELETE A POST
@post_routes.route('/<int:postId>',methods=['DELETE'])
@login_required
def delete_post(postId):
  post=Post.query.get(postId)
  if not post:
    return {'errors':'404 Post not found'},404
  if post.creator_id != current_user.id:
    return {'errors':'You do not have the authorization to delete the post'},403
  
  db.session.delete(post)
  db.session.commit()
  return {'message':'Post successfully deleted!'},200