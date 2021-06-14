import { Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import useStyles from '../styles/HomeBalanceStyle'
import RecordBalance from './RecordBalance'
import UserInfoCard from './UserInfoCard'
import FormBalance from './FormBalance'
import {
  deleteRecordId,
  getBalanceRecord,
  getTotalBalance,
} from '../services/balances'
const HomeBalance = ({ userInfo, setUserInfo }) => {
  const [addBalance, setAddBalance] = useState(false)
  const [animation, setAnimation] = useState(false)
  const [balanceTotal, setBalanceTotal] = useState(0)
  const [balance, getAllBalance] = useState([])
  const [deleteConfirmation, setdeleteConfirmation] = useState([])
  const classes = useStyles()

  const handleDeleteRecord = async (position, id, cancel) => {
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
      setBalanceTotal((prev) => {
        return balance[position].type === 'add'
          ? parseInt(prev) - parseInt(balance[position].amount)
          : parseInt(prev) + parseInt(balance[position].amount)
      })

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

  const handleChangeView = (value) => {
    setAnimation(true)
    setTimeout(() => {
      setAnimation(false)
      setAddBalance(value)
    }, 300)
  }

  useEffect(() => {
    const getRecord = async () => {
      const records = await getBalanceRecord()
      getAllBalance(records ? records : [])
      setdeleteConfirmation(new Array(records.length).fill(true))
    }
    getRecord()
    const getTotal = async () => {
      const total = await getTotalBalance()
      if (total[0]) {
        setBalanceTotal(total[0].amount)
      }
    }
    getTotal()
  }, [])

  return (
    <div className={classes.container}>
      <div className={classes.title}>
        <Typography variant="h4"> Your Balance </Typography>
      </div>
      <div className={classes.containerApp}>
        <div className={classes.userInfoContainer}>
          {addBalance ? (
            <FormBalance
              animation={animation}
              setAddBalance={handleChangeView}
              type={addBalance}
              setBalanceTotal={setBalanceTotal}
              getAllBalance={getAllBalance}
              setdeleteConfirmation={setdeleteConfirmation}
            />
          ) : (
            <UserInfoCard
              animation={animation}
              setAddBalance={handleChangeView}
              name={userInfo.name}
              balanceTotal={balanceTotal}
              setUserInfo={setUserInfo}
            />
          )}
          <div className={classes.graphicInfo}></div>
        </div>

        <div className={classes.recordInfoContainer}>
          <RecordBalance
            balance={balance}
            deleteConfirmation={deleteConfirmation}
            handleDeleteRecord={handleDeleteRecord}
          />
        </div>
      </div>
    </div>
  )
}

export default HomeBalance
