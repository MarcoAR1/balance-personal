import * as d3 from 'd3'

export const setHoursMinutesSecondsinZero = (date) => {
  const dateCopy = new Date(date)
  dateCopy.setMinutes(dateCopy.getMinutes() - dateCopy.getMinutes())
  dateCopy.setHours(dateCopy.getHours() - dateCopy.getHours())
  dateCopy.setSeconds(dateCopy.getSeconds() - dateCopy.getSeconds())
  return dateCopy
}

export const handleCurrentMonthDate = (selector = 'start') => {
  const startMonth = setHoursMinutesSecondsinZero(new Date())
  startMonth.setDate(startMonth.getDate() - startMonth.getDate() + 1)
  const endMonth = new Date(startMonth)
  endMonth.setMonth(endMonth.getMonth() + 1)
  endMonth.setDate(endMonth.getDate() - 1)
  return selector === 'start' ? startMonth : endMonth
}

export const handleSortDate = (object, record, dateForCharRange) => {
  const copydataDate = { ...object }
  const currentDateRecord = new Date(record.created_at)
  const currentDateYear = currentDateRecord.getFullYear()
  const currentDateMonth = currentDateRecord.getMonth()
  const currentDateDay = currentDateRecord.getDate()
  const currentDateHour = currentDateRecord.getHours()
  const currentDateMinute = currentDateRecord.getMinutes()
  const currentDateForSortedWithOutSecondAndHour = setHoursMinutesSecondsinZero(
    new Date(currentDateRecord)
  )

  const minDate = dateForCharRange.startDate
  const maxDate = dateForCharRange.endDate

  if (
    currentDateForSortedWithOutSecondAndHour <= maxDate &&
    currentDateForSortedWithOutSecondAndHour >= minDate
  ) {
    // Insert Year

    const copydataDateYear = copydataDate[currentDateYear]

    if (!copydataDateYear) {
      //Year
      copydataDate[currentDateYear] = {
        all: [record],
      }

      //Month
      copydataDate[currentDateYear][currentDateMonth] = {
        all: [record],
      }

      //Day
      copydataDate[currentDateYear][currentDateMonth][currentDateDay] = {
        all: [record],
      }
      //Hour
      copydataDate[currentDateYear][currentDateMonth][currentDateDay][
        currentDateHour
      ] = {
        all: [record],
      }
      //Minute
      copydataDate[currentDateYear][currentDateMonth][currentDateDay][
        currentDateHour
      ][currentDateMinute] = {
        all: [record],
      }
      return copydataDate
    }

    // Insert Month

    if (!copydataDateYear[currentDateMonth]) {
      copydataDateYear.all.push(record)
      //Month
      copydataDateYear[currentDateMonth] = {
        all: [record],
      }

      //Day
      copydataDateYear[currentDateMonth][currentDateDay] = {
        all: [record],
      }
      //Hour
      copydataDateYear[currentDateMonth][currentDateDay][currentDateHour] = {
        all: [record],
      }
      //Minute
      copydataDateYear[currentDateMonth][currentDateDay][currentDateHour][
        currentDateMinute
      ] = {
        all: [record],
      }
      return copydataDate
    }

    // Insert Day

    const copydataDateMonth = copydataDate[currentDateYear][currentDateMonth]

    if (!copydataDateMonth[currentDateDay]) {
      copydataDateYear.all.push(record)
      copydataDateMonth.all.push(record)
      //Day
      copydataDateMonth[currentDateDay] = {
        all: [record],
      }
      //Hour
      copydataDateMonth[currentDateDay][currentDateHour] = {
        all: [record],
      }
      //Minute
      copydataDateMonth[currentDateDay][currentDateHour][currentDateMinute] = {
        all: [record],
      }
      return copydataDate
    }

    // Inser Hour

    const copydataDateDay = copydataDateMonth[currentDateDay]

    if (!copydataDateDay[currentDateHour]) {
      copydataDateYear.all.push(record)
      copydataDateMonth.all.push(record)
      copydataDateDay.all.push(record)
      //Hour
      copydataDateDay[currentDateHour] = {
        all: [record],
      }
      //Minute
      copydataDateDay[currentDateHour][currentDateMinute] = {
        all: [record],
      }
      return copydataDate
    }

    // insert Minute

    const copydataDateHour = copydataDateDay[currentDateHour]

    if (!copydataDateHour[currentDateMinute]) {
      copydataDateYear.all.push(record)
      copydataDateMonth.all.push(record)
      copydataDateDay.all.push(record)
      copydataDateHour.all.push(record)

      //Minute
      copydataDateHour[currentDateMinute] = {
        all: [record],
      }
      return copydataDate
    }
    copydataDateYear.all.push(record)
    copydataDateMonth.all.push(record)
    copydataDateDay.all.push(record)
    copydataDateHour.all.push(record)
    copydataDateHour[currentDateMinute].all.push(record)
    return copydataDate
  }
  return object
}

