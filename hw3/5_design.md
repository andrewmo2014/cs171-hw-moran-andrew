# Answers for Questions

## Part 1: Analysis
List of user types include Government Officials, Journalists, Local Community Leaders, anthropologists, etc..
Domain tasks:
- Government:
    - How votes change over a period of time.
    - Distribution of issues over a selected time range.

- Anthropologists:
    - Which age group is associated most with a particular issue.
    - How priority of issues change over time

- Local Community Leaders
    - Most popular issues
    - Breakdown of ages for a for a particular issue

Visualization tasks:
- Selection of particular time intervals (accomplished through brushing)
- Displaying distribution of priorities and/or ages
- Comparison with average votes per day/ per priority.


## Part 2: Sketching


### Q5a
**Question:** Choose __one__ comparison scenario and create at least three alternative designs that would allow this comparison.

-
**Answer:**

- put your sketches in folder [designStudio/](designStudio/)

- I have decided to work with comparing priority votes with the overall average.  After much consideration, I felt it would have been
more difficult to try and find a workaround of doing multi-selection of brushes.

- My first design, I simply wanted to do a double bar chart.  Bar charts are simple and concise.  By using the original representation but
augmenting it by placing the average bar value next to each priority, the user can simply see if the current selection is above/below the global
 average.  This is further emphasized with color coding green for above, red for below.

- For my second design, I decided to mess around with star plots.  When this was introduced in lecture, I thought this was
an interesting way to display information given that we are limited to 16 priorities.  Each axis/vertice of the star would
 be the priority.  The currently selected value would be filled in while the average would be a black dot.  As the user
 interacts with the visualization, they can see how the shape increase/decreases relative to teh average points.

- My last design iteration, I did some research and discovered d3 bullet charts.  This allows a "rich display of data in a small space"
By keeping teh same color and bar chart representation, we can have these black tick marks representing the overall average for that prioirity.
If we wanted to, bullet charts also allow for shaded regions representing ranges (e.g. low, medium, high).

### Q5b
**Question:** Implement one design in your visualization for **PrioVis** and explain why you have chosen this design.

-
**Answer:**

- I have decided to work with the bullet chart representation.  When the user makes a brush selection, it is a lot easier to see how the
priority count readjusts relative to the black (average) tick mark.  Also, it is a concise representation.  Using the other designs would
have added unnecessary ink and would have been hard to follow changes and many visual elements were being updated.  Now as both teh priority measures
and/or average tick marks move, the user can see the comparison by simply asking (did the position of the average tick mark change? how about
the number of votes?)

### Q5c
**Question:** As a very minimal case study submit a screenshot of an interesting pattern which you have found with your method and briefly describe the pattern.

-
**Answer:**

- screenShot under [designStudio/](designStudio/)

- Here is a screen shot of an interesting case while using a bullet chart is useful.  With a small selection, we see that some priorities have an aggregated count higher than
  the average and some lower than the average.  Later as we move the brush window, later in the year, more votes become above the average, suggesting a
  gathering of interest for that particular priority.

