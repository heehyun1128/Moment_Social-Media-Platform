# https://cdn.pixabay.com/photo/2015/10/30/20/13/sunrise-1014712_1280.jpg


from ..models import db, PostImage, environment, SCHEMA
from datetime import datetime
from sqlalchemy.sql import text

curr_date = datetime.now()


def seed_postimages():
  post_images=[
# post-1
    PostImage(
    preview=True,
    post_image_url='https://cdn.pixabay.com/photo/2015/10/30/20/13/sunrise-1014712_1280.jpg',
    post_id=1,
    created_at=curr_date,
    updated_at=curr_date
    ),
    PostImage(
    preview=False,
    post_image_url='https://cdn.pixabay.com/photo/2016/03/04/19/36/beach-1236581_1280.jpg',
    post_id=1,
    created_at=curr_date,
    updated_at=curr_date
    ),
    # post-2
    PostImage(
    preview=True,
    post_image_url='https://t3.ftcdn.net/jpg/05/52/92/66/360_F_552926654_GxwGf2l2mDjnKCA2E0alsGCWQsHmJAtm.webp',
    post_id=2,
    created_at=curr_date,
    updated_at=curr_date
    ),
    PostImage(
    preview=False,
    post_image_url='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWyegnZASn8QiNSuJZsCYtf8fGLdnewj5cRQ&usqp=CAU',
    post_id=2,
    created_at=curr_date,
    updated_at=curr_date
    ),
    PostImage(
    preview=False,
    post_image_url='https://t4.ftcdn.net/jpg/06/20/14/25/240_F_620142554_R1xbcjpihHeX33sdF1Bhhz8GONMAyrMR.jpg',
    post_id=2,
    created_at=curr_date,
    updated_at=curr_date
    ),
    PostImage(
    preview=False,
    post_image_url='https://t3.ftcdn.net/jpg/05/69/36/82/240_F_569368264_EfL3uEgVfamQR0MNh0MNlEhjE9N02nSZ.jpg',
    post_id=2,
    created_at=curr_date,
    updated_at=curr_date
    ),
    # post-3
    PostImage(
    preview=True,
    post_image_url='https://cdn.britannica.com/95/94195-050-FCBF777E/Golden-Gate-Bridge-San-Francisco.jpg',
    post_id=3,
    created_at=curr_date,
    updated_at=curr_date
    ),
    PostImage(
    preview=False,
    post_image_url='https://www.queenanne.com/resourcefiles/mainimages/golden-gate-bridge-at-san-francisco-top.jpg?version=8082022205612',
    post_id=3,
    created_at=curr_date,
    updated_at=curr_date
    ),
    PostImage(
    preview=False,
    post_image_url='https://t3.ftcdn.net/jpg/00/83/52/48/360_F_83524810_OObPtC0QCkWYHxCdY563NOnYbSfZ3wqI.webp',
    post_id=3,
    created_at=curr_date,
    updated_at=curr_date
    ),
    PostImage(
    preview=False,
    post_image_url='https://t4.ftcdn.net/jpg/02/43/21/87/240_F_243218764_MumH4UFsZCdcpkhNaRMBCrtOIZbhLpNY.jpg',
    post_id=3,
    created_at=curr_date,
    updated_at=curr_date
    ),
    PostImage(
    preview=False,
    post_image_url='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsaw7AvHxZKrA-6jBm7wQR5IKDoAUtD6-g0Q&usqp=CAU',
    post_id=3,
    created_at=curr_date,
    updated_at=curr_date
    ),
    # post-4
    PostImage(
    preview=True,
    post_image_url='https://media-cdn.tripadvisor.com/media/photo-w/1a/7c/8b/73/photo1jpg.jpg',
    post_id=4,
    created_at=curr_date,
    updated_at=curr_date
    ),
    PostImage(
    preview=False,
    post_image_url='https://s3-media0.fl.yelpcdn.com/bphoto/92mcXsjz7jBq8afhkI76oA/o.jpg',
    post_id=4,
    created_at=curr_date,
    updated_at=curr_date
    ),
    PostImage(
    preview=False,
    post_image_url='https://media-cdn.tripadvisor.com/media/photo-p/19/73/34/e8/photo0jpg.jpg',
    post_id=4,
    created_at=curr_date,
    updated_at=curr_date
    ),
    PostImage(
    preview=False,
    post_image_url='https://media-cdn.tripadvisor.com/media/photo-w/11/37/ee/8e/photo0jpg.jpg',
    post_id=4,
    created_at=curr_date,
    updated_at=curr_date
    ),
    PostImage(
    preview=False,
    post_image_url='	https://media-cdn.tripadvisor.com/media/photo-w/14/ae/9d/c3/menu.jpg',
    post_id=4,
    created_at=curr_date,
    updated_at=curr_date
    ),
    # post-5
    PostImage(
    preview=True,
    post_image_url='https://media-cdn.tripadvisor.com/media/photo-w/19/ab/49/ce/yifang.jpg',
    post_id=5,
    created_at=curr_date,
    updated_at=curr_date
    ),
    PostImage(
    preview=False,
    post_image_url='https://media-cdn.tripadvisor.com/media/photo-p/19/ab/3f/83/yifang.jpg',
    post_id=5,
    created_at=curr_date,
    updated_at=curr_date
    ),
    PostImage(
    preview=False,
    post_image_url='https://media-cdn.tripadvisor.com/media/photo-p/18/cd/f5/4e/winter-melon-lemonade.jpg',
    post_id=5,
    created_at=curr_date,
    updated_at=curr_date
    ),
    PostImage(
    preview=False,
    post_image_url='https://media-cdn.tripadvisor.com/media/photo-p/18/cd/f5/33/fresh-milk-tea-with-grass.jpg',
    post_id=5,
    created_at=curr_date,
    updated_at=curr_date
    ),
    PostImage(
    preview=False,
    post_image_url='https://media-cdn.tripadvisor.com/media/photo-p/18/cd/f5/48/sugar-cane-ching.jpg',
    post_id=5,
    created_at=curr_date,
    updated_at=curr_date
    ),
    # post-6
    PostImage(
    preview=True,
    post_image_url='https://s3-media0.fl.yelpcdn.com/bphoto/6ujB-4l4GeiQ0PcXzuja6A/o.jpg',
    post_id=6,
    created_at=curr_date,
    updated_at=curr_date
    ),
    PostImage(
    preview=False,
    post_image_url='https://s3-media0.fl.yelpcdn.com/bphoto/sg4G3yHsYD31nkIz-BcLtw/o.jpg',
    post_id=6,
    created_at=curr_date,
    updated_at=curr_date
    ),
    PostImage(
    preview=False,
    post_image_url='https://s3-media0.fl.yelpcdn.com/bphoto/YujTZ_akKXLQ3bdF69lSQQ/o.jpg',
    post_id=6,
    created_at=curr_date,
    updated_at=curr_date
    ),
    PostImage(
    preview=True,
    post_image_url='https://images.pexels.com/photos/1181373/pexels-photo-1181373.jpeg',
    post_id=7,
    created_at=curr_date,
    updated_at=curr_date
    ),
    PostImage(
    preview=False,
    post_image_url='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIUiy9Xpk28t1Ic4UkQrrtDXvbpewePN153Q&usqp=CAU',
    post_id=7,
    created_at=curr_date,
    updated_at=curr_date
    ),
    PostImage(
    preview=False,
    post_image_url='https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg',
    post_id=7,
    created_at=curr_date,
    updated_at=curr_date
    ),
    #8
    PostImage(
    preview=True,
    post_image_url='https://www.rollingstone.com/wp-content/uploads/2021/04/super-junior.jpg?w=1581&h=1054&crop=1',
    post_id=8,
    created_at=curr_date,
    updated_at=curr_date
    ),
    #9
    PostImage(
    preview=True,
    post_image_url='https://www.madpaws.com.au/wp-content/uploads/2021/03/Samoyed-768x799.png',
    post_id=9,
    created_at=curr_date,
    updated_at=curr_date
    ),
    #10
    PostImage(
    preview=True,
    post_image_url='https://catinaflat.blog/wp-content/uploads/2022/05/what-is-a-tabby-cat-copy.jpg',
    post_id=10,
    created_at=curr_date,
    updated_at=curr_date
    ),
   
   
  ]
  db.session.add_all(post_images)
  db.session.commit()

def undo_postimages():
  if environment == 'production':
    db.session.execute(
      f"TRUNCATE table {SCHEMA}.post_images RESTART IDENTITY CASCADE;")
  else:
    db.session.execute(text("DELETE FROM post_images"))
  db.session.commit()