import cv2
import pandas as pd

df = pd.read_csv("similarities_sorted.csv")

path= "D:/B tech Project/Final_Resized/building/"

# print(len(df.index))

for i in range (len(df.index)):
    print(i)
    img_sim_value= df.iloc[i,1]
    print(img_sim_value)
    if(img_sim_value>0.75):
        img_name= df.iloc[i,0]
        img_filename= path + img_name
        img = cv2.imread(img_filename)
        cv2.imwrite('D:/B tech Project/Filter_Dataset/building/building{}.jpg'.format(i), img)
    else:
        break


        
