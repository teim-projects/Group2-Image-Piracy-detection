import cv2
import numpy as np
from skimage.feature import local_binary_pattern
import os
import csv
from Classify import classification
from Input_file import Query_Image
import pandas as pd
import mahotas
import re


def resize_image(image_path, width, height):
    # Read the image from the given path
    image = cv2.imread(image_path)

    # Resize the image to the given width and height
    resized_image = cv2.resize(image, (width, height))

    # Save the resized image to a temporary file
    temp_file = "resized_image.jpg"
    cv2.imwrite(temp_file, resized_image)

    # Return the path of the temporary file
    return temp_file


def color_feature(path,color_moment_weight):

    img = cv2.imread(path)
    
    # Compute color moments
    yuv = cv2.cvtColor(img, cv2.COLOR_BGR2YUV)

    # Split YUV channels
    y, u, v = cv2.split(yuv)

    # Calculate mean and standard deviation of each channel
    mean_y = np.mean(y)
    std_y = np.std(y)

    mean_u = np.mean(u)
    std_u = np.std(u)

    mean_v = np.mean(v)
    std_v = np.std(v)

    # Calculate moments of each channel
    moments_y = cv2.moments(y)
    moments_u = cv2.moments(u)
    moments_v = cv2.moments(v)

    # Calculate skewness and kurtosis of each channel
    skewness_y = moments_y['mu20'] / (moments_y['m00'] ** 1.5)
    skewness_u = moments_u['mu20'] / (moments_u['m00'] ** 1.5)
    skewness_v = moments_v['mu20'] / (moments_v['m00'] ** 1.5)

    kurtosis_y = moments_y['mu30'] / (moments_y['m00'] ** 2.5)
    kurtosis_u = moments_u['mu30'] / (moments_u['m00'] ** 2.5)
    kurtosis_v = moments_v['mu30'] / (moments_v['m00'] ** 2.5)

    # Concatenate features into a single vector
    color_moments = np.array([mean_y, std_y, skewness_y, kurtosis_y, mean_u, std_u, skewness_u, kurtosis_u, mean_v, std_v, skewness_v, kurtosis_v])
    color_feat_norm = cv2.normalize(color_moments, color_moments).flatten()
    color_feat_weighted = color_feat_norm * color_moment_weight

    return color_feat_weighted
    
def texture_feature(path,texture_moment_weight):

    img = cv2.imread(path)
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    # Compute LBP histogram
    radius = 3
    n_points = 8 * radius
    lbp = local_binary_pattern(gray, n_points, radius, method='uniform')
    hist, _ = np.histogram(lbp, bins=np.arange(0, n_points + 3), range=(0, n_points + 2))
    hist = hist.astype("float")
    hist /= (hist.sum() + 1e-7)
    texture_feature=hist

    texture_feat_norm = cv2.normalize(texture_feature, texture_feature).flatten()
    texture_feat_weighted = texture_feat_norm * texture_moment_weight

    return texture_feat_weighted

def Hu_feature(path,hu_moment_weight):
    img = cv2.imread(path)
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    # Compute Hu moments
    moments = cv2.moments(gray)
    huMoments = cv2.HuMoments(moments)
    hu_feature = -np.sign(huMoments) * np.log10(np.abs(huMoments))

    hu_feat_norm = cv2.normalize(hu_feature, hu_feature).flatten()
    hu_feat_weighted = hu_feat_norm * hu_moment_weight

    return hu_feat_weighted

def Haralick_feature(path,haralick_weight):

    img = cv2.imread(path)
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    haralick_feature = mahotas.features.haralick(gray)
    haralick_feat = haralick_feature.mean(axis=0)

    haralick_feat_norm = cv2.normalize(haralick_feat, haralick_feat).flatten()
    haralick_feat_weighted = haralick_feat_norm * haralick_weight

    return haralick_feat_weighted

def csv_sorting():
    
    df = pd.read_csv("C:/Users/hp/OneDrive/Desktop/TEIM - Image piracy detection/BTP/similarities.csv")
    sorted_df = df.sort_values(by=["Similarity"], ascending=False)
    sorted_df.to_csv('C:/Users/hp/OneDrive/Desktop/TEIM - Image piracy detection/BTP/similarities_sorted.csv', index=False)


        
def PostURLIngestion():
    df = pd.read_csv("C:/Users/hp/OneDrive/Desktop/TEIM - Image piracy detection/BTP/similarities_sorted.csv")
    df2 = pd.read_csv("C:/Users/hp/OneDrive/Desktop/TEIM - Image piracy detection/BTP/similarities_sorted.csv")
    df1 = pd.read_csv("C:/Users/hp/OneDrive/Desktop/TEIM - Image piracy detection/BTP/" + query_category + ".csv")
    # df1 = pd.read_csv("C:/Users/hp/OneDrive/Desktop/Btech-Project/README/BTP/building_glass.csv")
    Filename = df. iloc[:,0] 
    PostURL = df1. iloc[:,1] 
    PostURLList = []
    for i in Filename:
        match = re.search(r'(?<=image-)\d+', i)
        if match:
            URLNo = int(match.group())
        print(URLNo)
        PostURLList.append(PostURL[URLNo - 1])
    print(PostURLList)    
    for i in range(len(df2)):
        df2.at[i, 'PostURL'] = PostURLList[i]    
        print("Success")
    df2.to_csv('C:/Users/hp/OneDrive/Desktop/TEIM - Image piracy detection/BTP/similarities_sorted - copy.csv', index=False)        

#accept from user
query_category= classification()
#query_category='building'

#can be taken as a input from user
color_moment_weight=0.3
texture_moment_weight=0.2
hu_moment_weight=0.1
haralick_weight=0.4

img = Query_Image()
width = 600
height = 590
image1 = resize_image(img,width,height)
                      
color_feat1 = color_feature(image1,color_moment_weight)
texture_feat1=texture_feature(image1,texture_moment_weight)
hu_feat1=Hu_feature(image1,hu_moment_weight)
haralick_feat1=Haralick_feature(image1,haralick_weight)
# C:\Users\hp\OneDrive\Desktop\TEIM - Image piracy detection\BTP\New_Resized
combined_feat1 =np.concatenate([color_feat1,texture_feat1,hu_feat1,haralick_feat1])

parent_path="C:/Users/hp/OneDrive/Desktop/TEIM - Image piracy detection/BTP/New_Resized/"
category_path=parent_path+query_category+"/"
display_image_path = query_category +"/"
f = open('C:/Users/hp/OneDrive/Desktop/TEIM - Image piracy detection/BTP/similarities.csv', 'w')
writer = csv.writer(f, lineterminator='\n')
writer.writerow(["Filename","Similarity","FileURL"])

for filename in os.listdir(category_path):
        
    image2= category_path + filename
    display_image_path1 = display_image_path + filename

    color_feat2 = color_feature(image2,color_moment_weight)
    texture_feat2=texture_feature(image2,texture_moment_weight)
    hu_feat2=Hu_feature(image2,hu_moment_weight)
    haralick_feat2=Haralick_feature(image2,haralick_weight)

    combined_feat2 =np.concatenate([color_feat2,texture_feat2,hu_feat2,haralick_feat2])
    print(image2)

    distance = np.linalg.norm(combined_feat1 - combined_feat2)
    print("distance between the two images: ", distance)

    # calculate similarity from distance
    similarity = 1 / (1 + distance)

    print("Similarity between the two images: ", similarity)
    print("")

    writer.writerow([filename,similarity,display_image_path1])

f.close()

csv_sorting()
PostURLIngestion()



