## Andrew Moran
## 3/06/2015
## CS171 HW2
##
############################
## Questions
############################
##
## 0.1 What is the meaning of the horizontal and vertical position of the nodes? Give examples of datasets particularly well suited to organize data this way.
The horizontal and vertical positions of the nodes show how closely related they are to one another.
As described earlier, nodes repulse each other but attract through link.  With a charge
of -50 and an initial link distance of 10, the x,y coordinates demonstrates the "equilibrium" of all the
nodes after the charges/forces have been applied.  This is useful for datasets that require proximity analysis.
For example, structuring a computer network that covers a specific space where certain hubs need to be connected.
Another could focus on finding relationships amongst nodes.  Let's say you want to view a social network.  Friends
naturally don't know each other (repel) but are linked if they met before.

## 0.2 Which other channels (visual variables), beside color, size and position, could have been used? Name five.
Other visual channels include: shape, motion, spatial regions (clusters), saturation, luminance, depth (3D), position on scales, etc.

## 0.3 Are all the previously mentioned visual variables independent (e.g. if you change one, will it impact others?)? Give examples of graphical properties that are dependent (if any) and independent (if any) from each others.
Most of the above variables are independent except for spatial regions and position on scales.  Since these
are typically determined by nodes relative to each other, they could effect the visualization by readjusting
what other node variables are (e.g. moving a node out of a cluster).  Dependent graphical properties include
scale, forces, clusters. Independent properties include shape, color, thickness, opacity, etc.  Dependence
in a graph is determined whether attributes of a node/link affect other attributes.






