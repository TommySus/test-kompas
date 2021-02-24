<template>
  <div class="ListJajan mx-auto">
    <div class="jajan">
      <h5><b>{{data.created_at.slice(11, 16)}} {{data.name}}</b></h5>
    </div>
    <div class="cost">
      <h5><b>{{data.cost | currency}}</b></h5>
    </div>
  </div>
</template>

<script>
export default {
  name: 'JajanList',
  props: ['data']
}
</script>

<style>
  .ListJajan {
    width: 22rem;
    box-shadow: 1px 1px 1px 1px #888888;
    margin: 10px;
    border-radius: 5px;
  }
  .ListJajan .jajan {
    padding: 5px;
    float: left;
  }
  .ListJajan .cost {
    padding: 5px;
    float: right;
  }
</style>
