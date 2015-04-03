/**
 * Created by Hendrik Strobelt (hendrik.strobelt.com) on 1/28/15.
 */


/*
 *
 * ======================================================
 * We follow the vis template of init - wrangle - update
 * ======================================================
 *
 * */

/**
 * AgeVis object for HW3 of CS171
 * @param _parentElement -- the HTML or SVG element (D3 node) to which to attach the vis
 * @param _data -- the data array
 * @param _metaData -- the meta-data / data description object
 * @constructor
 */
PrioVis = function(_parentElement, _data, _metaData){
    this.parentElement = _parentElement;
    this.data = _data;
    this.metaData = _metaData;
    this.displayData = [];

    // TODO: define all constants here
    this.margin = {top: 35, right: 30, bottom: 45, left: 90},
    this.width = getInnerWidth(this.parentElement) - this.margin.left - this.margin.right,
    this.height = 280 - this.margin.top - this.margin.bottom;

    this.titleHeight = 40;
    this.totalHeight = 330;
    this.paddingY = 5;

    this.initVis();

}


/**
 * Method that sets up the SVG and the variables
 */
PrioVis.prototype.initVis = function(){

    var that = this; // read about the this


    this.titleSVG = this.parentElement.append("svg")
        .attr("width", this.width + this.margin.left + this.margin.right)
        .attr("height", this.titleHeight)
        .append("text")
        .text("distribution of priorities: ")
        .attr("transform", "translate(" + 0 + "," + (this.titleHeight - 2*this.paddingY) + ")");

    // - create axis
    this.x = d3.scale.ordinal()
        .rangeRoundBands([0, this.width], .1);

    this.y = d3.scale.linear()
        .range([this.height, 0]);

    this.color = d3.scale.category20();

    this.xAxis = d3.svg.axis()
        .scale(this.x)
        .orient("bottom");

    this.yAxis = d3.svg.axis()
        .scale(this.y)
        .orient("left");

    this.svg = this.parentElement.append("svg")
        .attr("width", this.width + this.margin.left + this.margin.right)
        .attr("height", this.totalHeight + this.margin.top + this.margin.bottom)
        .append("g")
        .attr("transform", "translate(" + 60 + "," + this.paddingY + ")");

    // Add axes visual elements
    this.svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + (this.height) + ")");




    this.svg.append("g")
        .attr("class", "y axis")
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end");



    // filter, aggregate, modify data
    this.wrangleData(null);

    // call the update method
    this.updateVis();
}


/**
 * Method to wrangle the data. In this case it takes an options object
 * @param _filterFunction - a function that filters data or "null" if none
 */
PrioVis.prototype.wrangleData= function(_filterFunction){

    // displayData should hold the data which is visualized
    this.displayData = this.filterAndAggregate(_filterFunction);

    //// you might be able to pass some options,
    //// if you don't pass options -- set the default options
    //// the default is: var options = {filter: function(){return true;} }
    //var options = _options || {filter: function(){return true;}};





}



/**
 * the drawing function - should use the D3 selection, enter, exit
 */
PrioVis.prototype.updateVis = function(){

    // Dear JS hipster,
    // you might be able to pass some options as parameter _option
    // But it's not needed to solve the task.
    // var options = _options || {};

    var that = this;


    // TODO: implement...
    // TODO: ...update scales
    // TODO: ...update graphs
    this.y.domain(d3.extent(this.displayData, function(d) { return d["item-count"]; }));
    this.x.domain(this.displayData.map( function(d) { return d["item-title"]; }));
    this.color.domain(this.displayData.map( function(d) { return d["item-title"]; }));

    // updates axis
    this.svg.select(".x.axis")
        .call(this.xAxis)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", function(d) {
            return "rotate(-65)"
        });

    this.svg.select(".y.axis")
        .call(this.yAxis)


    // Data join
    var bar = this.svg.selectAll(".bar")
        .data(this.displayData, function(d) { return d["item-title"]; });


    // Append new bar groups, if required
    var bar_enter = bar.enter().append("g");

    // Append a rect and a text only for the Enter set (new g)
    bar_enter.append("rect");
    //bar_enter.append("text");


    // Add attributes (position) to all bars
    bar
        .attr("class", "bar")
        .transition()
        .attr("transform", function(d, i) { return "translate(" + that.x(d["item-title"]) + "," + (that.y(d["item-count"])) + ")"; })

    // Remove the extra bars
    bar.exit()
        .remove();

    // Update all inner rects and texts (both update and enter sets)

    bar.selectAll("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", this.x.rangeBand())
        .transition()
        .attr("height", function(d, i) {
            return that.height - that.y(d["item-count"]);
        })
        .style("fill", function(d,i){
            //return that.color(d["item-color"]);
            return d["item-color"];

        });

    //bar.selectAll("text")
    //    .transition()
    //    //.attr("y", function(d) { return that.height; })
    //    .attr("x", function(d,i) { return that.x.rangeBand() / 2; })
    //    .text(function(d) { return d["item-title"]; })
    //    .attr("class", "type-label")
    //    .attr("transform", "rotate(-45" +  0+ "," +  0+ ")")
    //    .attr("dy", ".35em")
    //    .attr("text-anchor", "end");


}


/**
 * Gets called by event handler and should create new aggregated data
 * aggregation is done by the function "aggregate(filter)". Filter has to
 * be defined here.
 * @param selection
 */
PrioVis.prototype.onSelectionChange= function (selectionStart, selectionEnd){

    // DONETODO: call wrangle function
    this.wrangleData( function(d){

        var sameDate = (selectionStart.toLocaleDateString() == selectionEnd.toLocaleDateString());
        return (sameDate) ? (d.time.toLocaleDateString() == selectionStart.toLocaleDateString()) :
            (d.time >= selectionStart && d.time <= selectionEnd)

    });

    this.updateVis();


}


/*
 *
 * ==================================
 * From here on only HELPER functions
 * ==================================
 *
 * */


var getInnerWidth = function(element) {
    var style = window.getComputedStyle(element.node(), null);

    return parseInt(style.getPropertyValue('width'));
}


/**
 * The aggregate function that creates the counts for each age for a given filter.
 * @param _filter - A filter can be, e.g.,  a function that is only true for data of a given time range
 * @returns {Array|*}
 */
PrioVis.prototype.filterAndAggregate = function(_filter){


    // Set filter to a function that accepts all items
    // ONLY if the parameter _filter is NOT null use this parameter
    var filter = function(){return true;}
    if (_filter != null){
        filter = _filter;
    }
    //Dear JS hipster, a more hip variant of this construct would be:
    // var filter = _filter || function(){return true;}

    var that = this;

    var res = this.metaData["priorities"];

    // accumulate all values that fulfill the filter criterion

    // DONETODO: implement the function that filters the data and sums the values
    var filterData = this.data.filter( filter );

    for( var i=0; i<16; i++){
        var count = d3.sum(filterData, function(d){
            return d.prios[i];
        })
        res[i]["item-count"] = count;
    }

    res = Object.keys(res).map( function(d) {
        return res[d];
    });


    return res;

}
