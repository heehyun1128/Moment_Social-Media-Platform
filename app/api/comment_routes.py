from flask import Blueprint,jsonify
from flask_login import login_required
from app.forms import CommentForm,CommentImageForm
from app.models import Comment,db,CommentImage,User
from app.api.auth_routes import validation_errors_to_error_messages
#aws
from flask import Blueprint, request

from flask_login import current_user, login_required
from .s3_helpers import (
    upload_file_to_s3, get_unique_filename,remove_file_from_s3)

comment_routes = Blueprint('comments', __name__)


# GET SINGLE COMMENT
@comment_routes.route('/<int:commentId>')
def get_comment_detail(commentId):
  # check to see if comment exists
  comment=Comment.query.get(commentId)
  if not comment:
    return {"errors":'comment not found'},404
  comment_images=comment.comment_images
  user=User.query.get(comment.user_id)


  data={
    'id':commentId,
    'content':comment.content,
    'userId':comment.user_id,
    'postId':comment.post_id,
    'createdAt':comment.created_at,
    'updatedAt':comment.updated_at,
    'commentImages':[img.to_dict() for img in comment_images],
    'username':user.username,
    'profileImage':user.profile_image_url
  }
  print('000000000',data)

  return data
  

# CREATE A comment IMAGE
@comment_routes.route('/<int:commentId>/images',methods=['POST'])
@login_required
def comment_image(commentId):
 
  comment=Comment.query.get(commentId)
  if not comment:
    return {'errors':'comment not found'},404
  if comment.user_id != current_user.id:
    return {'errors':'Unauthorized'},401
  
  form = CommentImageForm()

  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    image=form.data['comment_image_url']
    image.filename = get_unique_filename(image.filename)
   
    upload = upload_file_to_s3(image)

    if "url" not in upload:
            return({'errors': "The image url is not valid"})
    url = upload["url"]
    new_image=CommentImage(
      comment_image_url=url,
      comment_id=form.data['comment_id']
    )

    db.session.add(new_image)
    db.session.commit()
    image_list = [img.to_dict() for img in [new_image]]
    
    print('PRINTTTTTTTTTTTTTTTTTT',new_image.to_dict())
    return {'commentImages':image_list}

  if form.errors:
        return {'errors':form.errors}
  return {'errors': validation_errors_to_error_messages(form.errors)}, 400


#EDIT A COMMENT

@comment_routes.route('/<int:commentId>/edit',methods=['PUT'])
@login_required
def edit_comment(commentId):
  comment=Comment.query.get(commentId)
  
  if not comment:
    return {'errors':'comment not found'},404
  if comment.user_id != current_user.id:
    return {'errors':'Unauthorized'},401

  form=CommentForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
      comment.content=form.data['content']
      db.session.commit()

      comment_creator = {
       'id':comment.user.id,
       'username':comment.user.username,
       'profileImage':comment.user.profile_image_url,
    }
      post_obj={
       'id':comment.post.id,
       'title':comment.post.title,
       'content':comment.post.content
    }
      comment_obj = {
       'id':comment.id,
       'content':comment.content,
       'userId':comment.user_id,
       'postId':comment.post_id,
       'createdAt':comment.created_at,
       'updatedAt':comment.updated_at,
       'post':post_obj,
       'commentCreator':comment_creator,
       'commentImages':[img.to_dict() for img in comment.comment_images],
    }
      db.session.commit()
      print('YYYYYYYYOOOOOOOOUUUUUUUUUUUUUUUUU',comment_obj)
      return comment_obj
  return {'errors': validation_errors_to_error_messages(form.errors)}, 400



# EDIT A comment IMAGE
@comment_routes.route('/<int:commentId>/images/<int:imageId>/edit',methods=['PUT'])
@login_required
def edit_image(commentId,imageId):
  comment=Comment.query.get(commentId)
  print('COMMENTTTTTTTTT',comment)
  commentImage = CommentImage.query.get(imageId)
  print('DDDDDDDDDDDD',commentImage)
  # print('000000000000000000000000',CommentImage.to_dict())
  # print('12345678909876543234567',form.data['preview'])
  if not comment:
    return {'errors':'comment not found'},404
  if not commentImage:
    return {'errors':'404 not found'},404
  if comment.user_id != current_user.id:
    return {'errors':'Unauthorized'},401

  form = CommentImageForm()
  form['csrf_token'].data = request.cookies['csrf_token']

 
  if form.validate_on_submit():
    imgFile=form.data["comment_image_url"]
    imgFile.filename = get_unique_filename(imgFile.filename)
    upload = upload_file_to_s3(imgFile)

    if "url" not in upload:
            print({'errors': "Comment image is not a valid url"})
    url = upload["url"]

    
    commentImage.comment_image_url=url

    db.session.commit()
    return commentImage.to_dict()

  return {'errors': validation_errors_to_error_messages(form.errors)}, 400


#DELETE A COMMENT
@comment_routes.route('/<int:commentId>',methods=['DELETE'])
@login_required
def delete_comment(commentId):
  comment=Comment.query.get(commentId)
  print('QQQQQQQQQQQ',comment)
  if not comment:
    return {'errors':'404 Comment not found'},404
  if comment.user_id != current_user.id:
    return {'errors':'You do not have the authorization to delete the comment'},403
  
  db.session.delete(comment)
  db.session.commit()
  
  return {'message':'Comment successfully deleted!'},200