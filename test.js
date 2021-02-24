const newDate = new Date()
      const date = newDate.toISOString().slice(0, 10)
      let hour = newDate.getHours()
      let minute = newDate.getMinutes()
      let second = newDate.getSeconds()
      function addZero (n) {
          return (n < 10 ? '0' : '') + n
      }

      hour = addZero(hour)
      minute = addZero(minute)
      second = addZero(second)

      const clock = `${date} ${hour}:${minute}:${second}`
      console.log(clock)