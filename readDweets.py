#https://docs.python.org/3/library/pprint.html
#https://stackoverflow.com/questions/22676/how-do-i-download-a-file-over-http-using-python
#https://stackoverflow.com/questions/34014239/python-read-json-from-url
import requests
import json
import urllib3
import pprint
def reader():
    
    try:
        url_add = ['https://dweet.io:443/get/latest/dweet/for/mauramspi']#add the dweet url
        for i in url_add:#loop was for the 5 latest - left here in case this needs to be changed
            data = requests.get(i).json()#get each and output to JSON
    except HTTPError as ex: #error handling
        print (ex.read())
    f = open('dweets.json', 'a')#open a file to store read dweets
    f.write(json.dumps(data, indent=4))#format json
    f.close()#close file
    print("Writing latest dweet to file dweets.json...")
