<template>
 <div>
     <v-data-table
    :headers="headers"
    :items="currentList"
    class="companyList"
  >
    <template v-slot:items="props">
      <td>{{ props.item.company }}</td>
      <td class="text-xs-right">{{ props.item.salary }}</td>
      <td class="text-xs-right">{{ props.item.taxes }}</td>
      <td class="text-xs-right">{{ props.item.workers }}</td>
    </template>
  </v-data-table>
 </div>
</template>

<script>
import * as d3 from "d3";

  import axios from 'axios'
export default {
    data: function () {
    return {
      art: this.$store.state.art,
       it: this.$store.state.it,
       currentList: [],
       headers: [
          {
            text: 'Companies',
            align: 'left',
            sortable: true,
            value: 'company'
          },
          { text: 'Salary', value: 'salary' },
          { text: 'Taxes', value: 'taxes' },
          { text: 'Workers', value: 'workers' },

        ]
    }
  },

  mounted() {
    this.currentList=this.art
    let currentList = this.currentList
    let art = this.art
    let it = this.it
    console.log(this.currentList)
function getWages() {
  return axios.get('/api/stat-ee/table/PA001')
}
function getEmployment() {
  return axios.get('/api/stat-ee/table/PAV011')
}

const thisEl =this.$el
const employmentData = [];
const employmentDataTemp = [];
const employmentDataFinal={
  "name": "flare",
  "children":[]
};
const employmentCategories = []
const employmentTimeline = []

axios.all([ getWages(), getEmployment()])
  .then(axios.spread(function (wagesResponce,employmentResponce) {
    employmentResponce.data.structure.dimensions.series[1].values.forEach(function(category){
      employmentCategories.push(category.name)
    })
    employmentResponce.data.structure.dimensions.observation[0].values.forEach(function(timeValue)  {
      employmentTimeline.push(timeValue.name)
    });
    for (const outerKey in employmentResponce.data.dataSets[0].series) {
  
      if(outerKey.split(":")[2] ==="0"){
        employmentDataTemp[outerKey]=[]
        //console.log(employmentResponce.data.dataSets[0].series[outerKey])
        for (let innerIndex = 0; innerIndex < employmentTimeline.length; innerIndex++) { 
          if(employmentResponce.data.dataSets[0].series[outerKey].observations[innerIndex]){
            employmentDataTemp[outerKey].push(employmentResponce.data.dataSets[0].series[outerKey].observations[innerIndex][0])
          }
          else{
            employmentDataTemp[outerKey].push(0)
          }
        }
      }
    }

    for (let industryIndex = 0; industryIndex < employmentCategories.length; industryIndex++) { 
      employmentData[industryIndex]=[]
      for(let innerIndex = 0; innerIndex < employmentTimeline.length; innerIndex++){

        if(employmentDataTemp[`0:${industryIndex}:0`]){
          employmentData[industryIndex].push(
          employmentDataTemp[`0:${industryIndex}:0`][innerIndex]+
          employmentDataTemp[`1:${industryIndex}:0`][innerIndex]+
          employmentDataTemp[`2:${industryIndex}:0`][innerIndex]+
          employmentDataTemp[`3:${industryIndex}:0`][innerIndex]
          )
        }else{
          employmentData[industryIndex].push(0)
        }

      }
      
    }
    employmentData.forEach(function(industry,index){
      if(industry[employmentTimeline.length-1]>0 && !(employmentCategories[index]==="Economic activities total")){
     employmentDataFinal.children.push({
        name: employmentCategories[index],
        size: industry[employmentTimeline.length-1]
      })
      }
 
      
    })

const margin = {top: 40, right: 10, bottom: 10, left: 10},
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom,
      color = d3.scaleLinear()
    .domain([0,8000])
    .range(["#c6c6c6", "#34287f"])
    .interpolate(d3.interpolateHcl);

const treemap = d3.treemap().size([width, height])

const div = d3.select(thisEl).insert("div", ".companyList")
    .style("position", "relative")
    .style("width", (width + margin.left + margin.right) + "px")
    .style("height", (height + margin.top + margin.bottom) + "px")
    .style("left", margin.left + "px")
    .style("top", margin.top + "px")
  

d3.json("flare.json").then(function(data) {
  //console.log(data)
  data=employmentDataFinal
  const root = d3.hierarchy(data, (d) => d.children)
    .sum((d) => d.size);

  const tree = treemap(root);

  const node = div.datum(root).selectAll(".node")
      .data(tree.leaves())
    .enter().append("div")
      .attr("class", "node")
      .style("left", (d) => d.x0 + "px")
      .style("top", (d) => d.y0 + "px")
        .style("font-size", (d)=>d.value*0.002+"px")
        .style("text-align","center")
         .style("vertical-align","center")
      .style("width", (d) => Math.max(0, d.x1 - d.x0 - 1) + "px")
      .style("height", (d) => Math.max(0, d.y1 - d.y0  - 1) + "px")
      .style("background", (d) => color(d.value))
      .text((d) => d.data.name)

 d3.selectAll(".node").on("click",function(e){
        console.log(currentList)
        if(e.data.name === "Information and communication"){
          currentList=it
        }
        else if(e.data.name === "Arts, entertainment and recreation"){
          currentList=art

        }
      }) 
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
}));

  },
  methods: {

  },
};
</script>
<style>

</style>