#/bin/bash

cd public/ox-hugo

for i in $(find . -type f -regex ".*[jpg,png]" -not -regex ".*tmp.*");
do 
  bname=$(basename "${i}" ".${i##*.}")
  outname="tmp_$bname.webp"
  vipsthumbnail -s "1024x>" -o "tmp_%s.webp[Q=85]" $i;
  mv $outname $i
done;

cd public/posts

for i in $(find . -type f -regex ".*[jpg,png]" -not -regex ".*tmp.*");
do 
  bname=$(basename "${i}" ".${i##*.}")
  outname="tmp_$bname.webp"
  vipsthumbnail -s "1024x>" -o "tmp_%s.webp[Q=85]" $i;
  mv $outname $i
done;
