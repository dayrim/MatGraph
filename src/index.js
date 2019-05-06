
import './styles/styles.scss'
import * as d3 from "d3";
import { jsonData } from './data/data.js';

var data = jsonData
var maxAge = jsonData.reduce(function(prev, curr){
    return (curr.age > prev.age) ? curr : prev;
}).age

var minAge = jsonData.reduce(function(prev, curr){
    return (curr.age < prev.age) ? curr : prev;
}).age

var categories = []
jsonData.map(function(element){
    categories.push(element.name)
})
console.log(maxAge)
console.log(minAge)
console.log(categories)

var margin = {top: 20, right:30, bottom:60,left:30}
var width = 600 - margin.left - margin.right
var height = 400 - margin.top - margin.bottom

var convertToY = d3.scaleLinear()
    .domain([0,maxAge])
    .range([height,0])

var convertToX = d3.scaleBand()
    .domain(categories)
    .range([0, width])
    .paddingInner(0.3)
    .paddingOuter(0.2)
    

var xAxisCall = d3.axisBottom(convertToX);
var yAxisCall = d3.axisLeft(convertToY)
    .ticks(5)
    .tickFormat(function(data){
        return data + " y"
    });

var svg = d3.select("#chart-area")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)

var group = svg.append("g")
        .attr("transform", "translate(" + margin.left + ", " + margin.top + ")")

group.append("g")
        .attr("class","x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxisCall)
        .selectAll("text")
            .attr("y","10")
            .attr("x","-5")
            .attr("text-anchor","end")
            .attr("transform","rotate(-40)")

group.append("g")
        .attr("class","y-axis")
        .call(yAxisCall)






var bars = group.selectAll("bar")
    .data(data)
    


var paintCategory = d3.scaleOrdinal()
    .domain(categories)
    .range(d3.schemeYlGn[jsonData.length])


    bars.enter().append("rect")
    .attr("x", function(data,i){
        return convertToX(data.name)
    })
    .attr("y", function(data){
        return convertToY(data.age)
    })
    .attr("width",convertToX.bandwidth)
    .attr("height", function(data){
        return height - convertToY(data.age)
    })

    .attr("fill", function(data){
        return paintCategory(data.name)
    })
d3.interval(function(){
    //console.log("ticks")
},1000)