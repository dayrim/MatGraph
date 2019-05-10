
import './styles/styles.scss'
import './d3-scale-radial.js'
import * as d3 from "d3";
import axios from 'axios'

// import { jsonData } from './data/data.js';

// var data = jsonData
// var maxAge = jsonData.reduce(function(prev, curr){
//     return (curr.age > prev.age) ? curr : prev;
// }).age

// var minAge = jsonData.reduce(function(prev, curr){
//     return (curr.age < prev.age) ? curr : prev;
// }).age

// var categories = []
// jsonData.map(function(element){
//     categories.push(element.name)
// })
// console.log(maxAge)
// console.log(minAge)
// console.log(categories)

// var margin = {top: 20, right:30, bottom:60,left:30}
// var width = 600 - margin.left - margin.right
// var height = 400 - margin.top - margin.bottom

// var convertToY = d3.scaleLinear()
//     .domain([0,maxAge])
//     .range([height,0])

// var convertToX = d3.scaleBand()
//     .domain(categories)
//     .range([0, width])
//     .paddingInner(0.3)
//     .paddingOuter(0.2)
    

// var xAxisCall = d3.axisBottom(convertToX);
// var yAxisCall = d3.axisLeft(convertToY)
//     .ticks(5)
//     .tickFormat(function(data){
//         return data + " y"
//     });

// var svg = d3.select("#chart-area")
//         .append("svg")
//         .attr("width", width + margin.left + margin.right)
//         .attr("height", height + margin.top + margin.bottom)

// var group = svg.append("g")
//         .attr("transform", "translate(" + margin.left + ", " + margin.top + ")")

// group.append("g")
//         .attr("class","x axis")
//         .attr("transform", "translate(0," + height + ")")
//         .call(xAxisCall)
//         .selectAll("text")
//             .attr("y","10")
//             .attr("x","-5")
//             .attr("text-anchor","end")
//             .attr("transform","rotate(-40)")

// group.append("g")
//         .attr("class","y-axis")
//         .call(yAxisCall)






// var bars = group.selectAll("bar")
//     .data(data)
    


// var paintCategory = d3.scaleOrdinal()
//     .domain(categories)
//     .range(d3.schemeYlGn[jsonData.length])


//     bars.enter().append("rect")
//     .attr("x", function(data,i){
//         return convertToX(data.name)
//     })
//     .attr("y", function(data){
//         return convertToY(data.age)
//     })
//     .attr("width",convertToX.bandwidth)
//     .attr("height", function(data){
//         return height - convertToY(data.age)
//     })

//     .attr("fill", function(data){
//         return paintCategory(data.name)
//     })
// d3.interval(function(){
//     //console.log("ticks")
// },1000)

// d3.max(dataset,function(d)
// {
//     return Math.abs(d[1])}
// )

//Domestic extraction









// class DomesticExtraction {
//     constructor(data, max,categories,timeline) {
//       this.max = max;
//       this.data = data;
//       this.categories = categories;
//       this.timeline = timeline;
//     }
//   }

// class DomesticUsage {
//     constructor(total, exportsData,categories,timeline) {
//         this.data = exportsData.map(function(row,rowIndex){
//             return row.map(function(value, valueIndex){
//                 return total[rowIndex][valueIndex]-value
//             })
//         })
//         this.max=d3.max(this.data, function(array) {
//             return d3.max(array);
//           });
//           this.categories = categories;
//           this.timeline = timeline;
//     }
// }

// class Imports {
//     constructor(data, max,categories,timeline) {
//       this.max = max;
//       this.data = data;
//       this.categories = categories;
//       this.timeline = timeline;
//     }
// }

// class Exports {
//     constructor(data, max,categories,timeline) {
//       this.max = max;
//       this.data = data;
//       this.categories = categories;
//       this.timeline = timeline;
//     }
// }


// let ultimateData = []

//   function getDomesticExtraction() {
//     return axios.get('/api/stat-ee/KK91')
//   }
  
//   function getImports() {
//     return axios.get('/api/stat-ee/KK956')
//   }
//   function getExports() {
//     return axios.get('/api/stat-ee/KK957')
//   }

//   function processData(response,domestic){
//     const data = [];
//     const categories = [];
//     const timeline = [];

