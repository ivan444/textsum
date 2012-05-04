#!/usr/bin/python
import re
import math
import sys

ftxt = open(sys.argv[1], "r")
txt = ftxt.read()
sentences = []
curSnt = ""
num = 1
for ch in txt:
  if ch in "?!.":
    curSnt += ch
    print str(num) + ": " + curSnt.strip()
    print ""
    num += 1
    curSnt = ""
  else:
    curSnt += ch

if curSnt != "":
  print str(num) + ": " + curSnt.strip()
