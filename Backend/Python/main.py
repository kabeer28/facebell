import requests
import time
import random
#from picamera import PiCamera
from pathlib import Path

#initalize camera
camera = PiCamera()
time.sleep(2)

#send POST request to API 
#gives local path to save photo of face to check
def pass_facial_data(path):
    #url = 'http://localhost:3000/v1/detected-face'
    #json = {'path':path}

    #x = requests.post(url=url, json=json)

    #print(x.text)
    ...

#handles button callback
#captures image from camera and saves to file in path. passes path into pass_facial_data function
def button_callback():
    filename = 'img_' + str(random.randint(1000,9999)) + '.png'
    path = str(current_path()) + '/captured/' + filename

    #get photo and save it 
    camera.capture(path)

    pass_facial_data(path)

#return path of parent script
def current_path():
    return Path(__file__).parent.absolute()

if __name__ == '__main__':
    #replace with future button code
    button_callback()