//     if(domestic){
//         response.data.structure.dimensions.series[0].values.forEach(function(category,index){
//             if(!category.name.includes('..')){
//                 if(category.name.includes('Biomass')){
//                     response.data.structure.dimensions.series[0].values[index].name='Biomass and biomass products'
//                 }
//                 else if(category.name.includes('Non metalic minerals')){
//                     response.data.structure.dimensions.series[0].values[index].name='Non-metallic minerals, raw and processed'
//                 }
//                 else if(category.name.includes('Fossil fuels')){
//                     response.data.structure.dimensions.series[0].values[index].name='Fossil energy materials/carriers, raw and processed'
//                 }
//             }
//         })
//     }

//     response.data.structure.dimensions.series[0].values.forEach(function(category){
//         categories.push(category.name)
//     })

//     response.data.structure.dimensions.observation[0].values.forEach(function(timeValue)  {
//         timeline.push(timeValue.name)
//     });
//     for (const outerKey in response.data.dataSets[0].series) {
//           data[outerKey]=[]
//           for (const innerKey in response.data.dataSets[0].series[outerKey].observations) {
//             data[outerKey].push(response.data.dataSets[0].series[outerKey].observations[innerKey][0])
//             }
//     }
//     const max = d3.max(data, function(array) {
//         return d3.max(array);
//       });
//     return [data,max,categories,timeline]
//   }


//   axios.all([getDomesticExtraction(), getImports(), getExports()])
//     .then(axios.spread(function (domestricExtractionResponce, importsResponce,exportResponce) {
 
//         const domesticExtraction = new DomesticExtraction(...processData(domestricExtractionResponce,true));
//         const importsObj = new Imports(...processData(importsResponce));
//         const exportsObj = new Exports(...processData(exportResponce));

//         let total = []
//         importsObj.data.forEach(function(row,rowIndex){
//             total[rowIndex]=[]
//             // console.log(row.length)
//             // console.log(importsObj.categories[rowIndex])
//             if(!importsObj.categories[rowIndex].includes("..")){
//                 let domesticRowIndex = domesticExtraction.categories.indexOf(importsObj.categories[rowIndex])
              
//                 if(domesticRowIndex>0){
//                     row.forEach(function(value,valueIndex){
//                         total[rowIndex].push(value+domesticExtraction.data[domesticRowIndex][valueIndex])
//                     })
//                 }
//                 else{
//                     row.forEach(function(value,valueIndex){
//                         total[rowIndex].push(value)
//                     })
//                 }
//             }
//             else{
//                 row.forEach(function(value,valueIndex){
//                     total[rowIndex].push(value)
//                 })
//             }
          
//         })



//         const domesticUsage = new DomesticUsage(total, exportsObj.data, exportsObj.categories, exportsObj.timeline);


//         ultimateData = importsObj.data.map(function(row,rowIndex){
//             if(!importsObj.categories[rowIndex].includes("..")){

//                 let domesticRowIndex = domesticExtraction.categories.indexOf(importsObj.categories[rowIndex])
//                 // console.log(importsObj.categories[rowIndex])
//                 // console.log(domesticRowIndex)
//                 if(domesticRowIndex>0){
//                     return row.map(function(value,valueIndex){
//                         return [value-domesticExtraction.data[domesticRowIndex][valueIndex],exportsObj.data[rowIndex][valueIndex]-domesticUsage.data[rowIndex][valueIndex]]
//                     })
//                 }
//                 else{
//                     return row.map(function(value,valueIndex){
//                         return [value,exportsObj.data[rowIndex][valueIndex]-domesticUsage.data[rowIndex][valueIndex]]
//                     })
//                 }
//             }
//             else{
//                 return row.map(function(value,valueIndex){
//                     return [value,exportsObj.data[rowIndex][valueIndex]-domesticUsage.data[rowIndex][valueIndex]]
//                 })
//             }
//         })
//         console.log(ultimateData)
//         // console.log(total)
//         // importsObj.categories.forEach(function(element,index){

//         //     console.log(`${JSON.stringify(element)} VS ${JSON.stringify(exportsInst.categories[index])}`)
//         // })

//         var margin = {top: 20, right: 20, bottom: 50, left: 70};
//         var width = 600 - margin.left - margin.right;
//         var height = 600 - margin.top - margin.bottom;
        
