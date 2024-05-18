#!/bin/bash

set -e

git add dist -f
git commit -m "deploy: adding latest dist"
git subtree split --prefix dist -b gh-pages
git push -f origin gh-pages
git branch -D gh-pages
