import os
# Function to rename multiple files
i = 0
path1="C:/Users/hp/OneDrive/Desktop/Btech-Project/README/BTP/Apify/buildingnew3/"
path2 = "C:/Users/hp/OneDrive/Desktop/Btech-Project/README/BTP/Apify/buildingnew4/"
for filename in os.listdir(path1):
	my_dest ="image" + str(i) + ".jpg"
	my_source =path1 + filename 
	my_dest =path2 + my_dest
		# rename() function will
		# rename all the files
	print(i)
	os.rename(my_source, my_dest)
	i+=1
	