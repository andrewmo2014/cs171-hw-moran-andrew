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
 * CountVis object for HW3 of CS171
 * @param _parentElement -- the HTML or SVG element (D3 node) to which to attach the vis
 * @param _data -- the data array
 * @param _metaData -- the meta-data / data description object
 * @param _eventHandler -- the Eventhandling Object to emit data to (see Task 4)
 * @constructor
 */
CountVis = function(_parentElement, _data, _metaData, _eventHandler){
    this.parentElement = _parentElement;
    this.data = _data;
    this.metaData = _metaData;
    this.eventHandler = _eventHandler;
    this.displayData = [];

    // DONETODO: define all "constants" here
    this.margin = {top: 35, right: 30, bottom: 95, left: 90},
    this.width = getInnerWidth(this.parentElement) - this.margin.left - this.margin.right,
    this.height = 330 - this.margin.top - this.margin.bottom;

    this.titleHeight = 40;
    this.paddingY = 5;

    this.initVis();
}


/**
 * Method that sets up the SVG and the variables
 */
CountVis.prototype.initVis = function(){

    var that = this; // read about the this



    //DONETODO: implement here all things that don't change
    //DONETODO: implement here all things that need an initial status
    // Examples are:
    // - construct SVG layout
    // constructs SVG layout

    this.titleSVG = this.parentElement.append("svg")
        .attr("width", this.width + this.margin.left + this.margin.right)
        .attr("height", this.titleHeight)
        .append("text")
        .text("number of votes - scroll to zoom, brush to select range: ")
        .attr("transform", "translate(" + 0 + "," + (this.titleHeight - 2*this.paddingY) + ")");

    // - create axis
    this.x = d3.time.scale()
        .range([0, this.width]);

    this.y = d3.scale.linear()
        .range([this.height, 0]);

    this.xAxis = d3.svg.axis()
        .scale(this.x)
        .orient("bottom");

    this.yAxis = d3.svg.axis()
        .scale(this.y)
        .orient("left");

    this.svg = this.parentElement.append("svg")
        .attr("width", this.width + this.margin.left + this.margin.right)
        .attr("height", this.height + this.margin.top + this.margin.bottom)
        .append("g")
        .attr("transform", "translate(" + this.margin.left + "," + this.paddingY + ")");
        //.call(that.zoom);

    this.area = d3.svg.area()
        .interpolate("monotone")
        .x(function(d) { return that.x(d.time); })
        .y0(this.height)
        .y1(function(d) { return that.y(d.count); });

    this.brush = d3.svg.brush()
        .on("brush", function(){
            // Trigger selectionChanged event. You'd need to account for filtering by time AND type
            //console.log(that.brush.extent());
            $(that.eventHandler).trigger("selectionChanged", that.brush.extent());

        });

    // Add axes visual elements
    this.svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + this.height + ")")

    this.svg.append("g")
        .attr("class", "y axis")
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")

    this.svg.append("g")
        .attr("class", "brush");



    //TODO: FIX ZOOMING
    this.zoom = d3.behavior.zoom()
        .x(this.x)
        //.scale(this.x)
        .on("zoom", function(d){
            return that.svg.select(".x.axis").call(that.xAxis);
        });




    // -  implement brushing !!
    // --- ONLY FOR BONUS ---  implement zooming

    // DONETODO: modify this to append an svg element, not modify the current placeholder SVG element
    //this.svg = this.parentElement.select("svg");

    //DONETODO: implement the slider -- see example at http://bl.ocks.org/mbostock/6452972
    this.addSlider(this.svg);


    // filter, aggregate, modify data
    this.wrangleData();

    // call the update method
    this.updateVis();
}

//CountVis.prototype.zoomed = function(svg) {
//    var that = this;
//    console.log(that);
//    //that.select(".x.axis").call(that.xAxis);
//}




/**
 * Method to wrangle the data. In this case it takes an options object
  */
CountVis.prototype.wrangleData= function(){

    // displayData should hold the data which is visualized
    // pretty simple in this case -- no modifications needed
    this.displayData = this.data;

}



/**
 * the drawing function - should use the D3 selection, enter, exit
 * @param _options -- only needed if different kinds of updates are needed
 */
CountVis.prototype.updateVis = function(){

    // DONETODO: implement update graphs (D3: update, enter, exit)
    this.x.domain(d3.extent(this.displayData, function(d) { return d.time; }));
    this.y.domain(d3.extent(this.displayData, function(d) { return d.count; }));

    // updates axis
    this.svg.select(".x.axis")
        .call(this.xAxis);

    this.svg.select(".y.axis")
        .call(this.yAxis)

    // updates graph
    var path = this.svg.selectAll(".area")
        .data([this.displayData])

    path.enter()
        .append("path")
        .attr("class", "area");

    path
        .transition()
        .attr("d", this.area);

    path.exit()
        .remove();

    this.brush.x(this.x);
    this.svg.select(".brush")
        .call(this.brush)
        .selectAll("rect")
        .attr("height", this.height);


}

/**
 * Gets called by event handler and should create new aggregated data
 * aggregation is done by the function "aggregate(filter)". Filter has to
 * be defined here.
 * @param selection
 */
CountVis.prototype.onSelectionChange= function (selectionStart, selectionEnd){

    // TODO: call wrangle function

    // do nothing -- no update when brushing


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
 * creates the y axis slider
 * @param svg -- the svg element
 */
CountVis.prototype.addSlider = function(svg){
    var that = this;

    var sliderHeight = 200;
    // DONETODO: Think of what is domain and what is range for the y axis slider !!
    var sliderScale = d3.scale.linear().domain([0,sliderHeight]).range([0,sliderHeight])

    var sliderDragged = function(){
        var value = Math.max(0, Math.min(sliderHeight,d3.event.y));

        var sliderValue = sliderScale.invert(value);

        // DONETODO: do something here to deform the y scale
        //console.log("Y Axis Slider value: ", sliderValue);
        var expo = sliderValue/sliderHeight;
        if (expo > 0) {
            that.y = d3.scale.pow().exponent(expo)
                .range([that.height, 0]);
            that.yAxis = d3.svg.axis()
                .scale(that.y)
                .orient("left");
        }

        d3.select(this)
            .attr("y", function () {
                return sliderScale(sliderValue);
            })

        that.updateVis({});
    }
    var sliderDragBehaviour = d3.behavior.drag()
        .on("drag", sliderDragged)

    var sliderGroup = svg.append("g").attr({
        class:"sliderGroup",
        "transform":"translate(" + (-this.margin.left) + "," + (-this.paddingY) + ")"
    })

    sliderGroup.append("rect").attr({
        class:"sliderBg",
        x:5,
        y:5,
        width:10,
        height:sliderHeight
    }).style({
        fill:"lightgray"
    })

    sliderGroup.append("rect").attr({
        "class":"sliderHandle",
        y:sliderHeight,
        width:20,
        height:10,
        rx:2,
        ry:2
    }).style({
        fill:"#333333"
    }).call(sliderDragBehaviour)


}






