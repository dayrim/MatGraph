
import './styles/styles.scss'
import * as d3 from "d3";
import axios from 'axios'

<<<<<<< HEAD
=======
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
    return axios.get('/api/stat-ee/table/KK91')
}

function getImports() {
    return axios.get('/api/stat-ee/table/KK956')
}
function getExports() {
    return axios.get('/api/stat-ee/table/KK957')    
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
        ultimateData= ultimateData.map(function(row){
            return row.sort(function(a, b){return b.total - a.total});
        })

        const width = 1200
        const height = 1000
        const innerRadius = 120
        const outerRadius = height/2.6
        let data;
        let arcsGlobal

        const svg = d3.select("svg")
            .attr("width", width )
            .attr("height", height )
            
        const globalGroup = svg.append("g").attr("transform", "translate(+"+width/2+","+height/2+")");
        
        var x = d3.scaleBand()
        .range([0, 2 * Math.PI])
        .align(0);
        
        var y = scaleRadial()
        .range([innerRadius, outerRadius]);
        
        var z = d3.scaleOrdinal()
        .range(["#98abc5", "#dd1658"]);
        
        arcsGlobal = globalGroup.append("g")
        .attr("class","arcsGlobal") 
       
        // data.sort(function(a, b){return b.total - a.total});
        // console.log(data)
        //weave(data, function(a, b) { return b[data.columns[3]] -  a[data.columns[3]]; });
        updateGraph();
        // d3.interval(function(){
        //     updateGraph();
        // },10000)
      


              

        const label = globalGroup.append("g")
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
          .attr("class","arcLabel")
          .text(function(d) { return d.Material; });
        
        let yAxis = globalGroup.append("g")
          .attr("text-anchor", "end")
          .attr("class","volumeGroup")
        
          console.log(y.ticks(5).slice(1))
        // JOIN
        let yTick = yAxis
        .selectAll("g")
        .data(y.ticks(5).slice(1))

        // // EXIT
        // yTick.exit().remove()

        // // UPDATE

        // let tickUpdate = yTick.selectAll("g").attr("class","tickCircle update");

        // tickUpdate.selectAll("circle")
        // .attr("r", y);
      
        // tickUpdate.selectAll("text")
        // .attr("y", function(d) { return -y(d); })
        // .text(y.tickFormat(10, "s"));
      
        // tickUpdate.selectAll("text")
        // .attr("y", function(d) { return -y(d); })
        // .text(y.tickFormat(10, "s"));

        // ENTER

        let tickEnter = yTick.enter().append("g").attr("class","tickCircle enter");
        
        tickEnter.append("circle")
          .attr("fill", "none")
          .attr("stroke", "#000")
          .attr("stroke-opacity", 0.5)
          .attr("r", y);
        
          tickEnter.append("text")
          .attr("x", -6)
          .attr("y", function(d) { return -y(d); })
          .attr("dy", "0.35em")
          .attr("fill", "none")
          .attr("stroke", "#fff")
          .attr("stroke-linejoin", "round")
          .attr("stroke-width", 3)
          .text(y.tickFormat(10, "s"));
        
          tickEnter.append("text")
          .attr("x", -6)
          .attr("y", function(d) { return -y(d); })
          .attr("dy", "0.35em")
          .text(y.tickFormat(10, "s"));
        
        yAxis.append("text")
        .attr("x", -6)
        .attr("y", function(d) { return -y(y.ticks(10).pop()); })
        .attr("dy", "-1em")
        .text("Units");
        
        var legend = globalGroup.append("g")
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
    
        function updateGraph(){
            data=ultimateData[Math.floor(Math.random() * ultimateData.length)]

            x.domain(data.map(function(d) { return d.Material; }));
            y.domain([0, d3.max(data, function(d) { return d.total; })]);
            z.domain(data.columns.slice(1));

            // JOIN
            let arcGroup = arcsGlobal 
                .selectAll("g")
                .data(d3.stack().keys(data.columns.slice(1))(data))
           // console.log(arcsGlobal)

            // EXIT 

            arcGroup.exit().remove()
            // UPDATE 
            arcGroup
                .attr("class","arcGroup update") 
                .attr("fill", function(d) { return z(d.key); })
            .selectAll("path")
                .attr("class","arc")  
                .attr("d", d3.arc()
                    .innerRadius(function(d) { return y(d[0]); })
                    .outerRadius(function(d) { return y(d[1]); })
                    .startAngle(function(d) { return x(d.data.Material); })
                    .endAngle(function(d) { return x(d.data.Material) + x.bandwidth(); })
                    .padAngle(0.01)
                    .padRadius(innerRadius))

            // ENTER
            arcGroup.enter().append("g")
                .attr("class","arcGroup enter") 
                .attr("fill", function(d) { return z(d.key); })         
            .selectAll("path")
            .data(function(d) { return d; })
            .enter().append("path")
                .attr("class","arc")  
                .attr("d", d3.arc()
                    .innerRadius(function(d) { return y(d[0]); })
                    .outerRadius(function(d) { return y(d[1]); })
                    .startAngle(function(d) { return x(d.data.Material); })
                    .endAngle(function(d) { return x(d.data.Material) + x.bandwidth(); })
                    .padAngle(0.01)
                    .padRadius(innerRadius))
            
    
                  
        }
        // function weave(array, compare) {
        // var i = -1, j, n = array.sort(compare).length, weave = new Array(n);
        // while (++i < n) weave[i] = array[(j = i << 1) >= n ? (n - i << 1) - 1 : j];
        // while (--n >= 0) array[n] = weave[n];
        // }
        
>>>>>>> 83a8aa4be7594c581dd366b5396d51f1d91db375
        
const margin = {top: 40, right: 10, bottom: 10, left: 10},
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom,
      color = d3.scaleOrdinal(d3.schemeAccent);

const treemap = d3.treemap().size([width, height])

const div = d3.select("body").append("div")
    .style("position", "relative")
    .style("width", (width + margin.left + margin.right) + "px")
    .style("height", (height + margin.top + margin.bottom) + "px")
    .style("left", margin.left + "px")
    .style("top", margin.top + "px");

d3.json("flare.json").then(function(data) {
 // console.log(data)
  const root = d3.hierarchy(data, (d) => d.children)
    .sum((d) => d.size);

  const tree = treemap(root);

  const node = div.datum(root).selectAll(".node")
      .data(tree.leaves())
    .enter().append("div")
      .attr("class", "node")
      .style("left", (d) => d.x0 + "px")
      .style("top", (d) => d.y0 + "px")
      .style("width", (d) => Math.max(0, d.x1 - d.x0 - 1) + "px")
      .style("height", (d) => Math.max(0, d.y1 - d.y0  - 1) + "px")
      .style("background", (d) => color(d.parent.data.name))
      .text((d) => d.data.name);

  d3.selectAll("input").on("change", function change() {
    const value = this.value === "count"
        ? (d) => { return d.size ? 1 : 0;}
        : (d) => { return d.size; };

    const newRoot = d3.hierarchy(data, (d) => d.children)
      .sum(value);

    node.data(treemap(newRoot).leaves())
      .transition()
        .duration(1500)
        .style("left", (d) => d.x0 + "px")
        .style("top", (d) => d.y0 + "px")
        .style("width", (d) => Math.max(0, d.x1 - d.x0 - 1) + "px")
        .style("height", (d) => Math.max(0, d.y1 - d.y0  - 1) + "px")
  });
})
