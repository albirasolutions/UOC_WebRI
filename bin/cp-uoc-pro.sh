##########################################################
#
#  CAREFUL!!!! This bash does not update the content/ and static/ folder, and the file ./themes/uoc/static/admin/main.js to prevent overwriting the plataconApiUrl variable
#  Execute from ./UOC_WebRI path ==> ./bin/cp-uoc-test.sh
#
# create tmp folder
mkdir ../PLATACON_WEB_RI_PRO_TMP/
# copy content to tmp folder
cd ../Gitlab_UOC/PLATACON_WEB_RI_PRO/
git pull
cp -r * ../../PLATACON_WEB_RI_PRO_TMP/
# copy new content to folder
cd ../../UOC_WebRI
cp -r * ../Gitlab_UOC/PLATACON_WEB_RI_PRO/ 
# remove content folder
cd ../Gitlab_UOC/PLATACON_WEB_RI_PRO/
rm -r ./content
rm -r ./static
rm -r ./bin
# copy content folder from backup folder
cp -r ../../PLATACON_WEB_RI_PRO_TMP/content/ ./content
cp -r ../../PLATACON_WEB_RI_PRO_TMP/static/ ./static
cp ../../PLATACON_WEB_RI_PRO_TMP/themes/uoc/static/admin/main.js ./themes/uoc/static/admin/main.js
cp ../../PLATACON_WEB_RI_PRO_TMP/themes/uoc/static/admin/config.yml ./themes/uoc/static/admin/config.yml
# copy content principal and cercador folders
cd ../../UOC_WebRI
cp -r ./content/principal ../Gitlab_UOC/PLATACON_WEB_RI_PRO/content
cp -r ./content/cercador ../Gitlab_UOC/PLATACON_WEB_RI_PRO/content
cp -r ./content/mapa-ambits-recerca ../Gitlab_UOC/PLATACON_WEB_RI_PRO/content
cp -r ./content/difusions ../Gitlab_UOC/PLATACON_WEB_RI_PRO/content
# remove backup folder
rm -r ../PLATACON_WEB_RI_PRO_TMP/
cd ../Gitlab_UOC/PLATACON_WEB_RI_PRO/
# git add -A 
# git commit -m "INETUM update on `date +'%Y-%m-%d %H:%M:%S'`";
# git push https://mfonolledara%40uoc.edu:vdk5fRxh3V8pyKq@github.com/UOC/PLATACON_WEB_RI_PRO.git --all