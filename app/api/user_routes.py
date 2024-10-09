from flask import Blueprint,jsonify
from flask_login import login_required
from app.models import User,db,PostImage
from app.forms import SignUpForm
from app.api.auth_routes import validation_errors_to_error_messages
#aws
from flask import Blueprint, request

from flask_login import current_user, login_required
from .s3_helpers import (
    upload_file_to_s3, get_unique_filename)

user_routes = Blueprint('users', __name__)





@user_routes.route('/<int:id>/posts')
# @login_required
def user(id):
    """
    get all posts for the current user
    """
    current_user = User.query.get(id)
    
    if not current_user:
        return {'errors': "User not found"}, 404
    
    user_posts = current_user.posts

    post_dict = {}
    for post in user_posts:
        creator=post.creator
        post_likes=post.like_users
        data=post.to_dict()
        num_likes=len(post_likes)
        data['numOfLikes'] = num_likes
        data['creator']=creator.to_dict()
        #get post images
        post_images=PostImage.query.filter_by(post_id=post.id).all()
        for img in post_images:
            if img.preview:
                data["previewImg"] = img.post_image_url
                break
        data['likeUsers']=[like.to_dict() for like in post_likes] 
        post_dict[str(post.id)] = data

    return post_dict


@user_routes.route('/<int:id>/followers')
@login_required
def get_followers(id):
    """
    get the current user's followers
    """
    curr_user=User.query.get(id)
    if not curr_user:
        return {'errors':"User not found"}, 404
    followers=curr_user.followers
    follower_dict={}

    for follower in followers:
        data=follower.to_dict()
        follower_dict[str(follower.id)]=data
    return follower_dict


@user_routes.route('/<int:id>/followed')
@login_required
def get_followed(id):
    """
    get users who the current user followed
    """
    curr_user=User.query.get(id)
    if not curr_user:
        return {'errors':"User not found"}, 404
    followed_users=curr_user.followed
    followed_dict={}

    for followed in followed_users:
        data=followed.to_dict()
        followed_dict[str(followed.id)]=data
    return followed_dict


@user_routes.route('/<int:id>/likes')
@login_required
def get_likes(id):
    """
    get the posts current user liked
    """
    curr_user=User.query.get(id)
    if not curr_user:
        return {'errors':"User not found"}, 404

    user_like_posts=curr_user.like_posts
    
    
    like_dict = {}

    for like in user_like_posts:
        data = like.to_dict()
        liked_post_likes=like.like_users
        post_images=like.post_images
        for img in post_images:
            if img.preview:
                data["previewImg"] = img.post_image_url
                break
        
    
        data['likeUsers']=[like.to_dict() for like in liked_post_likes]
        num_of_likes = len(liked_post_likes)
        data['numOfLikes']:num_of_likes

        like_dict[str(like.id)] = data
    return like_dict

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



@user_routes.route('/<int:id>/followers/<int:followerId>',methods=['POST'])
@login_required
def add_followers(id,followerId):
    """
    create followers
    """
    curr_user=User.query.get(id)
    if not curr_user:
        return {'errors':"User not found"}, 404
    new_follower=User.query.get(followerId)

    curr_user.followers.append(new_follower)
    db.session.commit()
    return {"message": "Successfully added followers"}


@user_routes.route('/<int:id>/followed/<int:followedId>',methods=['POST'])
@login_required
def add_followed(id,followedId):
    """
    create a followed user
    """
    curr_user=User.query.get(id)
    if not curr_user:
        return {'errors':"User not found"}, 404
    new_followed=User.query.get(followedId)

    curr_user.followed.append(new_followed)
    db.session.commit()
    return {"message": "Successfully followed user"}

@user_routes.route('/<int:id>/profile-update', methods=['PUT'])
@login_required
def update_profile(id):
    """
    Creates a new user and logs them in
    """
    user=User.query.get(id)
    
    if not user:
        return {"errors":'User not found'},404
    if user.id !=current_user.id:
        return {'errors':'Unauthorized'},401
    form = SignUpForm()

   
    image=request.files.get('profile_image_url')
    if image:
       
        image.filename = get_unique_filename(image.filename)
        
        upload = upload_file_to_s3(image)

        if "url" not in upload:
            url=None
        else:
            user.profile_image_url= upload["url"]
      
    db.session.commit()
      
    return jsonify({"profileImage":user.profile_image_url})


@user_routes.route('/<int:id>/followers/<int:followerId>/delete',methods=['DELETE'])
@login_required
def remove_followers(id,followerId):
    """
    remove followers
    """
    curr_user=User.query.get(id)
    if not curr_user:
        return {'errors':"User not found"}, 404
    del_follower=User.query.get(followerId)

    curr_user.followers.remove(del_follower)
    db.session.commit()
    return {"message": "Successfully removed followers"}


@user_routes.route('/<int:id>/followed/<int:followedId>/delete',methods=['DELETE'])
@login_required
def remove_followed(id,followedId):
    """
    remove followed
    """
    curr_user=User.query.get(id)
    if not curr_user:
        return {'errors':"User not found"}, 404
    del_followed=User.query.get(followedId)

    curr_user.followed.remove(del_followed)
    db.session.commit()
    return {"message": "Successfully removed followed user"}


