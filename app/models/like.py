from .db import db, add_prefix_for_prod, environment, SCHEMA

likes=db.Table(
  'favorites'
)