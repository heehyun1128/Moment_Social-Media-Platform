from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class CommentImage(db.Model):
  __tablename__ = 'comment_images'
  if environment == "production":
        __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  comment_image_url = db.Column(db.String(1000))
  comment_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod('comments.id')), nullable=False)
  created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
  updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now())

  #relationship
  comment=db.relationship("Comment",back_populates="comment_images")

  def to_dict(self):
        return {
            'id': self.id,
            'commentImageUrl': self.comment_image_url,
            'commentId': self.comment_id,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at
        }