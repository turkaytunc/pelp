#!/bin/bash
git reset --soft HEAD~"$1" &&
git commit -m "$2"