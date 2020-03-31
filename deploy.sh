#!/bin/bash
set -e # exit with nonzero exit code if anything fails

# squash messages
git config --global push.default matching

function getLatest {
  # clear and re-create the out directory
  rm -rf original || exit 0;
  mkdir original;

  # go to the out directory and create a *new* Git repo
  cd original
  git clone https://${GH_TOKEN}@github.com/imin-ltd/activity-providers-livestream-guide.git
  cd ..
}

function deployCopy {
  # clear and re-create the out directory
  rm -rf out || exit 0;
  mkdir out;

  # go to the out directory and create a *new* Git repo
  cd out
  git clone https://${GH_TOKEN}@github.com/imin-ltd/activity-providers-livestream-guide-$1.git

  # inside this git repo we'll pretend to be a new user
  git config user.name "Travis CI"
  git config user.email "travis@openactive.org"

  rm -rf

  cd ..

  # Regenerate Beta file only
  cp -r original/activity-providers-livestream-guide/* out/activity-providers-livestream-guide-$1

  cd out/activity-providers-livestream-guide-$1

  # The first and only commit to this new Git repo contains all the
  # files present with the commit message "Deploy to GitHub Pages".
  git add .
  git status
  git commit --message "Updating from source content: $TRAVIS_BUILD_NUMBER [ci skip]"

  # Force push from the current repo's master branch to the remote
  # repo's gh-pages branch. (All previous history on the gh-pages branch
  # will be lost, since we are overwriting it.) We redirect any output to
  # /dev/null to hide any sensitive credential data that might otherwise be exposed.
  # FIXME should be authorised via key
  git push --quiet

  cd ../..
}

getLatest
deployCopy "bookwhen"
deployCopy "playwaze"
