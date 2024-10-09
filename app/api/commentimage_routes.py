from .s3_helpers import (
    upload_file_to_s3, get_unique_filename,remove_file_from_s3)
from flask import Blueprint,jsonify
from flask_login import login_required
from app.models import Comment,db,CommentImage
from app.api.auth_routes import validation_errors_to_error_messages
#aws
from flask import Blueprint, request

from flask_login import current_user, login_required

commentimage_routes = Blueprint('commentimages', __name__)


@commentimage_routes.route('/<int:imageId>',methods=['DELETE'])
@login_required
def delete_commentimage(imageId):
  """
  DELETE A comment IMAGE
  """
  
  image=CommentImage.query.get(imageId)

  if not image:
    return {'errors':'404 Image not found'},404

  remove_file_from_s3(image.comment_image_url)
  db.session.delete(image)
  db.session.commit()
  return {'message':'Comment image successfully deleted!'},200


