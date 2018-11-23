#https://stackoverflow.com/questions/45626417/how-to-sleep-my-python-script-every-hour
#https://stackoverflow.com/questions/7974849/how-can-i-make-one-python-file-run-another
import sendDweets
import readDweets
import time

def dweet():
        sendDweets.dweeter()

def read():
        readDweets.reader()

def action():
    while True:
        dweet()
        time.sleep(1)#1.5 second intervals
        read()

action()

