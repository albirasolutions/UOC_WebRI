##########################################################
#
#  CAREFUL!!!! This bash does not update the content/ and static/ folder, and the file ./themes/uoc/static/admin/main.js to prevent overwriting the plataconApiUrl variable
#  Execute from ./UOC_WebRI path ==> ./bin/cp-uoc-test.sh
#
# create tmp folder
mkdir ../PLATACON_WEB_RI_PRO_TMP/
# copy content to tmp folder
cd ../PLATACON_WEB_RI_PRO/
cp -r * ../PLATACON_WEB_RI_PRO_TMP/
# copy new content to folder
cd ../UOC_WebRI
cp * -r ../PLATACON_WEB_RI_PRO/ 
# remove content folder
cd ../PLATACON_WEB_RI_PRO/
rm -r ./content
rm -r ./static
rm -r ./bin
# copy content folder from backup folder
cp -r ../PLATACON_WEB_RI_PRO_TMP/content/ .
cp -r ../PLATACON_WEB_RI_PRO_TMP/static/ .
cp ../PLATACON_WEB_RI_PRO_TMP/themes/uoc/static/admin/main.js ./themes/uoc/static/admin/main.js
# copy content principal folder
cd ../UOC_WebRI
cp -r ./content/principal ../PLATACON_WEB_RI_PRO/content
# remove backup folder
rm -r ../PLATACON_WEB_RI_PRO_TMP/
cd ../PLATACON_WEB_RI_PRO/
git add -A 
git commit -m "IECISA update on `date +'%Y-%m-%d %H:%M:%S'`";
git push https://mfonolledara%40uoc.edu:vdk5fRxh3V8pyKq@github.com/UOC/PLATACON_WEB_RI_PRO.git --all