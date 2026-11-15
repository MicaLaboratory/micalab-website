#!/bin/bash
# Upload the site to the IONOS webspace over SFTP.
#
#   ./deploy.sh          show what would change, then ask before uploading
#   ./deploy.sh --force  also allow uploading with uncommitted changes
#
# Setup (once):
#   brew install lftp
#   cp .deploy.env.example .deploy.env      # then fill in host, user, path
#   security add-generic-password -s micalab-deploy -a <sftp-user> -w   # prompts for the SFTP password
#   sftp <sftp-user>@<host>                 # connect once to accept the server's host key, then type exit
#
# Only uploads new or changed files. It never deletes anything on the server.

set -euo pipefail
cd "$(dirname "$0")"

[ -f .deploy.env ] || { echo "Missing .deploy.env (copy .deploy.env.example and fill it in)"; exit 1; }
source .deploy.env
: "${DEPLOY_HOST:?set DEPLOY_HOST in .deploy.env}"
: "${DEPLOY_USER:?set DEPLOY_USER in .deploy.env}"
: "${DEPLOY_PATH:=/}"

command -v lftp >/dev/null || { echo "lftp not found: brew install lftp"; exit 1; }

if [ "${1:-}" != "--force" ]; then
  if [ -n "$(git status --porcelain)" ]; then
    echo "You have uncommitted changes. Commit them first, or run ./deploy.sh --force"
    git status --short
    exit 1
  fi
fi

LFTP_PASSWORD=$(security find-generic-password -s micalab-deploy -a "$DEPLOY_USER" -w 2>/dev/null) || {
  echo "No password in the keychain. Run: security add-generic-password -s micalab-deploy -a $DEPLOY_USER -w"
  exit 1
}
export LFTP_PASSWORD

# Not part of the live site (quoted for lftp, which parses this string itself)
EXCLUDES=''
for g in .git/ .github/ .claude/ .gitignore .DS_Store '*/.DS_Store' \
         .deploy.env .deploy.env.example deploy.sh CLAUDE.md DESIGN.md \
         slideAssets/ 'mica lab Values.docx' jobs/; do
  EXCLUDES+=" --exclude-glob \"$g\""
done

run_mirror() {
  lftp -c "
    set net:max-retries 2; set net:timeout 20;
    open --env-password -u \"$DEPLOY_USER\" \"sftp://$DEPLOY_HOST\";
    mirror --reverse --only-newer --no-perms --parallel=4 $1 $EXCLUDES . \"$DEPLOY_PATH\"
  "
}

echo "Checking what would change on $DEPLOY_HOST:$DEPLOY_PATH ..."
PLAN=$(run_mirror --dry-run)
if [ -z "$PLAN" ]; then
  echo "Nothing to upload: the server is up to date."
  exit 0
fi
echo "$PLAN"
echo
read -r -p "Upload these files to micalab.org? [y/N] " ok
[ "$ok" = "y" ] || [ "$ok" = "Y" ] || { echo "Cancelled."; exit 0; }

run_mirror --verbose
echo "Done. Check https://micalab.org (hard refresh with Cmd+Shift+R)."
