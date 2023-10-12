from flask import Blueprint,jsonify
from flask_login import login_required
from app.forms import PostForm,PostImageForm,CommentForm
from app.models import Post,db,PostImage,Comment,User,CommentImage
from app.api.auth_routes import validation_errors_to_error_messages
#aws
from flask import Blueprint, request

from flask_login import current_user, login_required
from .s3_helpers import (
    upload_file_to_s3, get_unique_filename,remove_file_from_s3)

post_routes = Blueprint('posts', __name__)

# GET SINGLE POST
@post_routes.route('/<int:postId>')
def get_post_detail(postId):
  # check to see if post exists
  post=Post.query.get(postId)
  if not post:
    return {"errors":'Post not found'},404
  post_images=post.post_images
  post_comments=post.comments

  comments_data =[]
  for comment in post_comments:
    if comment:
      print('ooooooooo',comment.to_dict())
      images=CommentImage.query.filter_by(comment_id=comment.id)
      comment_image_urls=[]
      for img in images:
          imgUrl=img.comment_image_url
          comment_image_urls.append(img.comment_image_url)
    
      comment_data={
        'id':comment.id,
        'content':comment.content,
        'commentCreator':User.query.get(comment.user_id).to_dict(),
        'commentImages':comment_image_urls,
      }
      comments_data.append(comment_data)

  data={
    'id':postId,
    'title':post.title,
    'content':post.content,
    'creatorId':post.creator_id,
    'creator':post.creator.to_dict(),
    'createdAt':post.created_at,
    'updatedAt':post.updated_at,
    'postImages':[img.to_dict() for img in post_images],
    'postComments':comments_data,
    'numOfComments':len(post_comments)
  }

  return data
  
# GET ALL POSTS & POST IMAGES & POST COMMENTS
@post_routes.route('/')
def get_all_posts():
  posts=Post.query.all()
  post_dict={}
  for post in posts:
    data=post.to_dict()
    images = post.post_images
    creator=post.creator
    comments=post.comments

    for img in images:
      if img.preview:
        data['previewImg'] = img.post_image_url
        break
    data['creator']=creator.to_dict()
  
    data['comments'] = []
    for comment in comments:
      if comment:
        comment_data=comment.to_dict()
        comment_data['commentCreator'] = comment.user.to_dict()
        data['comments'].append(comment_data)
       
 
    post_dict[str(post.id)] = data
  return {"Posts": post_dict}

  # return({'Posts':{idx+1:post.to_dict() for idx,post in enumerate(posts)}})


# GET ALL POST COMMENTS
@post_routes.route('/<int:postId>/comments')
def get_all_postcomments(postId):
  post=Post.query.get(postId)
  comments=post.comments

  comments_data =[]
  for comment in comments:
    if comment:
      images=CommentImage.query.filter_by(comment_id=comment.id)
      comment_image_urls=[]
      for img in images:
          imgUrl=img.comment_image_url
          comment_image_urls.append(img.comment_image_url)
      comment_image_obj={
         'commentImageUrl':comment_image_urls
      }
      comment_data={
        'id':comment.id,
        'postId':post.id,
        'content':comment.content,
        'commentCreator':User.query.get(comment.user_id).to_dict(),
        'commentImages':[comment_image_obj],
        'createdAt':comment.created_at,
        'updatedAt':comment.updated_at,
        'profileImage':comment.user.profile_image_url,
        'username':comment.user.username,
        'userId':comment.user_id
      }
      comments_data.append(comment_data)

  return {'Comments':comments_data}
  # return {'Comments':comments_data}

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
        return {'errors':form.errors}
  return {'errors': validation_errors_to_error_messages(form.errors)}, 400

#CREATE A POST COMMENT
@post_routes.route('/<int:postId>/comments/new',methods=['POST'])
@login_required
def post_comment(postId):
  post=Post.query.get(postId)
 
  if not post:
    return {'errors':'Post not found'},404
  
  
  form = CommentForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    new_comment=Comment(
      content=form.data['content'],
      user_id=current_user.id,
      post_id=postId,
      
    )
    db.session.add(new_comment)
    db.session.commit() 
    comment_creator = {
       'id':new_comment.user.id,
       'username':new_comment.user.username,
       'profileImage':new_comment.user.profile_image_url,
    }
    post_obj={
       'id':post.id,
       'title':post.title,
       'content':post.content
    }
    comment_obj = {
       'id':new_comment.id,
       'content':new_comment.content,
       'userId':new_comment.user_id,
       'postId':new_comment.post_id,
       'createdAt':new_comment.created_at,
       'updatedAt':new_comment.updated_at,
       'post':post_obj,
       'commentCreator':comment_creator,
       'commentImages':new_comment.comment_images,
    }
    return comment_obj
  return {'errors': validation_errors_to_error_messages(form.errors)}, 400


# EDIT A POST IMAGE
@post_routes.route('/<int:postId>/images/<int:imageId>/edit',methods=['PUT'])
@login_required
def edit_image(postId,imageId):
  post=Post.query.get(postId)
  postImage = PostImage.query.get(imageId)
  # print('000000000000000000000000',postImage.to_dict())
  # print('12345678909876543234567',form.data['preview'])
  if not post:
    return {'errors':'Post not found'},404
  if not postImage:
    return {'errors':'404 not found'},404
  if post.creator_id != current_user.id:
    return {'errors':'Unauthorized'},401
  
  form = PostImageForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  print('qqqqqqqqqqqqqqqq',form.data['preview'])
  if form.validate_on_submit():
    imgFile=form.data["post_image_url"] 
    imgFile.filename = get_unique_filename(imgFile.filename)
    upload = upload_file_to_s3(imgFile)

    if "url" not in upload:
            print({'errors': "post image is not a valid url"})
    url = upload["url"]
   
    postImage.preview=form.data['preview']
    postImage.post_image_url=url
  
    db.session.commit()
    return postImage.to_dict()
  elif postImage != None:
    postImage.preview=form.data['preview']
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
   
    post.title=form.data['title']
    post.content=form.data['content']
    db.session.commit()
    return post.to_dict()
  return {'errors': validation_errors_to_error_messages(form.errors)}, 400



#DELETE A POST
@post_routes.route('/<int:postId>',methods=['DELETE'])
@login_required
def delete_post(postId):
  post=Post.query.get(postId)
  print('QQQQQQQQQQQ',post)
  if not post:
    return {'errors':'404 Post not found'},404
  if post.creator_id != current_user.id:
    return {'errors':'You do not have the authorization to delete the post'},403
  
  db.session.delete(post)
  db.session.commit()
  return {'message':'Post successfully deleted!'},200


