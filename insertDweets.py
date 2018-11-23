#!/usr/bin/python
# -*- coding: utf-8 -*-

import sqlite3 as lite
import sys
import sendDweets

con = lite.connect('dweets.db')

with con:
    
    cur = con.cursor()

    


    row = [sendDweets.get('temp')]
    
    cur.execute("INSERT INTO Temperature VALUES(NULL, ?)", row)
