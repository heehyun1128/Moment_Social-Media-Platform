from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', first_name='Demo', last_name='Demo',password='password',
        profile_image_url='https://images2.minutemediacdn.com/image/upload/c_crop,w_2764,h_1554,x_0,y_744/c_fill,w_720,ar_16:9,f_auto,q_auto,g_auto/images/voltaxMediaLibrary/mmsport/mentalfloss/01ggaw7dsf4kgxw6y5zc.jpg'
        )
    marnie = User(
        username='Nian Nian', email='marnie@aa.io', 
        first_name='Marnie', last_name='Marnie',password='password',
        profile_image_url='https://images.pexels.com/photos/11279108/pexels-photo-11279108.jpeg?auto=compress&cs=tinysrgb&w=800'
    )
    bobbie = User(
        username='Bobbie', email='bobbie@aa.io', 
        first_name='Bobbie', last_name='Bobbie',
        password='password',
        profile_image_url='https://images.pexels.com/photos/10812162/pexels-photo-10812162.jpeg?auto=compress&cs=tinysrgb&w=800'
    )
    heehyun = User(
        username='Heehyun', email='heehyun@aa.io', 
        first_name='Heehyun', last_name='C',
        password='password',
        profile_image_url='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQG1ZPDsSXGmT6nuCQ8XM-Fq3KvVbFYP7br7A&usqp=CAU'
    )
   
    ychen = User(
        username='ychen', email='ychen@aa.io', 
        first_name='Ychen', last_name='C.',
        password='password',
        profile_image_url='	https://heehyun1128.github.io/static/media/bgc.cfd103812788403429de.jpg'
    )
   

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(heehyun)
    db.session.add(ychen)
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