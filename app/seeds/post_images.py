# https://cdn.pixabay.com/photo/2015/10/30/20/13/sunrise-1014712_1280.jpg


from ..models import db, Post, environment, SCHEMA
from datetime import datetime
from sqlalchemy.sql import text

curr_date = datetime.now()


def seed_posts(all_users):
  posts=[

    Post(
      title= 'Happy Friday',
      content= "Wishing everyone a great weekend!",
      creator_id=1 ,
      created_at=curr_date,
      updated_at=curr_date
    ),
    Post(
      title= 'Happy Friday',
      content= "Wishing everyone a great weekend!",
      creator_id=1 ,
      created_at=curr_date,
      updated_at=curr_date
    ),
    Post(
      title= 'Happy Friday',
      content= "Wishing everyone a great weekend!",
      creator_id=1 ,
      created_at=curr_date,
      updated_at=curr_date
    ),
  ]