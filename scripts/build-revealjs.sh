#!/bin/bash

DEST=static/revealjs/

wget https://github.com/hakimel/reveal.js/archive/master.zip -O revealjs.zip

unzip revealjs.zip

cp -r reveal.js-master/dist $DEST
cp -r reveal.js-master/plugin $DEST

rm -r reveal.js-master
rm revealjs.zip
