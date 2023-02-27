import React, { useState, useEffect } from 'react'
import { Doughnut } from 'react-chartjs-2'
import { CPUUsage, DiskUsage } from '../wailsjs/go/main/MyStatsBackend'
import 'chart.js/auto'
import './App.css'

const data = {
	labels: ['CPU Available','CPU Usage'],
    datasets: [{
        data: [0, 100],
        backgroundColor: ['#36A2EB','#FF6384'],
        hoverBackgroundColor: ['#36A2EB','#FF6384'],
    }]
}

const App = () => {

	const [cpuData, setCpuData] = useState(data)
	const [diskData, setDiskData] = useState(data)


	useEffect(() => {
		const timer = setInterval( async () => {

            const cpuUsage = await CPUUsage()
            const cpuAvailable = 100 - cpuUsage

			const newData = {
				labels: ['CPU Available','CPU Usage'],
				datasets: [{
					data: [cpuAvailable, cpuUsage],
					backgroundColor: ['#36A2EB','#FF6384'],
					hoverBackgroundColor: ['#36A2EB','#FF6384'],
				}]
			}
			setCpuData(newData)

            const diskUsage = await DiskUsage()
            const diskAvailable = 100 - diskUsage

            const newDiskData = {
                labels: ['Disk Available','Disk Usage'],
                datasets: [{
                    data: [diskAvailable, diskUsage],
                    backgroundColor: ['#36eba0','#ffc163'],
                    hoverBackgroundColor: ['#36eba0','#ffc163'],
                }]
            }
            setDiskData(newDiskData)

		}, 2000)

        return () => clearInterval(timer)
	})

	return (
        <div className="main">
            <h1> Monitor de recursos </h1>

            <div style = {{ display: 'flex', flexDirection: 'row' }}>
                <div className="cardStat" >
                    <h2>Porcentaje de uso de CPU</h2>
                    <Doughnut data={cpuData} />
                </div>

                <div className="cardStat" >
                    <h2>Porcentaje de uso de Disco</h2>
                    <Doughnut data={diskData} />
                </div>
            </div>

        </div>
	)
}

export default App