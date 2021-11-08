#!/bin/bash
USER=eyesmedia
INSTALL_BASE=/usr/services/eyesmedia/apps
ARTIFACT="eyesmedia-mobii-campaign-ui"
INSTALL_HOME=$INSTALL_BASE/$ARTIFACT
WORK_DIR=$(pwd)
echo "working dir is ${WORK_DIR}"
cd $WORK_DIR/$ARTIFACT
cp -Rf $WORK_DIR/$ARTIFACT $INSTALL_HOME
cd $INSTALL_HOME
chown -R $USER:$USER $INSTALL_HOME

result=$(systemctl | grep $ARTIFACT | cut -d '.' -f1)
if [ -n "$result" ]; then
    systemctl stop $ARTIFACT.service
fi

cp -f $INSTALL_HOME/systemd/$ARTIFACT.service /usr/lib/systemd/system/
systemctl enable /usr/lib/systemd/system/$ARTIFACT.service
systemctl daemon-reload
systemctl start $ARTIFACT.service

