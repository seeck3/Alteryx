import React, { Dispatch, useEffect } from 'react'
import axios from 'axios'
import dayjs from 'dayjs';
import { SERVER_API_URL } from '../../constants/constants'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { TextField } from '@mui/material';
import { Stock } from '../../types';

type Props = {
  setFilteredStocks: Dispatch<React.SetStateAction<Stock[]>>
}

export const PickDate = ({ setFilteredStocks }: Props) => {
  const [value, setValue] = React.useState<Date | null>(
    null
  );

  const handleChange = (newValue: Date | null) => {
    setValue(newValue);
  };

  // fetching stocks when user selects date
  useEffect(() => {
    // fetching stocks by selected date
    const getStocksByDate = async (filterDate: string) => {
      const res = await axios.get<Stock[]>(`${SERVER_API_URL}/stockPrices?date=${filterDate}`)
      setFilteredStocks(res.data)
    }

    if (value) {
      const filterDate = dayjs(value).format('M/D/YY')
      getStocksByDate(filterDate)
    }
  }, [value, setFilteredStocks])

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DesktopDatePicker
        label="Pick a date"
        inputFormat="MM/dd/yyyy"
        minDate={new Date('2017-01-01')}
        maxDate={new Date('2017-12-31')}
        value={value}
        onChange={handleChange}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  )
}
