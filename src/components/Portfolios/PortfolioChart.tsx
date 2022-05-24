import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { IgrFinancialChart } from 'igniteui-react-charts'
import { SERVER_API_URL } from '../../constants/constants'
import { PortfolioResponse, Stock, StockItem } from '../../types'
import { convertData } from '../../utils/utils'

type Props = {
  portfolios: PortfolioResponse[]
}
export const PortfolioChart = ({ portfolios }: Props) => {
  const [chart, setChart] = useState<StockItem[][]>([])

  useEffect(() => {
    const newMap: { [key: string]: string } = {}
    portfolios.forEach(data => data.portfolio.forEach(portfolio => newMap[portfolio.stock.Name] = portfolio.stock.Name))

    // fetching data by name to display in chart
    const getChartData = async () => {
      const multiRes = await Promise.all(Object.values(newMap).map(val => {
        return axios.get<Stock[]>(`${SERVER_API_URL}/stockPrices?Name=${val}`)
      }))

      // converting response data to chart data
      const chartData = multiRes.map(res => {
        const stockData: StockItem[] = convertData(res.data);
        (stockData as any).__dataIntents = { close: [`SeriesTitle/${res.data[0].Name}`] }

        return stockData
      })

      // set chart data
      setChart(chartData)
    }
    getChartData()

  }, [portfolios])

  return (
    <IgrFinancialChart
      width="100%"
      height="500px"
      chartType="Line"
      thickness={2}
      chartTitle="My Portfolio"
      subtitle="2017"
      yAxisMode="PercentChange"
      yAxisTitle="Percent Changed"
      dataSource={chart} />
  )
}
