<template>
  <div>{{fileData.type}}: {{fileData.file || fileData.directory}}</div>
  <div class="children" v-if="fileData.children" v-for="item in fileData.children">
    <fileTree  :fileData="item"></fileTree>
  </div>
</template>

<script>
export default {
  name: "fileTree",
  props: ["fileData"],
  setup(props) {
    window.p = props;
    console.log(props);
    return {
      fileData: props.fileData
    };
  }
};
</script>
  
<style scoped>
.children {
  margin-left: 20px;
}
</style>