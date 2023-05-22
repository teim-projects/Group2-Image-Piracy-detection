import cv2
from os import listdir
from os.path import isfile, join
import MyLibrary2 as ml

sourceFolder = "C:/Users/HP/Downloads/New folder (3)/New folder (3)/data/banquethall/"
outPath = 'C:/Users/HP/Downloads/New folder (3)/New folder (3)/augment/banquethall/'
onlyfiles = [f for f in listdir(sourceFolder) if isfile(join(sourceFolder, f))]
for count in range(0,len(onlyfiles)):
    print(("Processing:%s\\%s\n" % (sourceFolder, onlyfiles[count])))
    
    origImage = sourceFolder + onlyfiles[count]
    ml.augmentSingle(origImage, outPath)

