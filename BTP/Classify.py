import matplotlib.pyplot as plt
import numpy as np
import PIL
import tensorflow as tf
from tensorflow import keras
from Input_file import Query_Image
from tensorflow.keras.models import Sequential
import matplotlib.pyplot as plt
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image

def classification():

  model=load_model('model.h5')
  img_height=600
  img_width=590
# Define a mapping between class indices and names
  class_names = ['banquethall', 'building', 'crushingtool', 'school']
  sunflower_url = Query_Image()
  img = keras.preprocessing.image.load_img(sunflower_url, target_size=(img_height, img_width)
                                             )
  img_array = keras.preprocessing.image.img_to_array(img)
  img_array = tf.expand_dims(img_array, 0)  # Create a batch

  predictions = model.predict(img_array)
  score = tf.nn.softmax(predictions[0])

  print(
        "This image most likely belongs to {} with a {:.2f} percent confidence."
        .format(class_names[np.argmax(score)], 100 * np.max(score))
    )
  return class_names[np.argmax(score)]