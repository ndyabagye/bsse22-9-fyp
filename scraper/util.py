import re


#get generate slug from text
def get_slug(text):
    slug = text.lower()
    slug = re.sub(r'[^\w\s]', '', slug)
    slug = re.sub(r'\s+', '-', slug)
    return slug