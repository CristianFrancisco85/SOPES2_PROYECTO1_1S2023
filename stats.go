package main

import (
	"context"

	"github.com/shirou/gopsutil/v3/cpu"
	"github.com/shirou/gopsutil/v3/disk"
)

// App struct
type MyStatsBackend struct {
	ctx         context.Context
	CPUPercent  float64
	DiskPercent float64
}

func NewMyStatsBackend() *MyStatsBackend {
	return &MyStatsBackend{}
}

func (a *MyStatsBackend) startup(ctx context.Context) {
	a.ctx = ctx
}

func (m *MyStatsBackend) CPUUsage() float64 {
	percent, _ := cpu.Percent(0, false)
	m.CPUPercent = percent[0]
	return m.CPUPercent
}

func (m *MyStatsBackend) DiskUsage() float64 {
	percent, _ := disk.Usage("/")
	m.DiskPercent = percent.UsedPercent
	return m.DiskPercent
}
