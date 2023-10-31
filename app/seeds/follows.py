from ..models import db, User, environment, SCHEMA
from sqlalchemy.sql import text

def seed_followers():
  demo=User.query.filter_by(id=1).first()
  marnie=User.query.filter_by(id=2).first()
  bobbie=User.query.filter_by(id=3).first()
  heehyun=User.query.filter_by(id=4).first()
  ychen=User.query.filter_by(id=5).first()

  demo.followers.append(marnie)
  demo.followers.append(bobbie)
  demo.followers.append(heehyun)
  bobbie.followers.append(demo)
  bobbie.followers.append(marnie)
  bobbie.followers.append(heehyun)
  marnie.followers.append(bobbie)
  marnie.followers.append(demo)
  marnie.followers.append(heehyun)
  ychen.followers.append(bobbie)
  ychen.followers.append(demo)
  ychen.followers.append(heehyun)

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
  heehyun=User.query.filter_by(id=4).first()
  if heehyun:
    heehyun.followers=[]
  ychen=User.query.filter_by(id=5).first()
  if ychen:
    ychen.followers=[]
  db.session.commit()

def seed_followed():
  demo=User.query.filter_by(id=1).first()
  marnie=User.query.filter_by(id=2).first()
  bobbie=User.query.filter_by(id=3).first()
  heehyun=User.query.filter_by(id=4).first()
  ychen=User.query.filter_by(id=5).first()

  demo.followed.append(marnie)
  demo.followed.append(bobbie)
  bobbie.followed.append(demo)
  bobbie.followed.append(marnie)
  marnie.followed.append(bobbie)
  marnie.followed.append(demo)
  heehyun.followed.append(demo)
  heehyun.followed.append(marnie)
  heehyun.followed.append(bobbie)
  ychen.followed.append(demo)

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
  heehyun=User.query.filter_by(id=4).first()
  if heehyun:
    heehyun.followed=[]
  ychen=User.query.filter_by(id=5).first()
  if ychen:
    ychen.followed=[]
  db.session.commit()
