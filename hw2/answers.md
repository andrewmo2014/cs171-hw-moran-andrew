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

## 1.1 Discuss the pros and cons of the two types of rankings (either by relative or absolute position between nodes).
For the vertical simple layout, you can view the ranking of the countries by either relative or absolute position.
Absolute allows you to see all the countries and determine the in order ranking for each country, however, you do
not gain other available information such as "how much" does one country outrank its predecessors.  This can be
achieved with the relative positioning.  The spacing gives insight into the difference between the countries rankings.
However, one downside is that countries with the same magnitude will overlap with one another.

## 1.2 Which data type (quantitative, ordinal, ..) is best displayed with scatterplots? Which one is not? Give examples.
Scatterplots are useful when wanting to compare data points along two axiis of interest.  This is useful with quantitative data types.
In this case, when wanting to compare GDP vs. Populations of countries, the position of teh nodes gives insight into how these
two attributes are correlated and what relationship they have.  Scatterplots are not so useful with ordinal or categorical data.
Plotting points based on category can be better visualized with a bar chart.

## 2.1 What are the pros and cons of using a D3 layout? For example, why would we use the D3 pie layout when we could use a simple circle for layouting?
The D3 pie layout has many advantages.  For example, we can customize the size of each slice and the order of the slices with the
sorting functionality we can apply to the data.  However, pie slices (utilizing only size and color) limits what the user can extract from the
layout.  A simple circle layout is useful for adding additional functionality such as relationships.  By allowing links between
the nodes, we can utilize the center of the circle to reveal the underlying connections between nodes.

## 3.1 Which other strategies can you think of to reduce the visual complexity? One example is edge bundling which we introduce in the following section. Enumerate up to three other strategies.
1) Color - Associating nodes/countries with a specific color can help categorize and make it easier/faster for the user to
analyze and extract information faster.  We can categorixe countries by theri continent or when hovering over a source node,
we can color code the top trading partners.
2) Size - Adjusting the size and thickness of the links, for example, could give more information on the magnitude and influence of the
exports of a country with its trading partners.  The thicker the link, the more quantitative the trade/export.
3) Positioning/Areas - Grouping the countries can also be done in a different type of positioning than previously seen.  In addition to grouping by continent, the
trading partners for each country can be grouped in a 2D area grid, where the size of a square is determined by the size of the export.
