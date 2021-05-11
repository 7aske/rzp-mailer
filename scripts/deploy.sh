#!/usr/bin/env bash

[ -e "./scripts/server.conf" ] && source "./scripts/server.conf"

DEPLOY_HOST="${DEPLOY_HOST:-"digitize.rs"}"
DEPLOY_USER="${DEPLOY_USER:-"root"}"

rsync -havz --delete --progress dist/ "$DEPLOY_USER@$DEPLOY_HOST:/srv/http/rzp/mailer/"
ssh "$DEPLOY_USER@$DEPLOY_HOST" 'systemctl restart rzp-mailer.service'
