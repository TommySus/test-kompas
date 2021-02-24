<template>
  <div>
    <b-card
      tag="article"
      style="width: 25rem; min-height: 38rem; box-shadow: 2px 2px #888888;"
      class="cardJajan"
    >
    <div class="date">
      <h4><b>{{date.slice(8,10)}} Februari</b></h4>
    </div>
    <div class="cardList">
      <JajanListPerDay
        class="cardListJajan"
        v-for="data in sortData"
        :key="data.id"
        :data="data"
      />
      <div class="total">
        <h5 class="totalPrice">Total:   {{totalPrice | currency}}</h5>
      </div>
    </div>
    </b-card>
  </div>
</template>

<script>
import JajanListPerDay from './JajanListPerDay'

export default {
  name: 'JajanCard',
  props: ['date', 'dataJajan'],
  components: {
    JajanListPerDay
  },
  methods: {
  },
  computed: {
    filteredData () {
      return this.dataJajan
        .filter(dataJajan => dataJajan.created_at.slice(0, 10) === this.date)
    },
    totalPrice () {
      let total = 0
      for (let i = 0; i < this.filteredData.length; i++) {
        total += (this.filteredData[i].cost)
      }
      return total
    },
    sortData () {
      const date = this.filteredData
      // for (let i = 0; i < this.filteredData.length; i++) {
      //   date.push(this.filteredData[i].created_at)
      // }
      // return date.sort()
      return date.sort((a, b) => (a.created_at > b.created_at) ? 1 : ((b.created_at > a.created_at) ? -1 : 0))
    }
  }
}
</script>

<style>
  .cardJajan {
    box-shadow: 2px 2px #888888;
    margin: 10px;
    cursor: pointer;
    position: relative;
    transition: 0.5s;
  }
  .cardJajan:hover {
    transition: 0.5s;
    transform: scale(1.05);
  }
  .cardJajan .date {
    position: absolute;
    top: 15px;
    left: -20px;
    width: 150px;
    text-align:right;
  }
  .cardJajan .cardList {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 25px;
  }
  .total {
    margin-top: 10px;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  .cardListJajan {
    transition: 0.5s;
  }
  .cardListJajan:hover {
    transition: 0.5s;
    transform: scale(1.05);
  }
</style>
