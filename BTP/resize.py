# import glob
# import cv2

# path = "C:/Users/hp/OneDrive/Desktop/Btech-Project/Apify/school/*.*"
# #Resizing images and saving them in diff folder
# for bb,file in enumerate (glob.glob(path)):
#   img = cv2.imread(file)
#   print("width: {} pixels".format(img.shape[1]))
#   print("height: {} pixels".format(img.shape[0]))
#   print("channels: {}".format(img.shape[2]))
#   dim=(600,590)
#   image1=cv2.resize(img, dim)
#   cv2.imwrite('C:/Users/hp/OneDrive/Desktop/Btech-Project/BTP/Apify_Resized/school/school{}.jpg'.format(bb), image1)

import os
import cv2

def resize_images_in_folder(folder_path, output_folder_path, width, height):
    # Loop through all the files in the folder
    for filename in os.listdir(folder_path):
        # Check if the file is an image
        if filename.endswith(".jpg") or filename.endswith(".jpeg") or filename.endswith(".png"):
            # Construct the full path of the input image
            input_image_path = os.path.join(folder_path, filename)

            # Read the input image
            image = cv2.imread(input_image_path)

            # Resize the image to the given width and height
            resized_image = cv2.resize(image, (width, height))

            # Construct the full path of the output image
            output_image_path = os.path.join(output_folder_path, filename)

            # Save the resized image to the output folder with the same name
            cv2.imwrite(output_image_path, resized_image)

input_folder_path = "C:/Users/hp/OneDrive/Desktop/Btech-Project/README/BTP/Apify/crushingtool/"
output_folder_path = "C:/Users/hp/OneDrive/Desktop/Btech-Project/README/BTP/New_Resized/crushingtool/"
width = 600
height = 590

resize_images_in_folder(input_folder_path, output_folder_path,width,height)