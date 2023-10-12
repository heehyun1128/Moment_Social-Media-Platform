from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Post(db.Model):
  __tablename__ = 'posts'
  if environment == "production":
        __table_args__ = {'schema': SCHEMA}
  
  id = db.Column(db.Integer,primary_key=True)
  title= db.Column(db.String(255),nullable=False)
  content=db.Column(db.String(10000),nullable=False)
  creator_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
  created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
  updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now())

  #relationship
  creator = db.relationship('User',back_populates="posts")
  post_images=db.relationship("PostImage",back_populates="post",cascade="all, delete, delete-orphan")
  comments=db.relationship("Comment",back_populates="post",cascade="all, delete, delete-orphan")

  def to_dict(self):
        return {
            'id': self.id,
            'title':self.title,
            'content': self.content,
            'creatorId': self.creator_id,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at
        }