from ..models import db, Comment, environment, SCHEMA
from datetime import datetime
from sqlalchemy.sql import text

curr_date = datetime.now()

def seed_comments():
  comments=[
    #1
    Comment(
      content='Happy Friday!',
      user_id=2,
      post_id=1,
      created_at=curr_date,
      updated_at=curr_date
    ),
    #2
    Comment(
      content='Happy Friday!',
      user_id=3,
      post_id=1,
      created_at=curr_date,
      updated_at=curr_date
    ),
    #3
    Comment(
      content='I like Jazz too',
      user_id=3,
      post_id=2,
      created_at=curr_date,
      updated_at=curr_date
    ),
    #4
    Comment(
      content='Thank you for your recommendation.I will go check it out',
      user_id=2,
      post_id=2,
      created_at=curr_date,
      updated_at=curr_date
    ),
    #5
    Comment(
      content='I enjoyed my trip to San Francisco too!',
      user_id=2,
      post_id=3,
      created_at=curr_date,
      updated_at=curr_date
    ),
    #6
    Comment(
      content='I rode bike on the Golden Gate Bridge and it was so much fun!',
      user_id=3,
      post_id=3,
      created_at=curr_date,
      updated_at=curr_date
    ),
    #7
    Comment(
      content='Just wanted to add something - I live near San Francisco and I would love to meet everyone here',
      user_id=1,
      post_id=3,
      created_at=curr_date,
      updated_at=curr_date
    ),
    #8
    Comment(
      content='OMG I LOVE ASHA TOO!!',
      user_id=1,
      post_id=4,
      created_at=curr_date,
      updated_at=curr_date
    ),
    #9
    Comment(
      content='Their match latte is the best',
      user_id=1,
      post_id=4,
      created_at=curr_date,
      updated_at=curr_date
    ),
    #10
    Comment(
      content='I used to live in Berkeley and I went to Asha almost every day.',
      user_id=3,
      post_id=4,
      created_at=curr_date,
      updated_at=curr_date
    ),
    #11
    Comment(
      content='Yi Fang is my favorite boba place.',
      user_id=3,
      post_id=5,
      created_at=curr_date,
      updated_at=curr_date
    ),
    #12
    Comment(
      content='Their fruit tea is the best. I like it a lot',
      user_id=1,
      post_id=5,
      created_at=curr_date,
      updated_at=curr_date
    ),
    #13
    Comment(
      content='I recommend trying out their Yi Fang fruit tea and taro milk tea with boba',
      user_id=2,
      post_id=5,
      created_at=curr_date,
      updated_at=curr_date
    ),
    #14
    Comment(
      content='Anyone likes Hui Lau Shan too?',
      user_id=2,
      post_id=6,
      created_at=curr_date,
      updated_at=curr_date
    ),
    #15
    Comment(
      content='I like mango a lot and Hui Lau Shan is my favorite dessert place in Berkeley',
      user_id=1,
      post_id=6,
      created_at=curr_date,
      updated_at=curr_date
    ),
    #16
    Comment(
      content='Yessss I love their mango dessert.',
      user_id=3,
      post_id=6,
      created_at=curr_date,
      updated_at=curr_date
    ),
    #17
    Comment(
      content='Haha I kinda enjoy debugging!',
      user_id=1,
      post_id=7,
      created_at=curr_date,
      updated_at=curr_date
    ),
    #18
    Comment(
      content='What is your favorite programming language?',
      user_id=2,
      post_id=7,
      created_at=curr_date,
      updated_at=curr_date
    ),
    #19
    Comment(
      content="Hahaha that's my dog's costume 👻",
      user_id=2,
      post_id=18,
      created_at=curr_date,
      updated_at=curr_date
    ),
  ]
  db.session.add_all(comments)
  db.session.commit()
  return comments

def undo_comments():
  if environment == 'production':
    db.session.execute(
      f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
  else:
    db.session.execute(text("DELETE FROM comments"))
  db.session.commit()