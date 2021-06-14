const handleDeleteRecord = async ({
  getAllBalance,
  setdeleteConfirmation,
  deleteRecordId,
  position,
  id,
  cancel,
}) => {
  if (cancel) {
    setdeleteConfirmation((prev) => {
      let copy = [...prev]
      copy[position] = true
      setdeleteConfirmation(copy)
    })
    return
  }
  if (!id) {
    setdeleteConfirmation((prev) => {
      let copy = [...prev]
      copy[position] = false
      setdeleteConfirmation(copy)
    })
    return
  }
  const deleteRecord = await deleteRecordId(id)
  if (!deleteRecord.responseText) {
    return 'error'
  }
  const res = JSON.parse(deleteRecord.responseText)
  if (res[0].affectedRows === 1) {
    setdeleteConfirmation((prev) => {
      let copy = [...prev]
      copy.splice(position, 1)
      return copy
    })
    getAllBalance((prev) => {
      let copy = [...prev]
      copy.splice(position, 1)
      return copy
    })
  }
}

export default handleDeleteRecord
