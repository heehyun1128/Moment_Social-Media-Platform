from flask import Blueprint
from flask_login import login_required
from app.models import User,db,PostImage
#aws
from flask import Blueprint, request

from flask_login import current_user, login_required
from .s3_helpers import (
    upload_file_to_s3, get_unique_filename)

user_routes = Blueprint('users', __name__)





@user_routes.route('/<int:id>/posts')
# @login_required
def user(id):
  
    current_user = User.query.get(id)
    
    if not current_user:
        return {'errors': "User not found"}, 404
    
    user_posts = current_user.posts

    post_dict = {}
    for post in user_posts:
        data=post.to_dict()
        #get post images
        post_images=PostImage.query.filter_by(post_id=post.id).all()
        for img in post_images:
            if img.preview:
                data["previewImg"] = img.post_image_url
                break
        post_dict[str(post.id)] = data
        print('OOOOOOOOOOOOOOOOOOO',post_dict)
    return post_dict

@user_routes.route('/<int:id>')
def get_user(id):
    user_in_search = User.query.get(id)
    if not user_in_search:
        return {'errors': "User not found"}, 404
    
    return user_in_search.to_dict()

@user_routes.route('/')
# @login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}

# aws


# @user_routes.route("", methods=["POST"])
# def upload_image():
#     form = ImageForm()
 
#     if form.validate_on_submit():
          
#         image = form.data["image"]
#         image.filename = get_unique_filename(image.filename)
#         upload = upload_file_to_s3(image)
#         print(upload)

#         if "url" not in upload:
#         # if the dictionary doesn't have a url key
#         # it means that there was an error when you tried to upload
#         # so you send back that error message (and you printed it above)
#             return render_template("post_form.html", form=form, errors=[upload])

#         url = upload["url"]
#         new_image = Post(image= url)
#         db.session.add(new_image)
#         db.session.commit()
#         return redirect("/posts/all")

#     if form.errors:
#         print(form.errors)
#         return render_template("post_form.html", form=form, errors=form.errors)

    return render_template("post_form.html", form=form, errors=None)