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