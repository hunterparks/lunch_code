#!/bin/bash
echo "Running publish..."
rm -rf ./docs/*.*
cp -a ./src/. ./docs/
echo "Finished!"
