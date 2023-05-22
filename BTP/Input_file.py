import os
import random
import sys

def Query_Image():
    img_path="./images/" + sys.argv[1]
    print(img_path + "is path to image")
    return img_path
#query image
    # parent_path="D:/B tech Project/Final_Resized/"
    # category_path=parent_path+query_category+"/"

    # random_filename = random.choice([
    # x for x in os.listdir(category_path)
    # if os.path.isfile(os.path.join(category_path, x))])

    # img_path=category_path+random_filename

#    img_path="C:/Users/hp/OneDrive/Desktop/Btech-Project/README/BTP/Apify/building/image-10.jpg"
#    return img_path

  
# def Database(query_category):
# #database traversal

#     parent_path="D:/B tech Project/Final_Dataset/"
#     category_path=parent_path+query_category+"/"

#     for filename in os.listdir(category_path):
        
#         database_image= category_path + filename
#         return database_image

  


        