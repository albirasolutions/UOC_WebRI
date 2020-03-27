#
#  CAREFUL!!!! This bash does not update the content/ and static/ folder, and the file ./themes/uoc/static/admin/main.js to prevent overwriting the plataconApiUrl variable
#
# create tmp folder
mkdir ../PLATACON_WEB_RI_PRE_TMP/
cd ../PLATACON_WEB_RI_PRE/
# copy content to tmp folder
cp -r * ../PLATACON_WEB_RI_PRE_TMP/
cd ../UOC_WebRI
# copy new content to folder
cp * -r ../PLATACON_WEB_RI_PRE/ 
cd ../PLATACON_WEB_RI_PRE/
# remove content folder
rm -r ./content
rm -r ./static
rm -r ./bin
# copy content folder from backup folder
cp -r ../PLATACON_WEB_RI_PRE_TMP/content/ .
cp -r ../PLATACON_WEB_RI_PRE_TMP/static/ .
cp ../PLATACON_WEB_RI_PRE_TMP/themes/uoc/static/admin/main.js ./themes/uoc/static/admin/main.js
# remove backup folder
rm -r ../PLATACON_WEB_RI_PRE_TMP/
git add -A 
git commit -m "IECISA update on `date +'%Y-%m-%d %H:%M:%S'`";
git push https://support%40albirasolutions.com:%3BO%3A56]%60%3E%2F06u63G@github.com/UOC/PLATACON_WEB_RI_PRE.git --all