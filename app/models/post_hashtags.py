from .db import db,add_prefix_for_prod,environment,SCHEMA

post_hashtags=db.Table(
    "post_hashtags",
    
    db.Column(
        "post_id",
        db.Integer,
        db.ForeignKey(add_prefix_for_prod("posts.id")),
        primary_key=True
    ),
    db.Column(
        "hashtag_id",
        db.Integer,
        db.ForeignKey(add_prefix_for_prod("hashtags.id")),
        primary_key=True
    )
)

if environment == "production":
    post_hashtags.schema = SCHEMA