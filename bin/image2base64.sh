#!/bin/bash
echo $*
for i in $*;
do
    if [ -f $i ];
    then
        base64 -w0 $i > $i.base64;
    fi
done