//         //add svg with margin !important
//         //this is svg is actually group
//         var svg = d3.select("body").append("svg")
//                     .attr("width",width+margin.left+margin.right)
//                     .attr("height",height+margin.top+margin.bottom)
//                     .append("g")  //add group to leave margin for axis
//                     .attr("transform","translate("+margin.left+","+margin.top+")");
        
        
//         //the code above should be same
        
//         var dataset = [[5, 20], [480, 90], [-250, 50], [100, 33], [330, -95],
//                     [410, -12], [475, 44], [25, 67], [-85, 21], [220, 88],[-85, -21]];
//         console.log(dataset)
//         console.log(ultimateData[0])
//         dataset=ultimateData[0]
//         //for each d, d[0] is the first num, d[1] is the second num
//         //set y scale
//         var yScale = d3.scaleLinear().rangeRound([0,height]).domain([d3.max(dataset,function(d){return Math.abs(d[1]);}),- d3.max(dataset,function(d){return Math.abs(d[1]);})]);//show negative
//         //add x axis
//         var xScale = d3.scaleLinear().rangeRound([0,width]).domain([-d3.max(dataset,function(d){return Math.abs(d[0]);}),d3.max(dataset,function(d){return Math.abs(d[0]);})]);//scaleBand is used for  bar chart
        
//         var barpadding = 2;
//         var circles = svg.selectAll("circle").data(dataset).enter().append("circle");
//         circles.attr("cx",function(d){
//                   return xScale(d[0]);//i*(width/dataset.length);
//                   })
//         .attr("cy",function(d){
//             return yScale(d[1]);
//         })//for bottom to top
//         .attr("r", 3);
//         circles.attr("fill",function(d){
//             return "orange";
//         });
        
//         //add x and y axis
//         var yAxis = d3.axisLeft(yScale);
//         svg.append("g").call(yAxis).attr("transform","translate("+width/2+",0)");
        
    
//         var xAxis = d3.axisBottom(xScale);/*.tickFormat("");remove tick label*/
//         svg.append("g").call(xAxis).attr("transform", "translate(0,"+height/2+")");
        
//         //add label for x axis and y axis
//         svg.append("text").text("Y Label")
//             .attr("x",0-height/2)
//             .attr("y",0-margin.left)
//             .attr("dy","1em")
//               .style("text-anchor", "middle")
//             .attr("transform","rotate(-90)");
//         svg.append("text").text("X Label")
//             .attr("x",width/2)
//             .attr("y",height+margin.bottom)
//               .style("text-anchor", "middle");
// }));

  function square(x) {
  return x * x;
}

function scaleRadial() {
  var linear = d3.scaleLinear();

  function scale(x) {
    return Math.sqrt(linear(x));
  }

  scale.domain = function(_) {
    return arguments.length ? (linear.domain(_), scale) : linear.domain();
  };

  scale.nice = function(count) {
    return (linear.nice(count), scale);
  };

  scale.range = function(_) {
    return arguments.length ? (linear.range(_.map(square)), scale) : linear.range().map(Math.sqrt);
  };

  scale.ticks = linear.ticks;
  scale.tickFormat = linear.tickFormat;

  return scale;
}
 

class DomesticExtraction {
    constructor(data, max,categories,timeline) {
      this.max = max;
      this.data = data;
      this.categories = categories;
      this.timeline = timeline;
    }
  }

class DomesticUsage {
    constructor(total, exportsData,categories,timeline) {
        this.data = exportsData.map(function(row,rowIndex){
            return row.map(function(value, valueIndex){
                return total[rowIndex][valueIndex]-value
            })
        })
        this.max=d3.max(this.data, function(array) {
            return d3.max(array);
          });
          this.categories = categories;
          this.timeline = timeline;
    }
}

class Imports {
    constructor(data, max,categories,timeline) {
      this.max = max;
      this.data = data;
      this.categories = categories;
      this.timeline = timeline;
    }
}

class Exports {
    constructor(data, max,categories,timeline) {
      this.max = max;
      this.data = data;
      this.categories = categories;
      this.timeline = timeline;
    }
}


