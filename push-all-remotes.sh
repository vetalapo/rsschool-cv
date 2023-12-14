#!/bin/bash
echo "Push ing to origin and rs repos..."

git push origin --all && git push rs --all

echo "Done"
