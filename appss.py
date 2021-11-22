
import flask
from flask import request
import json

import pandas as pd

app = flask.Flask(__name__)
# app.config["DEBUG"] = True

from flask import Flask
from flask_cors import CORS, cross_origin
import shutil
import copy

app = Flask(__name__)
CORS(app)
new_strings = []
datafiles=[]


# http://localhost:8000/
# print(new_strings)
@app.route('/', methods=['GET', 'POST'])
def home():
	maindata=request.data.decode('utf-8')
	# print("maindata")
	# print(maindata)
	# print(maindata)
	# main_list = list(map(str,maindata))
	main_list = maindata.split(",")
	# print(main_list)
	# print(len(main_list))
	# print(main_list)
	filename=main_list.pop(0)
	trainfilename=main_list.pop(0)
	urlprf=main_list.pop(0)
	main_list = [string for string in main_list if string != ""]
	# print(filename)
	# [[row] for row in main_list]
	main_list=[main_list[x:x+11] for x in range(0,len(main_list),11)]
	# print("main_list")
	# print(main_list)
	# print(len(main_list))




	# print(main_list)
	# main_list=[row[0:-1]+[int(row[-1][0:-2])] for row in main_list]
	# main_list.pop(-1)
	# print(main_list)
	for i in range(0,len(main_list)):
		main_list[i][-1]=main_list[i][-1][0:-1]
    # print("length")
	# print(len(main_list))
	main_list = [ele for ele in main_list if ele != ['']]
	train_list=main_list

	# print("main_list")
	# print(main_list)
	new_strings = []
	for string in train_list:
		for news in string:
			new_string = news.replace(urlprf, "")
			new_strings.append(new_string)
			# print(new_strings)
	train_list = [string for string in new_strings if string != ""]
	# print(filename)
	# [[row] for row in main_list
	train_list=[train_list[x:x+11] for x in range(0,len(train_list),11)]
	# print("main_list")
	# print(train_list)
	# for string in train_list:
	# 	for newone in string:
	# 		new_string = newone.replace("http://localhost:8000/", "")
	# 		# print([new_string])
	# 		new_strings.append(new_string)

	# new_strings = [string for string in new_strings if string != ""]
	# # print(filename)
	# # [[row] for row in main_list]
	# new_strings=[new_strings[x:x+11] for x in range(0,len(new_strings),11)]
	# print("main_list")
	# print(main_list)
	# print(len(main_list))
	# print(new_strings)
	# print(type(new_strings))


	# print(main_list)
	# main_list=[row[0:-1]+[int(row[-1][0:-2])] for row in main_list]
	# main_list.pop(-1)
	# print(new_strings)
	# for i in range(0,len(main_list)):
	# 	main_list[i][-1]=main_list[i][-1][0:-1]
	# # print("newstrings")
	# print(new_strings)
	# train_list=new_strings
	# print("train_list")
	# print(train_list)

	main_list=pd.DataFrame(main_list)
	# train_list=pd.DataFrame(train_list)

	# train_list=main_list

	# main_list.iloc[:,-1]=main_list.iloc[:,-1].replace(['\r'],[''])
	main_list.to_csv(filename,index=False,header=False)
	# main_list = [ele for ele in main_list if ele != []]

    #important
	# train_list.drop(train_list.columns[[6,10]], axis = 1, inplace = True)
	# train_list = [ele for ele in train_list if ele != []]

	# train_list.to_csv(trainfilename,index=False,header=False)

	csvfile=pd.read_csv(filename)
	# print(csvfile)
	# trainfilename=filename
	list1=[]
	list2=[]
	csvfile.columns=['filepath','xmin','ymin','xmax','ymax','classname','croppath','height','width','shape','gb']
	for i in range(0,csvfile.shape[0]):
		if(csvfile['gb'][i]=='G'):
			list1.append([csvfile['filepath'][i],csvfile['xmin'][i],csvfile['ymin'][i],csvfile['xmax'][i],csvfile['ymax'][i],csvfile['classname'][i],csvfile['height'][i],csvfile['width'][i],csvfile['shape'][i]])
		else:
			list2.append([csvfile['filepath'][i],csvfile['xmin'][i],csvfile['ymin'][i],csvfile['xmax'][i],csvfile['ymax'][i],csvfile['classname'][i],csvfile['height'][i],csvfile['width'][i],csvfile['shape'][i]])

	# print(list1)
	# list1.tolist()

	new_strings_list1 = []
	for string in list1:
		for news in string:
			res = isinstance(news, str)
			if(res==True):
				news = news.replace(urlprf, "")
			new_strings_list1.append(news)
				# print(new_strings)
	list1 = [string for string in new_strings_list1 if string != ""]
		# print(filename)
		# [[row] for row in main_list
	list1=[list1[x:x+9] for x in range(0,len(list1),9)]

	# print("list1")	
	# print("main_list")
	# print(list1)


	new_strings_list2 = []
	for string in list2:
		for news in string:
			res = isinstance(news, str)
			if(res==True):
				news = news.replace(urlprf, "")
			new_strings_list2.append(news)
				# print(new_strings)
	list2 = [string for string in new_strings_list2 if string != ""]
		# print(filename)
		# [[row] for row in main_list
	list2=[list2[x:x+9] for x in range(0,len(list2),9)]

	# print("list1")	
	# print("main_list")
	# print(list1)




	list1=pd.DataFrame(list1)
	list2=pd.DataFrame(list2)

	list1=list1.to_csv('good_'+trainfilename,index=False,header=False)

	list2=list2.to_csv('confusing_'+trainfilename,index=False,header=False)



		# print(main_list)
		# print(type(main_list))
		# print(type(maindata))
		# filename=main_list[0]
		# dataupdated=main_list[1::]
		# print("filename")
		# print(filename)
		# print("dataupdated")
		# print(dataupdated)
		# print(request.form)
	# print(type(request.form))

	return "<h1>Distant Reading Archive</h1><p>This site is a prototype API for distant reading of science fiction novels.</p>"

