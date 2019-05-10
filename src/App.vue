<template>
<div>
  <treemap></treemap>
</div>
</template>

<script>
import CompanyList from './components/CompanyList.vue'
import Treemap from './components/Treemap.vue'

  export default {

    components:{
        Treemap
    }
      
  }
</script>

<style>
body {
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    margin: auto;
    position: relative;
    width: 960px;
  }
  form {
    position: absolute;
    right: 10px;
    top: 10px;
  }
  .node {
    /* border: solid 1px white; */
    font: 14px sans-serif;
    color: white;
    line-height: 12px;
    overflow: hidden;
    position: absolute;
    text-indent: 2px;
  }
</style>