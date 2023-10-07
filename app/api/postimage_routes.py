from .s3_helpers import (
    upload_file_to_s3, get_unique_filename,remove_file_from_s3)
from flask import Blueprint,jsonify
from flask_login import login_required
from app.forms import PostForm,PostImageForm
from app.models import Post,db,PostImage
from app.api.auth_routes import validation_errors_to_error_messages
#aws
from flask import Blueprint, request

from flask_login import current_user, login_required

postimage_routes = Blueprint('postimages', __name__)

#DELETE A POST IMAGE
@postimage_routes.route('/<int:imageId>',methods=['DELETE'])
@login_required
def delete_postimage(imageId):

  
  image=PostImage.query.get(imageId)

  if not image:
    return {'errors':'404 Image not found'},404

  remove_file_from_s3(image.post_image_url)
  db.session.delete(image)
  db.session.commit()
  return {'message':'Post image successfully deleted!'},200


