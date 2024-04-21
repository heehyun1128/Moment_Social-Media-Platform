from app.models import db, Hashtag, environment, SCHEMA
from sqlalchemy.sql import text


def seed_hashtags(all_posts):
    hashtags = [
        Hashtag(detail='Dogs', posts=[all_posts[0], all_posts[6]])
    ]

    db.session.add_all(hashtags)
    db.session.commit()


def undo_hashtags():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.hashtags RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM hashtags"))

    db.session.commit()