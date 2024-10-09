from flask import Blueprint,request

from flask_login import login_required
from app.models import Post,Comment,User,PostImage
from sqlalchemy import or_

search_routes = Blueprint("search", __name__)

@search_routes.route("/")
def search():
  """
  search for a post/comment
  """
  q = request.args.get("q")
  if q:


    result = (Post.query
              .outerjoin(Comment,Comment.post_id==Post.id)
              .outerjoin(User,User.id==Post.creator_id)
              .filter(or_(Post.title.ilike(f'%{q}%'), Post.content.ilike(f'%{q}%'), User.username.ilike(f'%{q}%'), Comment.content.ilike(f'%{q}%')))).limit(100).all()

    search_dict={}
    for post in result:
        data=post.to_dict()
        images = post.post_images
        postCreator = post.creator
        comments = post.comments

        for img in images:
          if img.preview:
            data['previewImg'] = img.post_image_url
            break
        
        data['postImages'] = [image.to_dict() for image in images]
        data['creator']=postCreator.to_dict()

        data['comments'] = []
        for comment in comments:
          if comment:
            comment_data=comment.to_dict()
            comment_data['commentCreator'] = comment.user.to_dict()
            data['comments'].append(comment_data)
        
        search_dict[str(post.id)]=data
    return search_dict

  else:
    result=[]
