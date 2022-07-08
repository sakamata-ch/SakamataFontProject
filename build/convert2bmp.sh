#!/bin/bash

# Requirements:
# - Imagemagic

convert $1 -background white -alpha remove -alpha off -depth 8 -type Grayscale resize/$2.bmp