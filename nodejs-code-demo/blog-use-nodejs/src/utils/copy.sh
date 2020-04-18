#!/bin/sh
cd /Users/baojiawei/Documents/for-my-self/git/Nodejs-ts/nodejs-code-demo/blog-use-nodejs/logs
cp access.log $(date +%Y-%m-%d).access.log
echo "" > access.log