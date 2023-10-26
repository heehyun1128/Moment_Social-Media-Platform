from ..models import db, User, environment, SCHEMA
from sqlalchemy.sql import text

def seed_followers():
  demo=User.query.filter_by(id=1).first()
  marnie=User.query.filter_by(id=2).first()
  bobbie=User.query.filter_by(id=3).first()

  demo.followers.append(marnie)
  demo.followers.append(bobbie)
  bobbie.followers.append(demo)
  bobbie.followers.append(marnie)
  marnie.followers.append(bobbie)
  marnie.followers.append(demo)

  db.session.commit()

def undo_followers():
  demo=User.query.filter_by(id=1).first()
  if demo:
    demo.followers=[]
  marnie=User.query.filter_by(id=2).first()
  if marnie:
    marnie.followers=[]
  bobbie=User.query.filter_by(id=3).first()
  if bobbie:
    bobbie.followers=[]
  db.session.commit()

def seed_followed():
  demo=User.query.filter_by(id=1).first()
  marnie=User.query.filter_by(id=2).first()
  bobbie=User.query.filter_by(id=3).first()

  demo.followed.append(marnie)
  demo.followed.append(bobbie)
  bobbie.followed.append(demo)
  bobbie.followed.append(marnie)
  marnie.followed.append(bobbie)
  marnie.followed.append(demo)

  db.session.commit()

def undo_followed():
  demo=User.query.filter_by(id=1).first()
  if demo:
    demo.followed=[]
  marnie=User.query.filter_by(id=2).first()
  if marnie:
    marnie.followed=[]
  bobbie=User.query.filter_by(id=3).first()
  if bobbie:
    bobbie.followed=[]
  db.session.commit()
