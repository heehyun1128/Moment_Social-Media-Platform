from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', first_name='Demo', last_name='Demo',password='password',
        profile_image_url='https://images2.minutemediacdn.com/image/upload/c_crop,w_2764,h_1554,x_0,y_744/c_fill,w_720,ar_16:9,f_auto,q_auto,g_auto/images/voltaxMediaLibrary/mmsport/mentalfloss/01ggaw7dsf4kgxw6y5zc.jpg'
        )
    marnie = User(
        username='Boba Lover', email='marnie@aa.io', 
        first_name='Marnie', last_name='Marnie',password='password')
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', 
        first_name='Bobbie', last_name='Bobbie',
        password='password')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))
        
    db.session.commit()