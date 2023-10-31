from ..models import db, Post, environment, SCHEMA
from datetime import datetime
from sqlalchemy.sql import text

curr_date = datetime.now()


def seed_posts():
  posts=[
# 1
    
    Post(
      title= 'Happy Friday',
      content= "Wishing everyone a great weekend! #happy",
      creator_id=1,
      created_at=curr_date,
      updated_at=curr_date
    ),
    # 2
    Post(
      title= 'Discovering the Melodies of Jazz',
      content= "Jazz music has always had a special place in my heart. The rhythmic beats of the drums create an atmosphere of pure magic. Yesterday, I had the privilege of attending a live jazz performance at a cozy underground club. Jazz truly has the power to soothe the soul. If you haven't experienced the joy of jazz yet, I highly recommend it. #music",
      creator_id=1,
      created_at=curr_date,
      updated_at=curr_date
    ),
    # 3
    Post(
      title= 'San Francisco - the Golden Gate Bridge',
      content= "The Golden Gate Bridge is a suspension bridge spanning the Golden Gate, the one-mile-wide (1.6 km) strait connecting San Francisco Bay and the Pacific Ocean. The Golden Gate Bridge is a suspension bridge spanning the Golden Gate, the one-mile-wide (1.6 km) strait connecting San Francisco Bay and the Pacific Ocean. #vacation #trip #sf #holiday #travel",
      creator_id=1,
      created_at=curr_date,
      updated_at=curr_date
    ),
    # 4
    Post(
      title= 'Asha Tea House - Amazing boba place in Berkeley, California!',
      content= "Asha Tea House is a Berkeley favorite. 'Asha' is Taiwanese for 'someone who enjoys life', so taking a break here to enjoy traditional tea served hot, cold, and with or without boba seems like a logical decision. It'slocated at 2086 University Ave. (Berkeley). I highly recommend Asian pear oolong, grape green tea, matcha latte, and tapioca milk tea. #boba #food #drink #happy",
      creator_id=2,
      created_at=curr_date,
      updated_at=curr_date
    ),
    
    
    # 5
    Post(
      title= 'The history of Yi Fang - a great boba place',
      content= "The owner's grandmother, Yi Fang, married a young farmer. For three generations, their family has been planting pineapples for a living. Bending down and working hard all day long, that was their life in miniature. With an epiphany, grandma braised the overripe golden pineapples into preservable homemade jam. ​Their most sought-out drink, Yifang Fruit Tea, inherited not only grandma’s name, but also her secret recipe. They have put the early Taiwan epitome, historic memories and warm hospitality in this one cup of drink — using home-made organic cane sugar, seasonal fresh fruits, and natural ingredients (zero concentrated juice and powders). In every sip, you can taste the freshness of the tea and sweetness of the fruits, recreating the authentic and classic Taiwanese flavor all over again. #boba #drink #food",
      creator_id=2,
      created_at=curr_date,
      updated_at=curr_date
    ),
    # 6
    Post(
      title= 'The story of Hui Lau Shan - a chain of dessert shops',
      content= "Hui Lau Shan is a chain of dessert shops based in Hong Kong. Founded in the 1960s as a herbal tea outlet, the chain evolved into a restaurant chain specializing in sweets, snacks and dessert soups called tong sui. Since the introduction of mango pomelo sago in the early 1990s, Hui Lau Shan has additionally been known for its mango-themed desserts. They have a store at Berkeley, CA. Go check it out! #dessert #food #drink",
      creator_id=2,
      created_at=curr_date,
      updated_at=curr_date
    ),
    # 7
    Post(
      title= 'Programming is fun!',
      content= "I enjoy programming a lot! Programming allows you to tackle complex problems and find elegant solutions. It's like solving puzzles, which can be intellectually stimulating and rewarding. Programming skills are applicable in a wide range of fields, from web development to data science. This versatility can open up diverse career opportunities.The programming community is often friendly and supportive. You can learn from others, collaborate on open-source projects, and find like-minded individuals. #coding #software #engineering #programming #happy",
      creator_id=3,
      created_at=curr_date,
      updated_at=curr_date
    ),
    # 8
    Post(
      title= 'Super Junior - my favorite k-pop group',
      content= "Super Junior is a highly popular and influential South Korean boy band formed in 2005. They are known for their significant contributions to the K-pop (Korean pop) music industry and have gained a massive global fanbase. The group's original concept was to be a rotational project, with members joining and leaving, but over time, they evolved into a more stable group. They have produced a wide range of music, including pop, hip-hop, R&B, and ballads. They are known for their energetic performances, catchy songs, and a charismatic stage presence. My favorite song from Super Junior is 'Burn the Floor'. I highly recommend it! #kpop #music",
      creator_id=3,
      created_at=curr_date,
      updated_at=curr_date
    ),
    
    # 9
    Post(
      title= 'Kuma says Hi~~',
      content= "Kuma is 4 years old now. He is lovely and friendly. He loves to be around with people but can get overly excited around other dogs. Kuma loves meats and snacks. His favorite snack is the Kirkland Dental Chews from Costco. #friend #dog #animal #happy",
      creator_id=1,
      created_at=curr_date,
      updated_at=curr_date
    ),
    # 10
    Post(
      title= 'What is your favorite breed of cat?',
      content= "My cat is a domestic medium hair gray tabby. She's so adorable! What's your cat's breed? What is your favorite breed of cat? #friend #cat #animal",
      creator_id=3,
      created_at=curr_date,
      updated_at=curr_date
    ),
    #11
    Post(
      title= 'MY BEST FRIEND',
      content= "Dogs Aren't Just Pets; They're Family. My Furry Companion Is Not Just A Pet But Also My Confidant, Playmate, And Unwavering Source Of Unconditional Love. 🐾 #friend #dog #animal",
      creator_id=1,
      created_at=curr_date,
      updated_at=curr_date
    ),
    #12
    Post(
      title= 'Hello Disney',
      content= "My Visit To Disney Was A Magical Adventure Filled With Enchanting Rides, Beloved Characters, And A Contagious Atmosphere Of Joy. #disney #trip #vacation #travel",
      creator_id=2,
      created_at=curr_date,
      updated_at=curr_date
    ),
    #13
    Post(
      title= 'HIKING DAY',
      content= "Today's Hiking Adventure Was Like Stepping Into A Breathtaking Postcard. With Every Step, We Uncovered Hidden Treasures And Felt A Deep Connection To The Great Outdoors. #hiking #trip",
      creator_id=3,
      created_at=curr_date,
      updated_at=curr_date
    ),
    #14
    Post(
      title= 'I Love Coffee!',
      content= "One of the first things that captivates me about coffee is its rich, comforting aroma. That initial whiff of freshly brewed coffee is like a warm embrace, signaling the start of a new day and a fresh burst of energy. The scent of coffee beans is so inviting that it can instantly uplift my mood. #coffee #food #drink",
      creator_id=2,
      created_at=curr_date,
      updated_at=curr_date
    ),
    #15
    Post(
      title= 'See what I got for the Holiday Season',
      content= "So, I gotta spill the beans on the amazing holiday gift I received – a bottle of Chanel perfume. Yep, you read that right! I'm unwrapping the box, and I see the classic Chanel logo on a stunning bottle. You can't help but feel a bit fancy just holding it. It's like this bottle is a gateway to a world of luxury and allure. #holiday #gift #perfume #beauty",
      creator_id=3,
      created_at=curr_date,
      updated_at=curr_date
    ),
    #16
    Post(
      title= 'A week in Paris!',
      content= "Just spent a week travelling Paris. So, of course, I had to check out all the famous spots. The Eiffel Tower – it's like a giant metal spider that's actually kind of cool.  I also got a lot of good food there, like croissants, pastries, and coffee at every street corner. I mean how can you resist? #travel #trip #vacation #paris ",
      creator_id=1,
      created_at=curr_date,
      updated_at=curr_date
    ),
    #17
    Post(
      title= 'Go Bears and Beat Stanford!',
      content= "Football season's back. As a UC Berkeley Alumni, of course I'm rootin' for Berkeley to bring home the W! Stanford, you better watch out 'cause the Bears are hungry for that victory! #berkeley #football #game",
      creator_id=3,
      created_at=curr_date,
      updated_at=curr_date
    ),
    #18
    Post(
      title= 'Halloween is coming!',
      content= "Halloween is all about fun and creativity. So, what's your costume this year? Have you decided on something spooky, funny, or entirely unique? Tell me all about it!  😄🎃👻  #halloween #holiday",
      creator_id=1,
      created_at=curr_date,
      updated_at=curr_date
    ),
    #19
    Post(
      title= 'What is your favorite K-pop star?',
      content= "My favorite k-POP group is Super Junior. I also like the songs from BTS. I think members of both groups are hard-working and sincere and that's why I like them. What is your favorite K-pop star? Share in the comment below. #music #kpop",
      creator_id=4,
      created_at=curr_date,
      updated_at=curr_date
    ),
    #20
    Post(
      title= 'I made dumplings today!',
      content= "First time making spinach dumplings for my family. #food #yummy #health #happy",
      creator_id=4,
      created_at=curr_date,
      updated_at=curr_date
    ),
    #21
    Post(
      title= 'I want this birthday cake for my birthday',
      content= "Found a cake online that I really like. Think that I should get this one for my birthday? Any ideas or suggestions? What's your birthday cake like? #happy #birthday #cake",
      creator_id=5,
      created_at=curr_date,
      updated_at=curr_date
    ),
    #22
    Post(
      title= 'I am announcing that I have completed a 24-week Software Engineering Bootcamp!',
      content= "The past 6 months have been challenging yet rewarding. I went from someone with limited programming skills to a full stack engineer. I made lots of friends in this bootcamp too and I appreciate their support a lot! #friend #bootcamp #coding #software #engineering #programming",
      creator_id=5,
      created_at=curr_date,
      updated_at=curr_date
    ),
    #23
    Post(
      title= 'I miss the time when I went to the beach',
      content= "Haven't gone to the beach for a while and I miss the old times when I used to go to the beach. #sea #beach #vacation #trip #travel",
      creator_id=4,
      created_at=curr_date,
      updated_at=curr_date
    ),
    #24
    Post(
      title= "I made avocado & egg salad today! ",
      content= "I love healthy food! #food #health",
      creator_id=5,
      created_at=curr_date,
      updated_at=curr_date
    ),
    #25
    Post(
      title= "Love acai bowl",
      content= "I love healthy food and acai bowl is my favorite! #food #acai #health",
      creator_id=5,
      created_at=curr_date,
      updated_at=curr_date
    ),
    #26
    Post(
      title= "Winter is coming and I'm so sleepy ==",
      content= "Even my cat is sleep too haha. #sleepy #cat #winter #animal",
      creator_id=5,
      created_at=curr_date,
      updated_at=curr_date
    ),
    #27
    Post(
      title= "Do you love reading?",
      content= "I recently got a few books to read. What is your favorite book? #book #reading",
      creator_id=4,
      created_at=curr_date,
      updated_at=curr_date
    ),
    #28
    Post(
      title= "My Trip to Macau",
      content= "I went to Macau a few weeks ago and I love the people and food there. It was such an amazing trip that I won't forget. Bye Macau, see you next year! #macau #trip #vacation #travel",
      creator_id=4,
      created_at=curr_date,
      updated_at=curr_date
    ),
    #29
    Post(
      title= "Seattle, the city of coffee addicts, tech wizards, and endless drizzles! 🌧️",
      content= "Seattle: where coffee flows like rain, and tech geeks coexist with nature enthusiasts. It's a city where the Space Needle is the ultimate selfie backdrop, and rain is just an excuse to indulge in cozy bookshops and craft beer. Embrace the drizzle, soak in the innovation, and savor every drop of this vibrant, caffeinated wonderland. ☕🌧️📚 #trip #vacation #travel",
      creator_id=2,
      created_at=curr_date,
      updated_at=curr_date
    ),
    #30
    Post(
      title= "Concrete Jungle Dreams: Exploring the Buzz of New York City",
      content= "New York City, where the streets have more stories than you can count, and the yellow cabs play hopscotch with skyscrapers. It's the city that never sleeps, and you'll quickly find out why, with late-night pizza joints and 24/7 adventures. From Central Park picnics to Broadway dreams, NYC's got a slice of life for everyone. 🏙️🍕🌃",
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
