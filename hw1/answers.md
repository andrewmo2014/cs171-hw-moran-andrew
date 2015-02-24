## Andrew Moran
## 2/21/2015
## CS171 HW1
##
############################
## Questions
############################
##
## 1.1
# Looking at the page containing the table, what are the differences between the DOM as shown by the DOM inspector and the HTML source code? Why would you use the DOM inspector? When is the HTML source useful?

The DOM allows you to dynamically view the output of your code in the browser, with
fully-featured capabilities such as highlighting, expanding and/or collapsing nested
elements, and change the effects on the fly right in your browser.  It shows the current
state if your code and can be dynamically changed (good for debugging or what happens
when you change font size, etc).  The HTML source code is the pre-rendered markup in
which you want to have in the DOM.  This is initially hard-coded and is good for key-
binding.  When debugging, it is good to look at teh source code to make sure it is
properly displayed in the browser.

## 1.2 Below we have partially reproduced the first lines from the table's dataset. What piece of software generates this table? Where are the original data stored?

D3 could be used to generate the table.  Often, web-based visualizations use
 Javascript with libraries such as jQuery to help create elements like a table.
 Data is originally stored in a JSON or CVS file.  In this case, it is in the
 countries_2012.json file.

## 2.1 Would you filter other columns from the table the same way? E.g. would you use checkboxes or any other HTML widget?

Checkboxes are good for items that can be grouped in categories and have a limited
number.  If we wanted to further splice the data into ranges, we could use checkboxes.
(e.g Life Expectancy Ranges: <50, 50-60, 60-70, >70).  Radio buttons are good for
mutually exclusive items that are independent of each other.  Instead of a slider
  for the years, we could number the years as radio buttons and select which one we
  want independently.

## 3.1 Could you aggregate the table using other columns? If you think yes, explain which ones and how you would group values. Which HTML widgets would be appropriate?

We could aggregate other columns, but we need to make sure it makes sense and not too
overwhelming.  For example, we could aggregate by year if you wanted to compare
population, gdp and/or life expectancy over a large period of time (1995-2012).
An example layout is as follows.  We would have a bar chart for each chosen country or
continent.  Then vertical bars for each year could represent the global factors
(population, gdp, and/or life-expantcy) that can be chosen using checkboxes.

## 4.1 What does the new attribute years hold?
Years holds not only each country's GDP, life expectancy, population. But also 10
 top 10 trade partners (with their associative respective total number of exports
 and country ID from 1995 through 2012.

## 5.1 What are the pros and cons of using HTML vs. SVG? Give some examples in the context of creating visualizations.

HTML has many good properties.  It has native text-wrapping and supported by many
browsers (easy to update), where as SVG isn't necessarily supported on out-of-date
browsers.  HTML has great CSS support and many customizable styling
properties.  It also has very simple Javascript integration as compared to SVG.
Some pros for SVG is that it is very dynamic and can use many kinds of shapes,
scales, paths, etc. (very customizable for how you want to view data).  These can
be exported to Photoshop and/or Illustrator to additional customize.  Also, as we had
a hands on experience, SVGs can use libraries such as D3 that can enhance visualization
in a more streamlined way as compared to hard-coding with javascript.

## 7.1 Give an example of a situation where visualization is appropriate, following the arguments discussed in lecture and in the textbook (the example cannot be the same as mentioned in either lecture or textbook).
Visualization is appropriate for two main things - communication and exploration. It is
not appropriate when you just have a single question or answer (e.g how many books can
you carry?).  A good example of visualization is to view stock prizes of a company.  We
can track the high and low prizes to communicate how the company performed and could
explore further in the data by adjusting scale (over a course of a day,month, year, etc)

## 7.2 Which limitations of static charts can you solve using interactivity?
Interactivity makes it easier for a user to understand and explore the dataset.
Choosing filters or scales allows the users to display only certain portions of the
dataset or even dive deeper into a particular component.  This can be useful when you
want to visuluaize data over a period of time.

## 7.3 What are the limitations of visualization?
Sometimes visualization could be unneessary and/or inefficient.  As mentioned in 7.1,
if you just want to answer a single question, there is no need to overwhelm the user
 with a visual.  Also, making visuals too interactive and complex can make it hard to
 find the answer you are looking for.  There are situations where you need to make
 decisions fast such as stock trading and/or sports statistics.  With data that is
   hard to navigate and/or too massive could be very time-consuming to use.

## 7.4 Why are data semantics important for data?
Semantics helps give meaning and structure to data.  As described in leture, an array
of ['Basil', 7, 'S', 'Pear'] is very ambiguous and can have multiple meanings. Saying
that the order of the data is [name, age, shirt size, favorite fruit] gives meaning to
the data.

## 7.5 Which relationships are defined for two attributes of (a) quantitative, (b) categorical, or (c) ordinal scale?
a. Equality, comparative, arithmetic
    - Can perform mathematical operations with quantitative
b. Equality
    - Grouping of items and only check if it belongs to a category or not
c. Equality, comparative
    - Group items but in orderly fashion (e.g. small, medium, large)

## 7.6 Which visual variables are associative (i.e., allow grouping)?
Spatial region, color hue, motion, shape, position, size, etc.

## 7.7 Which visual variables are quantitative (i.e., allow to judge a quantitative difference between two data points)?
Position, length, area, depth, color saturation, etc.
