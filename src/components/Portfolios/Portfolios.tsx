import React, { useEffect, useState } from 'react'
import axios from 'axios'
import dayjs from 'dayjs'
import { ExpandMore } from '@mui/icons-material'
import { Accordion, AccordionDetails, AccordionSummary, Button, Typography } from '@mui/material'
import { IgrFinancialChartModule } from 'igniteui-react-charts'
import { SERVER_API_URL } from '../../constants/constants'
import { PortfolioResponse } from '../../types'
import { PortfolioChart } from './PortfolioChart'

IgrFinancialChartModule.register();
export const Portfolios = () => {
  const [portfolios, setPortfolios] = useState<PortfolioResponse[]>([])
  const [displayChart, setDisplayChart] = useState(false)

  useEffect(() => {
    // fetching all portfolios
    const getPortfolios = async () => {
      const res = await axios.get<PortfolioResponse[]>(`${SERVER_API_URL}/portfolio`)

      if (res) {
        setPortfolios(res.data)
      }
    }
    getPortfolios()
  }, [])

  return (
    <>
      <Button onClick={() => setDisplayChart(!displayChart)}>Display Chart</Button>
      {displayChart && <PortfolioChart portfolios={portfolios} />}
      {portfolios.map(portfolio => <Accordion key={portfolio.id}>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Portfolio ID : {portfolio.id}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {portfolio.portfolio.map(port => <Accordion key={port.stock.Name}>
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography sx={{ width: '33%', flexShrink: 0 }}>
                Name : {port.stock.Name}
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>Shares : {port.shares}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Date : {dayjs(port.stock.date).format('MM/DD/YYYY')}
              </Typography>
              <Typography>
                High : {port.stock.high}
              </Typography>
              <Typography>
                Low : {port.stock.low}
              </Typography>
            </AccordionDetails>
          </Accordion>)}
        </AccordionDetails>
      </Accordion>)}
    </>

  )
}
