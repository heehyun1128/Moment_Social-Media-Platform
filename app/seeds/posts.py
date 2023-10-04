from ..models import db, Post, environment, SCHEMA
from datetime import datetime
from sqlalchemy.sql import text

curr_date = datetime.now()


def seed_posts():
  posts=[
# 1
    Post(
      title= 'Happy Friday',
      content= "Wishing everyone a great weekend!",
      creator_id=1,
      created_at=curr_date,
      updated_at=curr_date
    ),
    # 2
    Post(
      title= 'Discovering the Melodies of Jazz',
      content= "Jazz music has always had a special place in my heart. The rhythmic beats of the drums create an atmosphere of pure magic. Yesterday, I had the privilege of attending a live jazz performance at a cozy underground club. Jazz truly has the power to soothe the soul. If you haven't experienced the joy of jazz yet, I highly recommend it",
      creator_id=1,
      created_at=curr_date,
      updated_at=curr_date
    ),
    # 3
    Post(
      title= 'San Francisco - the Golden Gate Bridge',
      content= "The Golden Gate Bridge is a suspension bridge spanning the Golden Gate, the one-mile-wide (1.6 km) strait connecting San Francisco Bay and the Pacific Ocean. The Golden Gate Bridge is a suspension bridge spanning the Golden Gate, the one-mile-wide (1.6 km) strait connecting San Francisco Bay and the Pacific Ocean. ",
      creator_id=1,
      created_at=curr_date,
      updated_at=curr_date
    ),
    # 4
    Post(
      title= 'Asha Tea House - Amazing boba place in Berkeley, California!',
      content= "Asha Tea House is a Berkeley favorite. 'Asha' is Taiwanese for 'someone who enjoys life', so taking a break here to enjoy traditional tea served hot, cold, and with or without boba seems like a logical decision. It'slocated at 2086 University Ave. (Berkeley). I highly recommend Asian pear oolong, grape green tea, matcha latte, and tapioca milk tea",
      creator_id=2,
      created_at=curr_date,
      updated_at=curr_date
    ),
    # 5
    Post(
      title= 'The history of Yi Fang - a great boba place',
      content= "The owner's grandmother, Yi Fang, married a young farmer. For three generations, their family has been planting pineapples for a living. Bending down and working hard all day long, that was their life in miniature. With an epiphany, grandma braised the overripe golden pineapples into preservable homemade jam. ​Their most sought-out drink, Yifang Fruit Tea, inherited not only grandma’s name, but also her secret recipe. They have put the early Taiwan epitome, historic memories and warm hospitality in this one cup of drink — using home-made organic cane sugar, seasonal fresh fruits, and natural ingredients (zero concentrated juice and powders). In every sip, you can taste the freshness of the tea and sweetness of the fruits, recreating the authentic and classic Taiwanese flavor all over again.",
      creator_id=2,
      created_at=curr_date,
      updated_at=curr_date
    ),
    # 6
    Post(
      title= 'The story of Hui Lau Shan - a chain of dessert shops',
      content= "Hui Lau Shan is a chain of dessert shops based in Hong Kong. Founded in the 1960s as a herbal tea outlet, the chain evolved into a restaurant chain specializing in sweets, snacks and dessert soups called tong sui. Since the introduction of mango pomelo sago in the early 1990s, Hui Lau Shan has additionally been known for its mango-themed desserts. They have a store at Berkeley, CA. Go check it out!",
      creator_id=2,
      created_at=curr_date,
      updated_at=curr_date
    ),
    # 7
    Post(
      title= 'Programming is fun!',
      content= "",
      creator_id=3,
      created_at=curr_date,
      updated_at=curr_date
    ),
  ]

  db.session.add_all(posts)
  db.session.commit()

def undo_posts():
  if environment == 'production':
    db.session.execute(
      f"TRUNCATE table {SCHEMA}.posts RESTART IDENTITY CASCADE;")
  else:
    db.session.execute(text("DELETE FROM posts"))
  db.session.commit()
