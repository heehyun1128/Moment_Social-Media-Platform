from ..models import db, likes, environment, SCHEMA
from sqlalchemy.sql import text

def seed_liked_posts():
  liked_posts = [
    likes(user_id = 1, post_id = 6),
    likes(user_id = 1, post_id = 5),
    likes(user_id = 1, post_id = 7),
    likes(user_id = 1, post_id = 8),
    likes(user_id = 2, post_id = 1),
    likes(user_id = 2, post_id = 2),
    
  ]
  db.session.add_all(liked_posts)
  db.session.commit()

def undo_liked_posts():
  if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.likes RESTART IDENTITY CASCADE;")
  else:
        db.session.execute(text("DELETE FROM liked posts"))

  db.session.commit()
