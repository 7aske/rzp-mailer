#!/usr/bin/env bash

[ -e "./scripts/server.conf" ] && source "./scripts/server.conf"

DEPLOY_HOST="${DEPLOY_HOST:-"digitize.rs"}"
DEPLOY_USER="${DEPLOY_USER:-"root"}"

scp ./etc/rzp-mailer.service "$DEPLOY_USER@$DEPLOY_HOST:/etc/systemd/system/"
ssh "$DEPLOY_USER@$DEPLOY_HOST" 'systemctl daemon-reload; systemctl enable rzp-mailer.service'

