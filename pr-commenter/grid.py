import cv2
import numpy as np
import os
import math
from PIL import Image
from matplotlib import pyplot as plt
from cairosvg import svg2png


# https://stackoverflow.com/a/44659589
def image_resize(image, width = None, height = None, inter = cv2.INTER_AREA):
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
    resized = cv2.resize(image, dim, interpolation = inter)

    # return the resized image
    return resized




imgs = []
dircontents = os.listdir('.')
for i in dircontents:
    if i.endswith('.svg'):
        svg2png(url=i, write_to=i + '.png', output_height=100)
        img = np.asarray(Image.open(i + '.png'))
        #img = image_resize(img, 100)
        imgs.append(img)

pm = math.ceil(math.sqrt(len(imgs)));

fig, ax = plt.subplots(pm, pm, figsize=(10, 10))
fig.subplots_adjust(hspace=0, wspace=0)

for i in range(pm):
    for j in range(pm):
        ax[i, j].xaxis.set_major_locator(plt.NullLocator())
        ax[i, j].yaxis.set_major_locator(plt.NullLocator())
        if pm*i+j < len(imgs):
            ax[i, j].imshow(imgs[pm*i+j], cmap="bone")
plt.savefig('result.png')
#plt.show()

