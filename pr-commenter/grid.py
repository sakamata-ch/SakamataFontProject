import cv2
import numpy as np
import os
import math
from PIL import Image
from matplotlib import pyplot as plt
import japanize_matplotlib
from cairosvg import svg2png
from fontTools.ttLib import TTFont
from textwrap import dedent
from fontTools.pens.svgPathPen import SVGPathPen

# https://qiita.com/scrpgil/items/7c7c0a354b3688ddfc6b

# https://stackoverflow.com/a/44659589


def image_resize(image, width=None, height=None, inter=cv2.INTER_AREA):
    # initialize the dimensions of the image to be resized and
    # grab the image size
    dim = None
    (h, w) = image.shape[:2]

    # if both the width and height are None, then return the
    # original image
    if width is None and height is None:
        return image

    # check to see if the width is None
    if width is None:
        # calculate the ratio of the height and construct the
        # dimensions
        r = height / float(h)
        dim = (int(w * r), height)

    # otherwise, the height is None
    else:
        # calculate the ratio of the width and construct the
        # dimensions
        r = width / float(w)
        dim = (width, int(h * r))

    # resize the image
    resized = cv2.resize(image, dim, interpolation=inter)

    # return the resized image
    return resized


font = TTFont(os.getenv('FONTNAME'))
glyph_set = font.getGlyphSet()
cmap = font.getBestCmap()

imgs = []
imgfig = []

for c in cmap:
    glyph_name = cmap[c]
    glyph = glyph_set[glyph_name]
    svg_path_pen = SVGPathPen(glyph_set)
    glyph.draw(svg_path_pen)

    if (glyph_name.startswith('uni')):
        bingl = bytes.fromhex(glyph_name[3:])
        glyph_name = bingl[::-1].decode(
            encoding='utf-16', errors='replace')

    ascender = font['OS/2'].sTypoAscender
    descender = font['OS/2'].sTypoDescender
    width = glyph.width
    height = ascender - descender

    content = dedent(f'''\
           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 {-ascender} {width} {height}">
               <g transform="scale(1, -1)">
                   <path d="{svg_path_pen.getCommands()}"/>
               </g>
           </svg>
       ''')
    with open(str(c) + ".svg", 'w') as f:
        f.write(content)

    svg2png(url=str(c) + ".svg", write_to=str(c) + '.png')
    img = np.asarray(Image.open(str(c) + '.png'))
    img = image_resize(img, 100)
    imgs.append(img)
    imgfig.append(glyph_name)

pm = math.ceil(math.sqrt(len(imgs)))

fig, ax = plt.subplots(pm * 2, pm, figsize=(10, 10))
fig.subplots_adjust(hspace=0, wspace=0)

for i in range(pm * 2):
    for j in range(pm):
        ai = int(i / 2)
        ax[i, j].xaxis.set_major_locator(plt.NullLocator())
        ax[i, j].yaxis.set_major_locator(plt.NullLocator())
        if (i % 2 == 0):
            if pm*ai+j < len(imgs):
                ax[i, j].imshow(imgs[pm*ai+j], cmap="bone")
        else:
            if pm*ai+j < len(imgs):
                ax[i, j].text(0.05, 0.05, imgfig[pm*ai+j], horizontalalignment='left',
                              verticalalignment='bottom', transform=ax[i, j].transAxes)
plt.savefig('result.png')
# plt.show()
