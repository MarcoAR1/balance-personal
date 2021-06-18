export const useRecordsAnimation = () => {
  const handleAnimationRecord = (fun, balance_id, close) => {
    if (close) {
      document.getElementById(balance_id).classList.toggle('flip-left')
      setTimeout(() => {
        fun()
        document.getElementById(balance_id).classList.toggle('flip-left2')
        document.getElementById(balance_id + 'two').style.display = 'none'
        setTimeout(() => {
          document.getElementById(balance_id).classList.toggle('flip-left2')
          document.getElementById(balance_id).classList.toggle('flip-left')
          document.getElementById(balance_id + 'two').style.display = 'flex'
        }, 200)
      }, 200)
      return
    }
    document.getElementById(balance_id).classList.toggle('flip-right')
    setTimeout(() => {
      fun()
      document.getElementById(balance_id).classList.toggle('flip-right2')
      document.getElementById(balance_id + 'two').style.display = 'none'
      setTimeout(() => {
        document.getElementById(balance_id).classList.toggle('flip-right2')
        document.getElementById(balance_id).classList.toggle('flip-right')
        document.getElementById(balance_id + 'two').style.display = 'flex'
      }, 200)
    }, 200)
  }

  return { handleAnimationRecord }
}
