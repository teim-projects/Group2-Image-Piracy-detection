import pandas as pd 
import urllib.request

def url_to_jpg(i, url, file_path):
    print(i)
    print("lets see how it goes")

    filename = 'image-{}.jpg'.format(i+1)
    print(filename)
    full_path = '{}{}'.format(file_path,filename)
    urllib.request.urlretrieve(url, full_path)

    print('{}saved.'.format(filename))
    return None


FILENAME = r'C:\Users\hp\OneDrive\Desktop\Btech-Project\README\BTP\crushingtool.csv'
FILE_PATH ='C:/Users/hp/OneDrive/Desktop/Btech-Project/README/BTP/Apify/crushingtool1/'

urls = pd.read_csv(FILENAME)

for i, url in enumerate(urls.values):
    print(i)
    print(url[0][i])
    print("lets see how it goes")
    url_to_jpg(i, url[0], FILE_PATH)
    # if 0 in urls.columns:
    #     url_to_jpg(i, url[0], FILE_PATH)
    # else:
    #     print("Key 0 not found in DataFrame")

