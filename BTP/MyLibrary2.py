from numpy import expand_dims
from tensorflow.keras.utils import load_img
from tensorflow.keras.utils import img_to_array
from keras.preprocessing.image import ImageDataGenerator
import cv2
import random

def augmentSingle(inpath, outdir) :

    rows = 600
    cols = 590

    origImage = inpath
    outPath = outdir

    # load the image
    img = load_img(origImage)
    # convert to numpy array
    data = img_to_array(img)
    # expand dimension to one sample
    samples = expand_dims(data, 0)

    # create image data augmentation generator
    datagen = ImageDataGenerator(zoom_range=[0.1,1.0])
    # prepare iterator
    it = datagen.flow(samples, batch_size=1)
    # generate samples and plot
    for i in range(0,2):
        batch = it.next()
        image = batch[0].astype('uint8')
        rnd = round(random.random()*10000)
        imgPath = outPath + str(rnd) + ".png"
        image = cv2.resize(image, (rows, cols))
        cv2.imwrite(imgPath, image)
            
    
    # load the image
    datagen = ImageDataGenerator(rotation_range=45)
    # prepare iterator
    it = datagen.flow(samples, batch_size=1)
    # generate samples and plot
    for i in range(0,2):
        #pyplot.subplot(330 + 1 + i)
        batch = it.next()
        image = batch[0].astype('uint8')
        #pyplot.imshow(image)
        rnd = round(random.random()*10000)
        imgPath = outPath + str(rnd) + ".png"
        image = cv2.resize(image, (rows, cols))
        cv2.imwrite(imgPath, image)
            
    # create image data augmentation generator
    datagen = ImageDataGenerator(brightness_range=[0.2,1.0])
    # prepare iterator
    it = datagen.flow(samples, batch_size=1)
    # generate samples and plot
    for i in range(0,2):
        #pyplot.subplot(330 + 1 + i)
        batch = it.next()
        image = batch[0].astype('uint8')
        #pyplot.imshow(image)
        rnd = round(random.random()*10000)
        imgPath = outPath + str(rnd) + ".png"
        image = cv2.resize(image, (rows, cols))
        cv2.imwrite(imgPath, image)
            
    # show the figure
    #pyplot.show()
    
    datagen = ImageDataGenerator(height_shift_range=[-100,100])
    # prepare iterator
    it = datagen.flow(samples, batch_size=1)
    # generate samples and plot
    for i in range(0,2):
        #pyplot.subplot(330 + 1 + i)
        batch = it.next()
        image = batch[0].astype('uint8')
        #pyplot.imshow(image)
        rnd = round(random.random()*10000)
        imgPath = outPath + str(rnd) + ".png"
        image = cv2.resize(image, (rows, cols))
        cv2.imwrite(imgPath, image)
            
    # show the figure
    #pyplot.show()
    
    datagen = ImageDataGenerator(horizontal_flip=True)
    # prepare iterator
    it = datagen.flow(samples, batch_size=1)
    # generate samples and plot
    for i in range(0,2):
        #pyplot.subplot(330 + 1 + i)
        batch = it.next()
        image = batch[0].astype('uint8')
        #pyplot.imshow(image)
        rnd = round(random.random()*10000)
        imgPath = outPath + str(rnd) + ".png"
        image = cv2.resize(image, (rows, cols))
        cv2.imwrite(imgPath, image)
            
    # show the figure
    #pyplot.show()
    
    datagen = ImageDataGenerator(width_shift_range=[-100,100])
    # prepare iterator
    it = datagen.flow(samples, batch_size=1)
    # generate samples and plot
    for i in range(0,2):
        #pyplot.subplot(330 + 1 + i)
        batch = it.next()
        image = batch[0].astype('uint8')
        #pyplot.imshow(image)
        rnd = round(random.random()*10000)
        imgPath = outPath + str(rnd) + ".png"
        image = cv2.resize(image, (rows, cols))
        cv2.imwrite(imgPath, image)
            
    # show the figure
    #pyplot.show()