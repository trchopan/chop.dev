#/bin/bash

cd public/ox-hugo

for i in $(find . -type f -regex ".*[jpg,png]" -not -regex ".*tmp.*");
do 
  bname=$(basename "${i}" ".${i##*.}")
  outname="tmp_$bname.jpg"
  vipsthumbnail -s "868x>" -o "tmp_%s.jpg[Q=85]" $i;
  mv $outname $i
done;
