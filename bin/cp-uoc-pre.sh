##########################################################
#
#  CAREFUL!!!! This bash does not update the content/ and static/ folder, and the file ./themes/uoc/static/admin/main.js to prevent overwriting the plataconApiUrl variable
#  Execute from ./UOC_WebRI path ==> ./bin/cp-uoc-test.sh
#
# create tmp folder
mkdir ../PLATACON_WEB_RI_PRE_TMP/
# copy content to tmp folder
cd ../PLATACON_WEB_RI_PRE/
git pull
cp -r * ../PLATACON_WEB_RI_PRE_TMP/
# copy new content to folder
cd ../UOC_WebRI
cp -r * ../PLATACON_WEB_RI_PRE/ 
# remove content folder
cd ../PLATACON_WEB_RI_PRE/
rm -r ./content
rm -r ./static
rm -r ./bin
# copy content folder from backup folder
cp -r ../PLATACON_WEB_RI_PRE_TMP/content/ ./content
cp -r ../PLATACON_WEB_RI_PRE_TMP/static/ ./static
cp ../PLATACON_WEB_RI_PRE_TMP/themes/uoc/static/admin/main.js ./themes/uoc/static/admin/main.js
# copy content principal and cercador folders
cd ../UOC_WebRI
cp -r ./content/principal ../PLATACON_WEB_RI_PRE/content
cp -r ./content/cercador ../PLATACON_WEB_RI_PRE/content
cp -r ./content/mapa-ambits-recerca ../PLATACON_WEB_RI_PRE/content
cp -r ./content/difusions ../PLATACON_WEB_RI_PRE/content
# remove backup folder
rm -r ../PLATACON_WEB_RI_PRE_TMP/
cd ../PLATACON_WEB_RI_PRE/
#git add -A 
#git commit -m "INETUM update on `date +'%Y-%m-%d %H:%M:%S'`";
#git push https://mfonolledara%40uoc.edu:vdk5fRxh3V8pyKq@github.com/UOC/PLATACON_WEB_RI_PRE.git --all