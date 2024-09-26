#!/bin/bash

REVEALJS_DEST=static/revealjs/

wget -q https://github.com/hakimel/reveal.js/archive/master.zip -O revealjs.zip

unzip revealjs.zip

mkdir -p $REVEALJS_DEST
cp -r reveal.js-master/dist $REVEALJS_DEST
cp -r reveal.js-master/plugin $REVEALJS_DEST

ls $REVEALJS_DEST

rm -r reveal.js-master
rm revealjs.zip

BLOWFISH_VERSION=2.77.1

wget -q "https://github.com/nunocoracao/blowfish/archive/refs/tags/v$BLOWFISH_VERSION.zip" -O blowfish.zip

unzip blowfish.zip

mv blowfish-* themes/blowfish
rm blowfish.zip

ls themes
