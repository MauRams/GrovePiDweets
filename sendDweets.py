# IOTProject CA1.py
# Author Maurice Ramsbottom
# Snippets from Home_Weather_Display.py are used in this project
# For geolocation:
# https://stackoverflow.com/questions/24906833/get-your-location-through-python
# For Database:
# http://zetcode.com/db/sqlitepythontutorial/
# https://stackoverflow.com/questions/28126140/python-sqlite3-operationalerror-no-such-table
# https://stackoverflow.com/questions/11853167/parameter-unsupported-when-inserting-int-in-sqlite


import dweepy
import grovepi
import geocoder
import datetime
import socket
import sqlite3 as lite
import sys
import os.path
from grovepi import *
from time import sleep
from math import isnan
from time import gmtime, strftime

#set up the sensors
dht_sensor_port = 7 # connect the DHt sensor to port 7
dht_sensor_type = 0 # use 0 for the blue-colored sensor and 1 for the white-colored sensor
sound_sensor = 1 #port A1 for sound sensor
def dweeter():
        try:
            #get noise level
            def getNoiseLevel():
                lvl = grovepi.analogRead(sound_sensor)
                s = str(lvl)
                return s
            #get noise level        
            s=getNoiseLevel()
            time.sleep(.5)
            # get the temperature and Humidity from the DHT sensor
            [ temp,hum ] = dht(dht_sensor_port,dht_sensor_type)
            # check if we have nans
            # if so, then raise a type error exception
            if isnan(temp) is True or isnan(hum) is True:
                    raise TypeError('nan error')
                                 
            
            
        except (IOError, TypeError) as e:
                print(str(e))
                

        except KeyboardInterrupt as e:
                print(str(e))

        except Exception as e:
                print(str(e))
        #get long&lat
        def getLocation():
            g = geocoder.ip('me')
            l = str(g.latlng)
            return l
        #get Location
        l = getLocation()
        time.sleep(.5)      
        #get pi hostname
        host = socket.gethostname()
        #get timestamp
        def getTime():
                t = strftime("%Y-%m-%d %H:%M:%S", gmtime())
                return t
        t = getTime()
        
        def SendToDweet():           
            #initialise a list
            dict = {}
            #add the dict readings to the list
            dict["Temperature"] = temp
            dict["Humidity"] = hum
            dict["Noise Level"] = s
            dict["Latitude, Longitude"] = l
            dict["Hostname"] = host
            #send to dweet
            dweepy.dweet_for(host, dict)
        #run dweet send script
        SendToDweet()

        def insertDweets():
                #connect to the database using absolute path
                BASE_DIR  = os.path.dirname(os.path.abspath(__file__))
                db_path = os.path.join(BASE_DIR, "dweets.db")
                with lite.connect(db_path) as db:
                        cur = db.cursor()
                        #insert the records
                        cur.execute("INSERT INTO Temp VALUES(NULL, ?, ?);", (temp, t,))
                        cur.execute("INSERT INTO Hum VALUES(NULL, ?);", (hum,))
                        cur.execute("INSERT INTO Noise VALUES(NULL, ?,?);", (s,t,))
                        cur.execute("INSERT INTO Location VALUES(NULL, ?);", (l,))
        insertDweets()
        #print to the shell
        print("Dweeting sensor data... \n Temperature: ", temp, " \n Humidity: " ,hum,
              " \n Hostname: ", host, "\n Noise Level: ", s, "Latitude, Longitude: ", l)

