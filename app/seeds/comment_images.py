from ..models import db, CommentImage, environment, SCHEMA
from datetime import datetime
from sqlalchemy.sql import text

curr_date = datetime.now()

def seed_commentimages():
  comment_images=[
    CommentImage(
    comment_image_url='https://s3-media0.fl.yelpcdn.com/bphoto/20MHg76Ia4IOSYsDvg4tqg/258s.jpg',
    comment_id=9,
    created_at=curr_date,
    updated_at=curr_date
    ),
    CommentImage(
    comment_image_url='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMcoehXQ7Ij7KZVuJOEr4wXbpgWDaUakyaww&usqp=CAU',
    comment_id=12,
    created_at=curr_date,
    updated_at=curr_date
    ),
    CommentImage(
    comment_image_url='https://images.pexels.com/photos/14205102/pexels-photo-14205102.jpeg?auto=compress&cs=tinysrgb&w=800',
    comment_id=19,
    created_at=curr_date,
    updated_at=curr_date
    ),
    CommentImage(
    comment_image_url='https://images.pexels.com/photos/1709526/pexels-photo-1709526.jpeg?auto=compress&cs=tinysrgb&w=800',
    comment_id=20,
    created_at=curr_date,
    updated_at=curr_date
    ),
    CommentImage(
    comment_image_url='https://images.pexels.com/photos/6717786/pexels-photo-6717786.jpeg?auto=compress&cs=tinysrgb&w=800',
    comment_id=21,
    created_at=curr_date,
    updated_at=curr_date
    ),
    CommentImage(
    comment_image_url='https://images.pexels.com/photos/2531546/pexels-photo-2531546.jpeg?auto=compress&cs=tinysrgb&w=800',
    comment_id=22,
    created_at=curr_date,
    updated_at=curr_date
    ),
  ]
  db.session.add_all(comment_images)
  db.session.commit()
 

def undo_commentimages():
  if environment == 'production':
    db.session.execute(
      f"TRUNCATE table {SCHEMA}.comment_images RESTART IDENTITY CASCADE;")
  else:
    db.session.execute(text("DELETE FROM comment_images"))
  db.session.commit()