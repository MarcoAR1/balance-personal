export const useRecordsAnimation = () => {
  const handleAnimationRecord = (fun, balance_id, close) => {
    if (close) {
      document.getElementById(balance_id).classList.toggle('flip-left')
      setTimeout(() => {
        fun()
        document.getElementById(balance_id).classList.toggle('flip-left2')
        setTimeout(() => {
          document.getElementById(balance_id).classList.toggle('flip-left2')
          document.getElementById(balance_id).classList.toggle('flip-left')
        }, 200)
      }, 200)
      return
    }
    document.getElementById(balance_id).classList.toggle('flip-right')
    setTimeout(() => {
      fun()
      document.getElementById(balance_id).classList.toggle('flip-right2')
      setTimeout(() => {
        document.getElementById(balance_id).classList.toggle('flip-right2')
        document.getElementById(balance_id).classList.toggle('flip-right')
      }, 200)
    }, 200)
  }

  const handleUnFocused = (balance_id, fun) => {
    setTimeout(
      () => handleAnimationRecord(fun, balance_id, true),

      500
    )
  }
  return { handleAnimationRecord, handleUnFocused }
}
