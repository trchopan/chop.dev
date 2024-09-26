#!/bin/bash

DEST=static/revealjs/

wget -q https://github.com/hakimel/reveal.js/archive/master.zip -O revealjs.zip

unzip revealjs.zip

mkdir -p $DEST
cp -r reveal.js-master/dist $DEST
cp -r reveal.js-master/plugin $DEST
ls $DEST

rm -r reveal.js-master
rm revealjs.zip
