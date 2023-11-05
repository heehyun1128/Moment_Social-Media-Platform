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
    post_image_url='	https://images.pexels.com/photos/1907071/pexels-photo-1907071.jpeg?auto=compress&cs=tinysrgb&w=800',
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
    post_image_url='https://images.pexels.com/photos/164769/pexels-photo-164769.jpeg?auto=compress&cs=tinysrgb&w=800',
    post_id=2,
    created_at=curr_date,
    updated_at=curr_date
    ),
    PostImage(
    preview=True,
    post_image_url='https://images.pexels.com/photos/164936/pexels-photo-164936.jpeg?auto=compress&cs=tinysrgb&w=800',
    post_id=2,
    created_at=curr_date,
    updated_at=curr_date
    ),
    PostImage(
    preview=False,
    post_image_url='https://images.pexels.com/photos/2179373/pexels-photo-2179373.jpeg?auto=compress&cs=tinysrgb&w=800',
    post_id=2,
    created_at=curr_date,
    updated_at=curr_date
    ),
    PostImage(
    preview=False,
    post_image_url='https://images.pexels.com/photos/3660866/pexels-photo-3660866.jpeg?auto=compress&cs=tinysrgb&w=800',
    post_id=2,
    created_at=curr_date,
    updated_at=curr_date
    ),
    PostImage(
    preview=False,
    post_image_url='https://images.pexels.com/photos/9002854/pexels-photo-9002854.jpeg?auto=compress&cs=tinysrgb&w=800',
    post_id=2,
    created_at=curr_date,
    updated_at=curr_date
    ),
    # post-3
    PostImage(
    preview=True,
    post_image_url='https://images.pexels.com/photos/1141853/pexels-photo-1141853.jpeg?auto=compress&cs=tinysrgb&w=800',
    post_id=3,
    created_at=curr_date,
    updated_at=curr_date
    ),
    PostImage(
    preview=False,
    post_image_url='https://images.pexels.com/photos/3584437/pexels-photo-3584437.jpeg?auto=compress&cs=tinysrgb&w=800',
    post_id=3,
    created_at=curr_date,
    updated_at=curr_date
    ),
    PostImage(
    preview=False,
    post_image_url='https://images.pexels.com/photos/1119075/pexels-photo-1119075.jpeg?auto=compress&cs=tinysrgb&w=800',
    post_id=3,
    created_at=curr_date,
    updated_at=curr_date
    ),
    PostImage(
    preview=False,
    post_image_url='	https://images.pexels.com/photos/1591382/pexels-photo-1591382.jpeg?auto=compress&cs=tinysrgb&w=800',
    post_id=3,
    created_at=curr_date,
    updated_at=curr_date
    ),
    PostImage(
    preview=False,
    post_image_url='https://images.pexels.com/photos/2401665/pexels-photo-2401665.jpeg?auto=compress&cs=tinysrgb&w=800',
    post_id=3,
    created_at=curr_date,
    updated_at=curr_date
    ),
    # post-4
    PostImage(
    preview=False,
    post_image_url='https://s3-media0.fl.yelpcdn.com/bphoto/92mcXsjz7jBq8afhkI76oA/o.jpg',
    post_id=4,
    created_at=curr_date,
    updated_at=curr_date
    ),
    PostImage(
    preview=True,
    post_image_url='https://media-cdn.tripadvisor.com/media/photo-w/1a/7c/8b/73/photo1jpg.jpg',
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
    post_image_url='https://images.pexels.com/photos/4709289/pexels-photo-4709289.jpeg?auto=compress&cs=tinysrgb&w=800',
    post_id=7,
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
    post_image_url='https://images.pexels.com/photos/11476525/pexels-photo-11476525.jpeg?auto=compress&cs=tinysrgb&w=800',
    post_id=9,
    created_at=curr_date,
    updated_at=curr_date
    ),
    PostImage(
    preview=False,
    post_image_url='	https://images.pexels.com/photos/8152008/pexels-photo-8152008.jpeg?auto=compress&cs=tinysrgb&w=800',
    post_id=9,
    created_at=curr_date,
    updated_at=curr_date
    ),
    PostImage(
    preview=False,
    post_image_url='https://images.pexels.com/photos/11476522/pexels-photo-11476522.jpeg?auto=compress&cs=tinysrgb&w=800',
    post_id=9,
    created_at=curr_date,
    updated_at=curr_date
    ),
    PostImage(
    preview=False,
    post_image_url='	https://images.pexels.com/photos/6623995/pexels-photo-6623995.jpeg?auto=compress&cs=tinysrgb&w=800',
    post_id=9,
    created_at=curr_date,
    updated_at=curr_date
    ),
    #10
    PostImage(
    preview=False,
    post_image_url='	https://images.pexels.com/photos/1835008/pexels-photo-1835008.jpeg?auto=compress&cs=tinysrgb&w=800',
    post_id=10,
    created_at=curr_date,
    updated_at=curr_date
    ),
    PostImage(
    preview=False,
    post_image_url='https://images.pexels.com/photos/977935/pexels-photo-977935.jpeg?auto=compress&cs=tinysrgb&w=800',
    post_id=10,
    created_at=curr_date,
    updated_at=curr_date
    ),
    PostImage(
    preview=True,
    post_image_url='	https://images.pexels.com/photos/3643714/pexels-photo-3643714.jpeg?auto=compress&cs=tinysrgb&w=800',
    post_id=10,
    created_at=curr_date,
    updated_at=curr_date
    ),
    
    #11
   
    
    PostImage(
    preview=True,
    post_image_url='	https://images.pexels.com/photos/12173273/pexels-photo-12173273.jpeg?auto=compress&cs=tinysrgb&w=800',
    post_id=11,
    created_at=curr_date,
    updated_at=curr_date
    ),
    PostImage(
    preview=False,
    post_image_url='https://images.pexels.com/photos/7643261/pexels-photo-7643261.jpeg?auto=compress&cs=tinysrgb&w=800',
    post_id=11,
    created_at=curr_date,
    updated_at=curr_date
    ),
    PostImage(
    preview=False,
    post_image_url='	https://images.pexels.com/photos/4130054/pexels-photo-4130054.jpeg?auto=compress&cs=tinysrgb&w=800',
    post_id=11,
    created_at=curr_date,
    updated_at=curr_date
    ),
    PostImage(
    preview=False,
    post_image_url='https://images.pexels.com/photos/4107259/pexels-photo-4107259.jpeg?auto=compress&cs=tinysrgb&w=800',
    post_id=11,
    created_at=curr_date,
    updated_at=curr_date
    ),
    #12
    PostImage(
    preview=False,
    post_image_url='	https://images.pexels.com/photos/2362002/pexels-photo-2362002.jpeg?auto=compress&cs=tinysrgb&w=800',
    post_id=12,
    created_at=curr_date,
    updated_at=curr_date
    ),
    PostImage(
    preview=True,
    post_image_url='	https://images.pexels.com/photos/3411135/pexels-photo-3411135.jpeg?auto=compress&cs=tinysrgb&w=800',
    post_id=12,
    created_at=curr_date,
    updated_at=curr_date
    ),
    
    #13
    PostImage(
    preview=True,
    post_image_url='	https://images.pexels.com/photos/1047051/pexels-photo-1047051.jpeg?auto=compress&cs=tinysrgb&w=800',
    post_id=13,
    created_at=curr_date,
    updated_at=curr_date
    ),
    PostImage(
    preview=False,
    post_image_url='	https://images.pexels.com/photos/925263/pexels-photo-925263.jpeg?auto=compress&cs=tinysrgb&w=800',
    post_id=13,
    created_at=curr_date,
    updated_at=curr_date
    ),
    PostImage(
    preview=False,
    post_image_url='https://images.pexels.com/photos/6113860/pexels-photo-6113860.jpeg?auto=compress&cs=tinysrgb&w=800',
    post_id=13,
    created_at=curr_date,
    updated_at=curr_date
    ),
    PostImage(
    preview=False,
    post_image_url='https://images.pexels.com/photos/1365428/pexels-photo-1365428.jpeg?auto=compress&cs=tinysrgb&w=800',
    post_id=13,
    created_at=curr_date,
    updated_at=curr_date
    ),
    PostImage(
    preview=False,
    post_image_url='https://images.pexels.com/photos/1194235/pexels-photo-1194235.jpeg?auto=compress&cs=tinysrgb&w=800',
    post_id=13,
    created_at=curr_date,
    updated_at=curr_date
    ),
    PostImage(
    preview=True,
    post_image_url='https://images.pexels.com/photos/2878712/pexels-photo-2878712.jpeg?auto=compress&cs=tinysrgb&w=800',
    post_id=14,
    created_at=curr_date,
    updated_at=curr_date
    ),
    PostImage(
    preview=False,
    post_image_url='https://images.pexels.com/photos/3230010/pexels-photo-3230010.jpeg?auto=compress&cs=tinysrgb&w=800',
    post_id=14,
    created_at=curr_date,
    updated_at=curr_date
    ),
    PostImage(
    preview=False,
    post_image_url='	https://images.pexels.com/photos/3491211/pexels-photo-3491211.jpeg?auto=compress&cs=tinysrgb&w=800',
    post_id=14,
    created_at=curr_date,
    updated_at=curr_date
    ),
    PostImage(
    preview=False,
    post_image_url='	https://images.pexels.com/photos/1235706/pexels-photo-1235706.jpeg?auto=compress&cs=tinysrgb&w=800',
    post_id=14,
    created_at=curr_date,
    updated_at=curr_date
    ),
    PostImage(
    preview=True,
    post_image_url='		https://images.pexels.com/photos/8823444/pexels-photo-8823444.jpeg?auto=compress&cs=tinysrgb&w=800',
    post_id=15,
    created_at=curr_date,
    updated_at=curr_date
    ),
   
    PostImage(
    preview=True,
    post_image_url='	https://images.pexels.com/photos/1308940/pexels-photo-1308940.jpeg?auto=compress&cs=tinysrgb&w=800',
    post_id=16,
    created_at=curr_date,
    updated_at=curr_date
    ),
    PostImage(
    preview=False,
    post_image_url='	https://images.pexels.com/photos/13865277/pexels-photo-13865277.jpeg?auto=compress&cs=tinysrgb&w=800',
    post_id=16,
    created_at=curr_date,
    updated_at=curr_date
    ),
    
    PostImage(
    preview=True,
    post_image_url='	https://images.pexels.com/photos/13811359/pexels-photo-13811359.jpeg?auto=compress&cs=tinysrgb&w=800',
    post_id=17,
    created_at=curr_date,
    updated_at=curr_date
    ),
    PostImage(
    preview=True,
    post_image_url='https://images.pexels.com/photos/14043102/pexels-photo-14043102.jpeg?auto=compress&cs=tinysrgb&w=800',
    post_id=18,
    created_at=curr_date,
    updated_at=curr_date
    ),
    PostImage(
    preview=True,
    post_image_url='https://images.pexels.com/photos/2147029/pexels-photo-2147029.jpeg?auto=compress&cs=tinysrgb&w=800',
    post_id=19,
    created_at=curr_date,
    updated_at=curr_date
    ),
    PostImage(
    preview=True,
    post_image_url='https://images.pexels.com/photos/4281747/pexels-photo-4281747.jpeg?auto=compress&cs=tinysrgb&w=800',
    post_id=20,
    created_at=curr_date,
    updated_at=curr_date
    ),
    PostImage(
    preview=True,
    post_image_url='https://images.pexels.com/photos/10577002/pexels-photo-10577002.jpeg?auto=compress&cs=tinysrgb&w=800',
    post_id=21,
    created_at=curr_date,
    updated_at=curr_date
    ),
    PostImage(
    preview=True,
    post_image_url='https://images.pexels.com/photos/7842693/pexels-photo-7842693.jpeg?auto=compress&cs=tinysrgb&w=800',
    post_id=22,
    created_at=curr_date,
    updated_at=curr_date
    ),
    PostImage(
    preview=True,
    post_image_url='	https://images.pexels.com/photos/1710795/pexels-photo-1710795.jpeg?auto=compress&cs=tinysrgb&w=800',
    post_id=23,
    created_at=curr_date,
    updated_at=curr_date
    ),
    PostImage(
    preview=True,
    post_image_url='https://images.pexels.com/photos/566566/pexels-photo-566566.jpeg?auto=compress&cs=tinysrgb&w=800',
    post_id=24,
    created_at=curr_date,
    updated_at=curr_date
    ),
    PostImage(
    preview=True,
    post_image_url='	https://images.pexels.com/photos/4099234/pexels-photo-4099234.jpeg?auto=compress&cs=tinysrgb&w=800',
    post_id=25,
    created_at=curr_date,
    updated_at=curr_date
    ),
    PostImage(
    preview=False,
    post_image_url='https://images.pexels.com/photos/3622478/pexels-photo-3622478.jpeg?auto=compress&cs=tinysrgb&w=800',
    post_id=25,
    created_at=curr_date,
    updated_at=curr_date
    ),
    PostImage(
    preview=True,
    post_image_url='		https://images.pexels.com/photos/674577/pexels-photo-674577.jpeg?auto=compress&cs=tinysrgb&w=800',
    post_id=26,
    created_at=curr_date,
    updated_at=curr_date
    ),
    PostImage(
    preview=True,
    post_image_url='	https://images.pexels.com/photos/3368816/pexels-photo-3368816.jpeg?auto=compress&cs=tinysrgb&w=800',
    post_id=27,
    created_at=curr_date,
    updated_at=curr_date
    ),
    PostImage(
    preview=True,
    post_image_url='https://images.pexels.com/photos/10846213/pexels-photo-10846213.jpeg?auto=compress&cs=tinysrgb&w=800',
    post_id=28,
    created_at=curr_date,
    updated_at=curr_date
    ),
    PostImage(
    preview=True,
    post_image_url='https://images.pexels.com/photos/1796730/pexels-photo-1796730.jpeg?auto=compress&cs=tinysrgb&w=800',
    post_id=29,
    created_at=curr_date,
    updated_at=curr_date
    ),
    PostImage(
    preview=True,
    post_image_url='https://images.pexels.com/photos/3593948/pexels-photo-3593948.jpeg?auto=compress&cs=tinysrgb&w=800',
    post_id=30,
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