from .db import db,environment,SCHEMA

class Hashtag(db.Model):
    __tablename__="hashtags"
    
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    
    id=db.Column(db.Integer,primary_key=True)
    detail=db.Column(db.String(255))
    
    posts=db.relationship("Post",secondary="post_hashtags", back_populates="all_hashtags")
    
    def to_dict(self):
        return {
            "id":self.id,
            "detail":self.detail
        }