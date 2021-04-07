#!/bin/bash
npm run lint && npm run test &&
git add ./src/
git commit -m "$1"
git push