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
    this.margin = {top: 0, right: 30, bottom: 10, left: 225},
        this.width = getInnerWidth(this.parentElement) - this.margin.left - this.margin.right,
        this.height = 20;

    console.log(this.width);

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
        .text("distribution of priorities (compared to average):")
        .attr("transform", "translate(" + 0 + "," + (this.titleHeight - 2*this.paddingY) + ")");

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

    this.chart = d3.bullet()
        .width(that.width)
        .height(that.height);

    this.svg = this.parentElement.selectAll("svg.bullet")
        .data(this.displayData)
        .enter().append("svg")
        .attr("class", "bullet")
        .attr("width", that.width + that.margin.left + that.margin.right)
        .attr("height", function(d,i){
            var h = that.height;
            return (i !== 15) ? h : h + that.margin.bottom*2;
        })
        .append("g")
        .attr("transform", "translate(" + that.margin.left + "," + that.margin.top + ")")
        .call(this.chart);

    this.title = this.svg.append("g")
        .style("text-anchor", "end")
        .attr("transform", function(d){
            return "translate(-6," + ((that.height + that.margin.top + that.margin.bottom) / 2) + ")"
        });

    this.title.append("text")
        .attr("class", "title")
        .text(function(d) { return d["item-title"]; });

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

    //this.updateVis();
    this.svg.data(this.displayData).call(this.chart)


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
    // Get averages and age ranges
    var resTotal = d3.range(0,16).map(function(){return 0;})
    for( var i=0; i<16; i++){
        var total = d3.sum(this.data, function(d){
            return d.prios[i];
        })
        resTotal[i] = total;
    }
    var totalDays = d3.sum(this.data, function(d){ return 1; });
    var resAvg = resTotal.map( function(d){ return d/totalDays; });

    //console.log(resAvg);

    // DONETODO: implement the function that filters the data and sums the values
    var filterData = this.data.filter( filter );

    for( var i=0; i<16; i++){
        var count = d3.sum(filterData, function(d){
            return d.prios[i];
        });

        res[i]["item-count"] = count;
        res[i]["item-globalAvg"] = resAvg[i];
        res[i]["item-ranges"] = [0, 0];
    }

    res = Object.keys(res).map( function(d) {
        return res[d];
    });

    return res;

}