@app.route('/delete', methods=['GET', 'POST'])
def delete_crop():
	maindatadelete=request.data.decode('utf-8')
	print(maindatadelete)
	# print(type(maindatadelete))
	import os
	# path = "http://localhost:8000/outnew/dettol_bs_orignal_side_115gm/dettol_bs_orignal_side_115gm7.png"
	# maindatadelete=str(map(list,maindatadelete))
	# print(maindatadelete)
	# maindatadelete="http://localhost:8000/outnew/dettol_bs_orignal_side_115gm/dettol_bs_orignal_side_115gm7.png"
	# maindatadelete=maindatadelete[0]

	normalized_path = os.path.normpath(maindatadelete)
	# print(normalized_path)
	path_components = normalized_path.split(os.sep)

	finalpath=os.path.join(path_components[-3],path_components[-2],path_components[-1])

	# print(path_components)
	# print(finalpath)
	# os.remove(finalpath)

	return "<h1>Distant Reading Archive</h1><p>Done deleting</p>"

@app.route('/change', methods=['GET', 'POST'])
def change():
	print("wow")
	import os
	maindatachange=request.data.decode('utf-8')
	# print(maindatachange)
	# print(maindata)
	# main_list = list(map(str,maindata))
	main_list = maindatachange.split(",")
	# print(main_list)
	# print(len(main_list))
	# print(main_list)
	filename=main_list.pop(0)
	trainfilename=main_list.pop(0)
	urlprf=main_list.pop(0)
	main_list = [string for string in main_list if string != ""]
	# print(filename)
	# [[row] for row in main_list]
	main_list=[main_list[x:x+11] for x in range(0,len(main_list),11)]
	# print("main_list")
	# print(main_list)
	# print(main_list)
	# print(len(main_list))


	# print(main_list)
	# main_list=[row[0:-1]+[int(row[-1][0:-2])] for row in main_list]
	# main_list.pop(-1)
	# print(main_list)
	for i in range(0,len(main_list)):
		main_list[i][-1]=main_list[i][-1][0:-1]
    # print("length")
	# print(len(main_list))
	main_list = [ele for ele in main_list if ele != ['']]
	main_list=pd.DataFrame(main_list,columns=['a','b','c','d','e','f','g','h','i','j','k'])
	print(main_list)

	# print(main_list)
	newlist=[];
	for row in main_list.values:
		# print(row)
		if(row[-1]=='needchang'):
			print(row[-1])
			path=row[-5]
			normalized_path = os.path.normpath(path)
			og_path_components = normalized_path.split(os.sep)
			newpathcomponents=copy.deepcopy(og_path_components)
			newpathcomponents[3]="confusing"
			# print(newpathcomponents)
			# print(og_path_components)
			src=os.path.join(og_path_components[-3],og_path_components[-2],og_path_components[-1])
			dest=os.path.join(newpathcomponents[-3],newpathcomponents[-2],newpathcomponents[-1])
			# print(src)
			# print(dest)
			os.makedirs(og_path_components[-3]+"/"+"confusing",exist_ok=True)
			shutil.copy(src,dest)
			newpath=newpathcomponents[-5]+'//'+newpathcomponents[-4]+'/'+newpathcomponents[-3]+'/'+newpathcomponents[-2]+'/'+newpathcomponents[-1]
			main_list.loc[main_list['g']==row[-5],['k']]='moved'
			main_list.loc[main_list['g']==row[-5],['g']]=newpath
	

	main_list.to_csv(filename,index=False,header=False)

	csvfile=pd.read_csv(filename)
	list1=[]
	list2=[]
	csvfile.columns=['filepath','xmin','ymin','xmax','ymax','classname','croppath','height','width','shape','gb']
	for i in range(0,csvfile.shape[0]):
		if(csvfile['gb'][i]=='G'):
			list1.append([csvfile['filepath'][i],csvfile['xmin'][i],csvfile['ymin'][i],csvfile['xmax'][i],csvfile['ymax'][i],csvfile['classname'][i],csvfile['height'][i],csvfile['width'][i],csvfile['shape'][i]])
		else:
			list2.append([csvfile['filepath'][i],csvfile['xmin'][i],csvfile['ymin'][i],csvfile['xmax'][i],csvfile['ymax'][i],csvfile['classname'][i],csvfile['height'][i],csvfile['width'][i],csvfile['shape'][i]])

	# print(list1)
	# list1.tolist()

	new_strings_list1 = []
	for string in list1:
		for news in string:
			res = isinstance(news, str)
			if(res==True):
				news = news.replace(urlprf, "")
			new_strings_list1.append(news)
				# print(new_strings)
	list1 = [string for string in new_strings_list1 if string != ""]
		# print(filename)
		# [[row] for row in main_list
	list1=[list1[x:x+9] for x in range(0,len(list1),9)]

	# print("list1")	
	# print("main_list")
	# print(list1)


	new_strings_list2 = []
	for string in list2:
		for news in string:
			res = isinstance(news, str)
			if(res==True):
				news = news.replace(urlprf, "")
			new_strings_list2.append(news)
				# print(new_strings)
	list2 = [string for string in new_strings_list2 if string != ""]
		# print(filename)
		# [[row] for row in main_list
	list2=[list2[x:x+9] for x in range(0,len(list2),9)]

	# print("list1")	
	# print("main_list")
	# print(list1)




	list1=pd.DataFrame(list1)
	list2=pd.DataFrame(list2)

	list1=list1.to_csv('good_'+trainfilename,index=False,header=False)

	list2=list2.to_csv('confusing_'+trainfilename,index=False,header=False)

	
	return "<h1>Distant Reading Archive</h1><p>Done changing</p>"


@app.route('/executemypy', methods=['GET', 'POST'])
def executemypy():
	import os
	import subprocess
	datafiles=request.data.decode('utf-8')
	# print(maindatachange)
	# print(maindata)
	# main_list = list(map(str,maindata))
	main_list = datafiles.split(",")
	# print(main_list)
	# print(len(main_list))
	# print(main_list)
	trfile=main_list.pop(0)
	crpdir=main_list.pop(0)
	crpfile=main_list.pop(0)
	urlfile=main_list.pop(0)

	os.makedirs(crpdir,exist_ok=True)


	subprocess.Popen("python get_crops_with_csv_1.py %s %s %s %s" % (trfile, crpdir,crpfile,urlfile) ,shell=True)


	return "<h1>Distant Reading Archive</h1><p>Done changing</p>"



#app.debug = True
app.run()
