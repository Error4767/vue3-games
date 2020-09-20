<template>
  <div>
    <teleport to='body'>
      <div class='modal'>
        Modal Value
      </div>
    </teleport>
  </div>
</template>

<script>
export default {
  
}
</script>
  
<style scoped>
  .modal {
    position: absolute;
    width: 300px;
    height: 150px;
    text-align: center;
    line-height: 140px;
    left: 50%;
    top: 100%;
    transform: translate(-50%, -50%);
    border: 5px solid #000;
  }
</style>