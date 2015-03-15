## Andrew Moran
## 3/06/2015
## CS171 HW2
##
############################
## Design Studio
############################
##
# Part 1 - Analysis
Who: Research Journalists, Merchants, Government/Foreign Trade Officials, Consumers, Producers
Domain Tasks:
- Determine how often (magnitude) of trade is with top ten partners relative to each other
- How these relationships change over time
- How a country's top ten partners are correlated with GPD, Population, Location, etc
- Does a country's ranking change over time/influenced by other factors?
Visualization tasks:
- Sort countries by Name, Continent, GDP, etc.
- Only few a selected country's top ten partners
- See the strength/mutuality of a trade (with links?)
- Filter trades by year.

# Part 2 - Sketching
Design #1: I decided to use a map layout for my first design.  I wanted to explore the use of geographically laying
out the countries and see how that might influence trades.  Waypoint arrows to each country shows the connection
and the thickness of the arrows represents the relative amount of export.  Additional visualization tasks such
as a slider and bar charts will be useful for dynamic filtering and additional stats for countries.

Design #2: To easily view connections between countries, I decided to sketch a circular layout.  This evenly distributes
countries so that they can be seen, and allows the center of the circle free for other design choices.  In this case,
it can used to view connections by lines/links.  Colors could be used to show ranking and thickness can be used to represent
the relative amount.

Sketches can be seen in the /design folder

# Part 3 - Reflection
After discussion and viewing other designs, most students (including myself) wanted an easy way to few a country's top
ten trading partners.  Many involved map layouts or a graph of a kind that involved links.  The downside of maps is that
it is hard to have a global view to see smaller countries.  Also, countries that are close to one another may have links
that are too difficult to see.  Further discussing with classmates, we agreed that a different layout (like a circular layout)
 may be more useful for what we are trying to depict (the top partners for a country).  This layout would be useful for showing connections,
 however, additional features may be required to see other stats on a country (export amount, population, etc.)

############################
## Design Implementation/Discussion
############################
##

I decided to expand on design #2.  After completing the design studio, I came across very interesting domain and user
tasks.  After much consideration, I decided to focus more on recognizing relationships and the mutuality of trades
among countries and their top partners.

For simplicity (and partially implemented earlier), I decided to expand on the circular layout.  Positioning a country's
node/label correctly around the circle allows the user to see all the countries at once.  For each connecting trading partner,
I drew a path/chord representing the link.  However, the color of the chord represents the "mutuality" of the trade.  In other
words, the color represents how beneficial the trade is to the source country.

For a 2012 example, China lists Canada as its 9th trade partner and Canada lists China as its 5th partner.  In this relationship, China
is benefiting more since its partner, Canada, ranks China (5) higher than China ranks Canada (9).  The gradient from green, blue, to red
translates to how a partner ranks the selected source country (In the top 10 from high (#1) to low (#10)).

The Aster plot was necessary to gain more information on the trading partners for a selected country.  The slices can
be sorted by Export Amount, Mutuality, Proximity, and Name.  The size of the slice shows quantitatively the magnitude of the trade
as compared to competing partners.  The color of the trade corresponds to the "mutuality" scale and chords.  When hovering
over a partner, you can see statistics for that country such as export mount, name, source country's ranking, and proximity.

Another necessary feature was a time slider.  Changing the year allows the user to see how the top ten trading partners for a source
country changes over time.  Whether it is the "mutuality" for a given country or new countries in the top ten.

I added scales/legends to make it easier for teh user to understand the additional colors represented in the visualization.
A legend is used to recognize which continent each country belongs to and the mutuality scale (described earlier) demonstrates
how a trading partner ranks the source country (the higher ranked the source country is to a partner, the higher that source country is
valued).

Additionally sorting the countries by continent, name, population, gdp gives more insight on who a country trades with. For example,
in 2010, sorting by continent and gdp shows how the trading partners of teh US are the top ranked GDP fpr that continent.

Final design sketch and video can be seen in the /design folder.
