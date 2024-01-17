#!/bin/bash
find . -name node_modules -type d -exec rm -r {} +
find . -name package-lock.json -type f -exec rm -r {} +
