
import React, { Dispatch, SetStateAction, useState } from 'react'
import { Button, Card, Grid, TextField } from '@mui/material';
import { Portfolio, Stock } from '../../types';
import { Typography } from '@material-ui/core';

type Props = {
  addedShares?: string
  stock: Stock
  setAddedStocks: Dispatch<SetStateAction<{ [key: string]: Portfolio }>>
}
export const StockCard = ({ addedShares, stock, setAddedStocks }: Props) => {
  const [shares, setShares] = useState('')

  // adding shares to stock
  const addStocks = (stock: Stock, shares: string) => {
    setAddedStocks((state) => {
      if (state[stock.Name]) {
        state[stock.Name].shares = (parseInt(state[stock.Name].shares) + parseInt(shares)).toString()
        return { ...state }
      }
      return { ...state, [stock.Name]: { stock, shares } }
    })
    setShares('')
  }

  return (
    <Grid xs={4} item>
      <Card sx={{ backgroundColor: addedShares ? 'rgb(25, 118, 210, 0.1)' : "inherit", padding: "15px", display: 'flex', flexDirection: 'column' }}>

        <Typography>Name : {stock.Name}  </Typography>
        <Typography variant='caption'>Added Shares : {addedShares || '0'}</Typography>
        <TextField value={shares} onChange={(e) => setShares(e.target.value)} placeholder={`enter share amount of ${stock.Name}`} type='number' variant="outlined" />

        <Button variant="contained" onClick={() => addStocks(stock, shares)}>Add</Button>
      </Card>
    </Grid>
  )
}
