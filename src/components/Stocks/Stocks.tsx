import React, { useState } from 'react'
import axios from 'axios'
import { SERVER_API_URL } from '../../constants/constants'
import { Button, Grid, Snackbar } from '@mui/material';
import { PickDate } from './PickDate';
import { Portfolio, Stock } from '../../types';
import { styled } from '@mui/system';
import { StockCard } from './StockCard';
import { Alert } from '@material-ui/lab';

const Wrapper = styled('div')({
  padding: 8,
  borderRadius: 4,
  display: 'flex',
  flexDirection: 'column'
});

export const Stocks = () => {
  const [filteredStocks, setFilteredStocks] = useState<Stock[]>([])
  const [addedStocks, setAddedStocks] = useState<{ [key: string]: Portfolio }>({})
  const [snackBar, setSnackBar] = useState(false)

  // adding selected stocks with shares to portfolio
  const addToPortfolio = async () => {
    const res = await axios.post(`${SERVER_API_URL}/portfolio`, { portfolio: [...Object.values(addedStocks).map(value => value)] })

    if (res.status === 201) {
      // display snackbar when it successfully stored in db
      setSnackBar(true)
      setAddedStocks({})
    }
  }

  return (
    <Wrapper >
      <PickDate setFilteredStocks={setFilteredStocks} />
      <Button sx={{ margin: "15px 0" }} variant='outlined' disabled={!Object.keys(addedStocks).length} onClick={addToPortfolio}>Add To Portfolio</Button>
      <Grid container columnSpacing={1} rowSpacing={1} >
        {filteredStocks.map(stock => <StockCard key={stock.Name} addedShares={addedStocks[stock.Name]?.shares} stock={stock} setAddedStocks={setAddedStocks} />)}

      </Grid>
      <Snackbar
        autoHideDuration={3000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        onClose={() => setSnackBar(false)}
        open={snackBar}>
        <Alert onClose={() => setSnackBar(false)} severity="success">successfully save to portfolio</Alert>
      </Snackbar>
    </Wrapper>
  )
}
