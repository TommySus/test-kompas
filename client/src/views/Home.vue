<template>
  <div class="home">
      <div class="addJajan">
          <h1>Diari Jajan Februari 2021</h1>
          <h4>Pengeluaran Bulan Ini {{totalPriceOnFebruary | currency}}</h4>
          <button @click="addJajan" class="buttonAddJajan">Tambah Item</button>
      </div>
      <div class="boardCard">
        <JajanCard
          v-for="date in dataFilter"
          :key="date.id"
          :date="date"
          :dataJajan="allData"
        />
      </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import JajanCard from '../components/JajanCard'

export default {
  name: 'Home',
  components: {
    JajanCard
  },
  data () {
    return {
      modalShow: false
    }
  },
  methods: {
    fetchData () {
      this.$store.dispatch('fetchData')
    },
    async addJajan () {
      const { value: formValues } = await Swal.fire({
        title: 'Tambah Entri',
        html:
          '<label><b>Nama</b></label>' +
          '<input type="text" id="swal-input1" class="swal2-input">' +
          '<label><b>Harga</b></label><br>' +
          '<input type="number" id="swal-input2" class="swal2-input">',
        focusConfirm: false,
        confirmButtonText: 'Kirim',
        cancelButtonText: 'Batal',
        showCancelButton: true,
        cancelButtonColor: 'red',
        preConfirm: () => {
          return [
            document.getElementById('swal-input1').value,
            document.getElementById('swal-input2').value
          ]
        }
      })
      if (formValues) {
        const namaJajan = formValues[0]
        const hargaJajan = Number(formValues[1])
        const payload = {
          name: namaJajan,
          cost: hargaJajan
        }
        this.$store.dispatch('addData', payload)
          .then(({ data }) => {
            this.fetchData()
          })
          .catch(error => {
            console.log(error)
          })
      }
    }
  },
  created () {
    this.fetchData()
  },
  computed: {
    allData () {
      return this.$store.state.dataJajan
    },
    dataFilter () {
      const values = this.allData
      const date = []
      for (let i = 0; i < values.length; i++) {
        date.push(values[i].created_at.slice(0, 10))
      }
      const uniqueValues = [...new Set(date)]
      uniqueValues.sort()
      uniqueValues.reverse()
      return uniqueValues
    },
    totalPriceOnFebruary () {
      let total = 0
      for (let i = 0; i < this.allData.length; i++) {
        total += (this.allData[i].cost)
      }
      return total
    }
  }
}
</script>
<style>
  .home {
    display: flex;
    flex-direction: column;
  }
  .boardCard {
    display: flex;
    justify-content: center;
    flex-direction: row;
    flex-wrap: wrap;
    flex-grow: 1;
  }
  .inputNewJajan {
    flex: none;
    justify-content: center;
  }
  .swal2-input {
    width: 400px;
  }
  .addJajan {
    margin-bottom: 30px;
  }
  .addJajan button {
    width: 150px;
    height: 40px;
    margin-top: 20px;
    border-radius: 5px;
    background-color: transparent;
    transition: 0.5s;
    background-color: #5b5b5b;
    color: white;
    box-shadow: 4px 4px #888888;
    font-size: 20px;
  }
  .addJajan button:active {
    transition: 0.5s;
    box-shadow: 0px 0px #888888;
  }

</style>
