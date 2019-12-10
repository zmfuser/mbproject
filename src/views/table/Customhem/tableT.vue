<template>
  <div>
 <sltopn  :metName="'queryDict'"  :dtName="'fundType'"  :fileType="{'value':'dictValue','label':'dictName'}"></sltopn>
  </div>
</template>

<script>
 import sltopn from './tableTest.vue' 
  export default {
  components: {sltopn },
  data(){
    return{
        queryDict:1,
        dictName:'中途'   
    }
  }
}
</script>

<style scoped>

</style>
