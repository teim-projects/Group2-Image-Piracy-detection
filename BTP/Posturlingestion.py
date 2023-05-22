import pandas as pd
import re
from Classify import classification

query_category= classification()

# def PostURLIngestion():
#     df = pd.read_csv("C:/Users/hp/OneDrive/Desktop/Btech-Project/README/BTP/similarities_sorted.csv")
#     df2 = pd.read_csv("C:/Users/hp/OneDrive/Desktop/Btech-Project/README/BTP/similarities_sorted.csv")
#     df1 = pd.read_csv("C:/Users/hp/OneDrive/Desktop/Btech-Project/README/Apify/" + query_category + ".csv")
#     Filename = df. iloc[:,0] 
#     PostURL = df1. iloc[:,1] 
#     PostURLList = []
#     for i in Filename:
#         temp = re.compile("([a-zA-Z]+)([0-9]+)")
#         res = temp.match(i).groups()
#         URLNo = int(res[1])
#         print(URLNo)
#         PostURLList.append(PostURL[URLNo])
#     print(PostURLList)    
#     for i in range(len(df2)):
#         df2.at[i, 'PostURL'] = PostURLList[i]    
#         print("Success")
#     df2.to_csv('C:/Users/hp/OneDrive/Desktop/Btech-Project/README/BTP/similarities_sorted - copy.csv', index=False) 

def PostURLIngestion():
    df = pd.read_csv("C:/Users/hp/OneDrive/Desktop/Btech-Project/README/BTP/similarities_sorted.csv")
    df2 = pd.read_csv("C:/Users/hp/OneDrive/Desktop/Btech-Project/README/BTP/similarities_sorted.csv")
    # df1 = pd.read_csv("C:/Users/hp/OneDrive/Desktop/Btech-Project/README/BTP/" + query_category + ".csv")
    df1 = pd.read_csv("C:/Users/hp/OneDrive/Desktop/Btech-Project/README/BTP/building_glass.csv")
    Filename = df. iloc[:,0] 
    PostURL = df1. iloc[:,1] 
    PostURLList = []
    for i in Filename:
        match = re.search(r'(?<=image-)\d+', i)
        if match:
            URLNo = int(match.group())
        print(URLNo)
        PostURLList.append(PostURL[URLNo-1])
    print(PostURLList)    
    for i in range(len(df2)):
        df2.at[i, 'PostURL'] = PostURLList[i]    
        print("Success")
    df2.to_csv('C:/Users/hp/OneDrive/Desktop/Btech-Project/README/BTP/similarities_sorted - copy.csv', index=False)        

PostURLIngestion()