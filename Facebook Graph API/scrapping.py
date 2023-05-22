import instaloader



L = instaloader.Instaloader()
hashtag = "coding"

profile = instaloader.Profile.from_username(L.context, hashtag)
for post in profile.get_posts():
    L.download_post(post, target="#"+hashtag)
