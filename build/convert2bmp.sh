#!/bin/bash

# Requirements:
# - Imagemagic

convert $1 -resize x1024 -background white -alpha remove -alpha off -depth 8 -type Grayscale resize/$2.bmp