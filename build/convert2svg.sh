#!/bin/bash

# Requirements:
# - potrace

potrace -s resize/*.bmp
cp resize/*.svg svg/