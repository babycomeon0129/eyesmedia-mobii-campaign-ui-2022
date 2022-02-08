#!/bin/bash



USER=eyesmedia
INSTALL_BASE=/usr/services/eyesmedia/apps

source ~/.bashrc



export NODE_OPTIONS=--max_old_space_size=8192



cd /usr/services/eyesmedia/apps/eyesmedia-mobii-campaign-ui
#/usr/bin/sudo rm -rf /usr/services/eyesmedia/apps/eyesmedia-mobii-campaign-ui/*

nvm use v14.17.5
#npm install 12.18.2 &&
npm install npm@8.3.1 &&
npm run build-sit
#npm run start-sit
