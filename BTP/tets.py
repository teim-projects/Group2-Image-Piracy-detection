from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import ImageDataGenerator

# Load the saved model
model = load_model('model.h5')

# Define the test data generator
test_datagen = ImageDataGenerator(rescale=1./255)

# Load the test data
test_data = test_datagen.flow_from_directory('D:/BTP/Final_Resized/banquethall/banquethall2.jpg',
                                              target_size=(600, 590),
                                              batch_size=32,
                                              class_mode='sequential')

# Evaluate the model on the test data
loss, accuracy = model.evaluate(test_data)

# Print the accuracy
print('Test accuracy:', accuracy)