let ultimateData = []

  function getDomesticExtraction() {
    return axios.get('/api/stat-ee/KK91')
  }
  
  function getImports() {
    return axios.get('/api/stat-ee/KK956')
  }
  function getExports() {
    return axios.get('/api/stat-ee/KK957')
  }

  function processData(response,domestic){
    const data = [];
    const categories = [];
    const timeline = [];

        response.data.structure.dimensions.series[0].values.forEach(function(category,index){
            if(!category.name.includes('..')){
                if(category.name.includes('Biomass and biomass products')){
                    response.data.structure.dimensions.series[0].values[index].name='Biomass'
                }
                else if(category.name.includes('Non-metallic minerals, raw and processed')){
                    response.data.structure.dimensions.series[0].values[index].name='Non metalic minerals'
                }
                else if(category.name.includes('Fossil energy materials/carriers, raw and processed')){
                    response.data.structure.dimensions.series[0].values[index].name='Fossil fuels'
                }
                else if(category.name.includes('Metal ores and concentrates, raw and processed')){
                  response.data.structure.dimensions.series[0].values[index].name='Metal ores and concentrates'
              }
              else if(category.name.includes('Waste imported for final treatment and disposal')){
                response.data.structure.dimensions.series[0].values[index].name='Waste'
            }
            }
        })
    

    response.data.structure.dimensions.series[0].values.forEach(function(category){
        categories.push(category.name)
    })

    response.data.structure.dimensions.observation[0].values.forEach(function(timeValue)  {
        timeline.push(timeValue.name)
    });
    for (const outerKey in response.data.dataSets[0].series) {
          data[outerKey]=[]
          for (const innerKey in response.data.dataSets[0].series[outerKey].observations) {
            data[outerKey].push(response.data.dataSets[0].series[outerKey].observations[innerKey][0])
            }
    }
    const max = d3.max(data, function(array) {
        return d3.max(array);
      });
    return [data,max,categories,timeline]
  }


  axios.all([getDomesticExtraction(), getImports(), getExports()])
    .then(axios.spread(function (domestricExtractionResponce, importsResponce,exportResponce) {
 
        const domesticExtraction = new DomesticExtraction(...processData(domestricExtractionResponce,true));
        const importsObj = new Imports(...processData(importsResponce));
        const exportsObj = new Exports(...processData(exportResponce));

        let total = []
        importsObj.data.forEach(function(row,rowIndex){
            total[rowIndex]=[]
            // console.log(row.length)
            // console.log(importsObj.categories[rowIndex])
            if(!importsObj.categories[rowIndex].includes("..")){
                let domesticRowIndex = domesticExtraction.categories.indexOf(importsObj.categories[rowIndex])
              
                if(domesticRowIndex>0){
                    row.forEach(function(value,valueIndex){
                        total[rowIndex].push(value+domesticExtraction.data[domesticRowIndex][valueIndex])
                    })
                }
                else{
                    row.forEach(function(value,valueIndex){
                        total[rowIndex].push(value)
                    })
                }
            }
            else{
                row.forEach(function(value,valueIndex){
                    total[rowIndex].push(value)
                })
            }
          
        })



        const domesticUsage = new DomesticUsage(total, exportsObj.data, exportsObj.categories, exportsObj.timeline);

        importsObj.timeline.forEach(function(timeStamp,timeIndex){
          ultimateData[timeIndex]=[]
          ultimateData[timeIndex].columns=["Material","Import","DomesticExtraction"]
        })
       importsObj.data.forEach(function(row,rowIndex){
            if(!importsObj.categories[rowIndex].includes("..")&& !importsObj.categories[rowIndex].includes("Total")){


                let domesticRowIndex = domesticExtraction.categories.indexOf(importsObj.categories[rowIndex])
                // console.log(importsObj.categories[rowIndex])
                // console.log(domesticRowIndex)
                if(domesticRowIndex>0){
                    return row.map(function(value,valueIndex){
                      ultimateData[valueIndex].push(
                        {
                          Material: importsObj.categories[rowIndex],
                          Import: value,
                          DomesticExtraction: domesticExtraction.data[domesticRowIndex][valueIndex],
                          total: value+domesticExtraction.data[domesticRowIndex][valueIndex]
                         })
                    })
                }
                else{
                    return row.forEach(function(value,valueIndex){
                       ultimateData[valueIndex].push(
                         {
                           Material: importsObj.categories[rowIndex],
                           Import: value,
                           DomesticExtraction: 0,
                           total: value
                          })
                    })
                }
            }
        })
        console.log(ultimateData[0])
        var svg = d3.select("svg"),
        width = +svg.attr("width"),
        height = +svg.attr("height"),
        innerRadius = 120,
        outerRadius = height/2.6,
        g = svg.append("g").attr("transform", "translate(+"+width/2+","+height/2+")");
        
        var x = d3.scaleBand()
        .range([0, 2 * Math.PI])
        .align(0);
        
        var y = scaleRadial()
        .range([innerRadius, outerRadius]);
        
        var z = d3.scaleOrdinal()
        .range(["#98abc5", "#dd1658"]);
        
 
        let data=ultimateData[0]
        data.sort(function(a, b){return b.total - a.total});
        console.log(data)
        //weave(data, function(a, b) { return b[data.columns[3]] -  a[data.columns[3]]; });
     
        x.domain(data.map(function(d) { return d.Material; }));
        y.domain([0, d3.max(data, function(d) { return d.total; })]);
        z.domain(data.columns.slice(1));
        
        g.append("g")
        .selectAll("g")
        .data(d3.stack().keys(data.columns.slice(1))(data))
        .enter().append("g")
          .attr("fill", function(d) { return z(d.key); })
        .selectAll("path")
        .data(function(d) { console.log(d); return d; })
        .enter().append("path")
          .attr("d", d3.arc()
              .innerRadius(function(d) { return y(d[0]); })
              .outerRadius(function(d) { return y(d[1]); })
              .startAngle(function(d) { return x(d.data.Material); })
              .endAngle(function(d) { return x(d.data.Material) + x.bandwidth(); })
              .padAngle(0.01)
              .padRadius(innerRadius));
        
        var label = g.append("g")
        .selectAll("g")
        .data(data)
        .enter().append("g")
          .attr("text-anchor", "middle")
          .attr("transform", function(d) { return "rotate(" + ((x(d.Material) + x.bandwidth() / 2) * 180 / Math.PI - 90) + ")translate(" + (outerRadius + 40 )+ ",0)"; });
        
        label.append("line")
          .attr("x2", -5)
          .attr("stroke", "#000");
        
        label.append("text")
          .attr("transform", function(d) { return (x(d.Material) + x.bandwidth() / 2 + Math.PI / 2) % (2 * Math.PI) < Math.PI ? "rotate(90)translate(0,16)" : "rotate(-90)translate(0,-9)"; })
          .text(function(d) { return d.Material; });
        
        var yAxis = g.append("g")
          .attr("text-anchor", "end");
        
        var yTick = yAxis
        .selectAll("g")
        .data(y.ticks(5).slice(1))
        .enter().append("g");
        
        yTick.append("circle")
          .attr("fill", "none")
          .attr("stroke", "#000")
          .attr("stroke-opacity", 0.5)
          .attr("r", y);
        
        yTick.append("text")
          .attr("x", -6)
          .attr("y", function(d) { return -y(d); })
          .attr("dy", "0.35em")
          .attr("fill", "none")
          .attr("stroke", "#fff")
          .attr("stroke-linejoin", "round")
          .attr("stroke-width", 3)
          .text(y.tickFormat(10, "s"));
        
        yTick.append("text")
          .attr("x", -6)
          .attr("y", function(d) { return -y(d); })
          .attr("dy", "0.35em")
          .text(y.tickFormat(10, "s"));
        
        yAxis.append("text")
          .attr("x", -6)
          .attr("y", function(d) { return -y(y.ticks(10).pop()); })
          .attr("dy", "-1em")
          .text("Units");
        
        var legend = g.append("g")
        .selectAll("g")
        .data(data.columns.slice(1).reverse())
        .enter().append("g")
          .attr("transform", function(d, i) { return "translate(-100," + (i - (data.columns.length - 1) / 2) * 20 + ")"; });
        
        legend.append("rect")
          .attr("width", 18)
          .attr("height", 18)
          .attr("fill", z);
        
        legend.append("text")
          .attr("x", 24)
          .attr("y", 9)
          .attr("dy", "0.35em")
          .text(function(d) { return d; });
    
        
        function weave(array, compare) {
        var i = -1, j, n = array.sort(compare).length, weave = new Array(n);
        while (++i < n) weave[i] = array[(j = i << 1) >= n ? (n - i << 1) - 1 : j];
        while (--n >= 0) array[n] = weave[n];
        }
        
        
}));