#!/usr/bin/python
import re, sys
import math

f = open('fwords.txt', 'r')

fwords = set()
for w in f.readlines():
  if w == '' or w[0] == '.' or w[0] == '#' or w[0] == ' ': continue
  else: fwords.add(w.strip())
fwords.remove('')

ftxt = open(sys.argv[1], 'r')
txt = ftxt.read()
sentences = []
curSnt = ""
for ch in txt:
  if ch in "?!.":
    sentences.append((curSnt,ch))
    curSnt = ""
  else:
    curSnt += ch

dft = {} # term 'document' frequency
sntCnt = len(sentences)
fwdist = []
sntNum = 1
maxWNum = 0
for (snt,stype) in sentences:
  wrds = snt.split()
  wrdsNum = len(wrds)
  maxWNum = max(maxWNum, wrdsNum)

  if wrdsNum == 0: continue

  fwNum = 0
  wset = set()
  tf = {} # term frequency
  for w in wrds:
    if w in fwords: fwNum += 1
    else:
      lw = w.lower()
      wset.add(lw)
      tf[lw] = tf.get(lw,0)+1

  for lw in wset:
    dft[lw] = dft.get(lw,0)+1


  sDesc = {}
  sDesc["snt"] = snt
  sDesc["wn"] = wrdsNum
  sDesc["fwn"] = fwNum
  ratio = float(fwNum)/wrdsNum
  sDesc["ratio"] = ratio
  sDesc["sntnum"] = sntNum
  sDesc["stype"] = stype
  sDesc["tf"] = tf
  sntNum += 1

  fwdist.append(sDesc)

#calc idf
idft = {}
for lw,freq in dft.items():
  idft[lw] = abs(math.log(float(sntCnt)/freq,10))

# calc tfidf
maxTfidf = 0.0
for sd in fwdist:
  tfidf = {}
  for t,f in sd["tf"].items():
    tfidf[t] = f*idft[t]
    maxTfidf = max(tfidf[t], maxTfidf)
  sd["tfidf"] = tfidf

# calc score
for sd in fwdist:
  stype = sd["stype"]
  wrdsNum = float(sd["wn"])
  typeScore = (stype == "." and 0.6) or (stype == "!" and 0.3) or (stype == "?" and 0.2)
  orderScore = sd["sntnum"] == 1 and 0.6 or 0.0
  
  mtidf = [0.0,0.0,0.0]
  for t,v in sd["tfidf"].items():
    if min(mtidf) < v:
      mf = min(mtidf)
      if mtidf[0] == mf: mtidf[0] = v
      elif mtidf[1] == mf: mtidf[1] = v
      elif mtidf[2] == mf: mtidf[2] = v
  sd["min3tfidf"] = mtidf

  sd["score"] = (sd["ratio"] + wrdsNum/maxWNum + typeScore + sum(mtidf)/float(maxTfidf) + orderScore) / 7.0

for fwd in sorted(fwdist, key=lambda fwd: fwd["score"]):
  del fwd["tfidf"]
  del fwd["tf"]
  del fwd["stype"]
  print fwd
  print ""

#print fwdist[0].keys()

