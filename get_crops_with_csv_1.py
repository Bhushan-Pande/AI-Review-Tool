from PIL import Image
import cv2
import csv
import os
import numpy as np
import sys
from datetime import datetime
from PIL import ImageFile

ImageFile.LOAD_TRUNCATED_IMAGES = True

#output_path = sys.argv[2]
#x=os.path.split(r'C:\xampp\htdocs\Review_Inference\bhushan_chintan\dettol_asl_725ml')
#print(x)
import csv
count = 0
newdata=[]
inp_csv = sys.argv[1]
#inp_csv= r'C:\xampp\htdocs\Review_Inference\bhushan_chintan\train_annotations_1.csv'

out_pth = sys.argv[2]

outcsv=sys.argv[3]

urllink=sys.argv[4]
#out_csv =r'new.csv'
#csv_file = open(out_csv, "w")

csv_file_dir = os.path.dirname(inp_csv)
print("output_path")

output_path = os.path.dirname(out_pth+'\\')

print(output_path)
with open(inp_csv, "rt", encoding='ascii') as infile:
    read = csv.reader(infile)
    for row in read :
            print("row")
            print(len(row))
            #img =  Image.open(row[0])
            #crop_rectangle = (int(row[1]), int(row[2]),int(row[3]), int(row[4]))
            #cropped = img.crop(crop_rectangle)
            #print (row[0])
            # output_path=r'C:\xampp\htdocs\Review_Inference\bhushan_chintan\data_retail_3rd-delivery_march19_100\IMG_20210214_154100.jpg'

            compl=os.path.split(output_path)[-2]
            # print(filey)

            normalized_path = os.path.normpath(row[0])
            # print(normalized_path)
            path_components = normalized_path.split(os.sep)
            # print(path_components[-1])
            # print(path_components[-2])


            # print ("Curr Dir", os.getcwd())
            filex=os.path.split(os.getcwd())[1]
            filey=os.path.split(output_path)[1]
            img_file_name = row[0]
            img_file_path = os.path.join(csv_file_dir, row[0])
            # im = Image.open(img_file_path)
            # im.save(img_file_path)
            # im.close()
            img = cv2.imread(img_file_path)
            # imgh = img.shape[0] 
            # imgw = img.shape[1] 
            cropped = img[int(row[2]):int(row[4]), int(row[1]):int(row[3])]

            #b_channel, g_channel, r_channel = cv2.split(cropped)
            #alpha_channel = np.ones(b_channel.shape, dtype=b_channel.dtype) * 50
            #alpha_channel = alpha_channel.astype(np.uint8)
            #img_BGRA = cv2.merge((b_channel, g_channel, r_channel,alpha_channel))
            #print(img_BGRA.shape)
            print(count)
            now = datetime.now()
            outfile = '%s.png' % (str(row[5])+str(count))
            # print(outfile)
            # print("outfile")
            # print(os.path.dirname(outfile))

            #cropped.save(outfile)
            #C:\Users\Dell\Desktop\xplorazzi_images\test\Tikaas\Newdata_Tika\set1_924images\result_crop\dettol_bs_orignal\dettol_bs_orignal0.png
            # print(output_path[-2])
            # print("row5")
            # print(row[5])
            # print(os.path.abspath(row[5]))
            print(urllink+path_components[-2]+'/'+path_components[-1])

              #cropped.save(outfile)
            if len(row) > 6:
                imgh = img.shape[0]
                imgw = img.shape[1]
                channels=img.shape[2]
                newdata.append([urllink+path_components[-2]+'/'+path_components[-1], row[1], row[2],row[3],row[4] ,str(row[5]),urllink+filey+'/'+row[5]+'/'+outfile,str(imgh),str(imgw),channels,'G'])
            #row[7],row[6],row[8]

            else:
                imgh = img.shape[0]
                imgw = img.shape[1]
                channels=img.shape[2]
                newdata.append([urllink+row[0], row[1], row[2],row[3],row[4] ,str(row[5]),urllink+filey+'/'+row[5]+'/'+outfile,str(imgh),str(imgw),channels,'G'])

            #newdata.append([row[0], row[1], row[2],row[3],row[4] ,str(row[5]),output_path+'/'+row[5]+'/'+outfile])
            #newdata.append(["http://localhost:8000/"+row[0], row[1], row[2],row[3],row[4] ,str(row[5]),"http://localhost:8000/"+row[5]+'/'+outfile,str(imgh),str(imgw)])
            # newdata.append(["http://localhost:8000/"+row[0], row[1], row[2],row[3],row[4] ,str(row[5]),"http://localhost:8000/"+filey+'/'+row[5]+'/'+outfile,str(imgh),str(imgw)])
            
            height, width, channels = cropped.shape

            #if (not os.path.exists(output_path)):
            #    os.mkdir(output_path)
                
            if (not os.path.exists(os.path.join(output_path,str(row[5])))):
                os.mkdir(os.path.join(output_path,str(row[5])))

            cv2.imwrite(os.path.join(os.path.join(output_path,str(row[5])),outfile), cropped)
            #print (os.path.join(os.path.join(output_path,str(row[5])),outfile))
            #csv_file.write(os.path.join(os.path.join(output_path,str(row[5])),outfile)+",0,0,"+str(width)+","+str(height)+","+str(row[5])+"\n")
            # csv_file.write(os.path.join(os.path.join(output_path,str(row[5])),outfile)+",0,0,"+str(width)+","+str(height)+","+str(row[5])+"\n")
            count+= 1


with open(outcsv,'w', newline='') as fd:
    writer = csv.writer(fd)
    writer.writerows(newdata)
    

# csv_file.close()
