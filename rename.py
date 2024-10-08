import os

target_folder=input("Enter target folder: ")
os.chdir(target_folder)
file_list=os.listdir(target_folder)

for file in file_list:
    os.rename(file,file+".jpg")
