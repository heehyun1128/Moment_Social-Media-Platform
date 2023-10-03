from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class PostImage(db.Model):
  __tablename__ = 'post_images'
  if environment == "production":
        __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  preview=db.Column(db.Boolean,default=False)
  post_image_url = db.Column(db.String(1000))
  post_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod('posts.id')), nullable=False)
  created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
  updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now())

  #relationship
  post=db.relationship("Post",back_populates="post_images")

  def to_dict(self):
        return {
            'id': self.id,
            'preview': self.preview,
            'postImageUrl': self.post_image_url,
            'postId': self.post_id,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at
        }