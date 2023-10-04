from flask.cli import AppGroup
from .users import seed_users, undo_users
from .posts import seed_posts,undo_posts
from .post_images import seed_postimages,undo_postimages
from .comments import seed_comments,undo_comments
from .comment_images import seed_commentimages,undo_commentimages

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        
        undo_commentimages()
        undo_comments()
        undo_postimages()
        undo_posts()
        undo_users()
    seed_users()
    seed_posts()
    seed_postimages()
    seed_comments()
    seed_commentimages()

# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_commentimages()
    undo_comments()
    undo_postimages()
    undo_posts()
    undo_users()
    # Add other undo functions here