const getAddAmount = (amounts, record) => {
  const copyAmounts = { ...amounts }

  if (record.type === 'add') {
    copyAmounts.add += parseInt(record.amount)
    if (record.amount > copyAmounts.max) {
      copyAmounts.max = parseInt(record.amount)
    }
    return copyAmounts
  }
  copyAmounts.sub += parseInt(record.amount)
  if (record.amount > copyAmounts.max) {
    copyAmounts.max = parseInt(record.amount)
  }

  return copyAmounts
}

export const getMaxAmountForUnits = (
  unit,
  dateForCharRange,
  recordSortedForDate
) => {
  const currentYear = dateForCharRange.endDate.getFullYear()
  if (!recordSortedForDate[currentYear]) {
    return {}
  }

  if (unit === 'year') {
    let AmountAdd = { maxAdd: 0 }
    for (let x in recordSortedForDate) {
      if (x === 'all') {
        continue
      }
      const currentDateFull = recordSortedForDate[x].all[0].created_at

      const currentAmount = recordSortedForDate[x].all.reduce(getAddAmount, {
        add: 0,
        sub: 0,
        max: 0,
        currentFullDate: currentDateFull,
      })

      for (let x in currentAmount) {
        if (x === 'currentFullDate') {
          continue
        }
        if (AmountAdd.maxAdd < currentAmount[x]) {
          AmountAdd.maxAdd = currentAmount[x]
        }
      }

      AmountAdd[x] = currentAmount
    }
    AmountAdd['all'] = recordSortedForDate.all
    return AmountAdd
  }
  const currentMonth = dateForCharRange.endDate.getMonth()

  if (unit === 'month') {
  }

  if (unit === 'day') {
    const recordSortDay = recordSortedForDate[currentYear][currentMonth]

    let AmountAdd = { maxAdd: 0 }
    for (let x in recordSortDay) {
      if (x === 'all') {
        continue
      }

      const currentDateFull = setHoursMinutesSecondsinZero(new Date())
      currentDateFull.setFullYear(currentYear)
      currentDateFull.setMonth(currentMonth)
      currentDateFull.setDate(parseInt(x) + 1)

      const currentAmount = recordSortDay[x].all.reduce(getAddAmount, {
        add: 0,
        sub: 0,
        max: 0,
        currentFullDate: currentDateFull,
      })
      for (let x in currentAmount) {
        if (x === 'currentFullDate') {
          continue
        }
        if (AmountAdd.maxAdd < currentAmount[x]) {
          AmountAdd.maxAdd = currentAmount[x]
        }
      }
      AmountAdd[x] = currentAmount
    }
    AmountAdd['all'] = recordSortDay.all
    return AmountAdd
  }
}

export const getWidthRatio = (unit, date, width) => {
  if (unit === 'hour') {
    const Ratio = 24
    return Ratio
  }
  if (unit === 'day') {
    const Ratio = (width / date[1].getDate() + 1) * 0.8
    return Ratio
  }
  if (unit === 'month') {
    const Ratio = 12
    return Ratio
  }
  if (unit === 'year') {
    const fristYear = date[0].getFullYear()
    const secondYear = date[1].getFullYear()
    const dif = fristYear - secondYear ? fristYear - secondYear : 1
    let ratio = (width / dif) * 0.8
    ratio = ratio > width * 0.2 ? width * 0.2 : ratio
    return ratio
  }
}

export const getTicksTimeForUnit = (unit) => {
  if (unit === 'hour') {
    return d3.timeHour.every(1)
  }
  if (unit === 'day') {
    return d3.timeDay.every(2)
  }
  if (unit === 'month') {
    return d3.timeMonth.every(1)
  }
  if (unit === 'year') {
    return d3.timeYear.every(1)
  }
}

export const getTicksFormatForUnit = (unit, tick) => {
  if (unit === 'hour') {
    return d3.timeFormat('%H:%M')(tick)
  }
  if (unit === 'day') {
    return d3.timeFormat('%Y:%m:%d')(tick)
  }
  if (unit === 'month') {
    return d3.timeFormat('%Y:%m')(tick)
  }
  if (unit === 'year') {
    return d3.timeFormat('%Y')(tick)
  }
}
