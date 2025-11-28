'use client'

import { Card } from '@/components/ui/card'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

// User Efficiency Data - Average records per user
const userEfficiencyData = [
  { name: 'Emma Davis', efficiency: 95, totalRecords: 152, avgPerDay: 12.7 },
  { name: 'David Lee', efficiency: 88, totalRecords: 131, avgPerDay: 10.9 },
  { name: 'Mike Johnson', efficiency: 85, totalRecords: 128, avgPerDay: 10.7 },
  { name: 'Chris Taylor', efficiency: 78, totalRecords: 97, avgPerDay: 8.1 },
  { name: 'Lisa Anderson', efficiency: 72, totalRecords: 82, avgPerDay: 6.8 },
  { name: 'John Doe', efficiency: 70, totalRecords: 75, avgPerDay: 6.3 },
  { name: 'Tom Brown', efficiency: 68, totalRecords: 71, avgPerDay: 5.9 },
]

// User Data Type Preferences - What type of data each user adds most
const userDataTypeData = [
  { 
    name: 'Emma Davis',
    companies: 18,
    contacts: 65,
    technologies: 42,
    projects: 15,
  },
  { 
    name: 'David Lee',
    companies: 16,
    contacts: 60,
    technologies: 34,
    projects: 12,
  },
  { 
    name: 'Mike Johnson',
    companies: 15,
    contacts: 58,
    technologies: 31,
    projects: 12,
  },
  { 
    name: 'Chris Taylor',
    companies: 13,
    contacts: 48,
    technologies: 26,
    projects: 9,
  },
  { 
    name: 'Lisa Anderson',
    companies: 11,
    contacts: 42,
    technologies: 22,
    projects: 7,
  },
]

// Top Users by Data Type Added
const topUsersByDataType = [
  { user: 'Emma Davis', type: 'Contacts', count: 65, percentage: 43 },
  { user: 'David Lee', type: 'Contacts', count: 60, percentage: 46 },
  { user: 'Emma Davis', type: 'Technologies', count: 42, percentage: 28 },
  { user: 'Mike Johnson', type: 'Contacts', count: 58, percentage: 45 },
  { user: 'David Lee', type: 'Technologies', count: 34, percentage: 26 },
]

// User Productivity Score (based on total records and consistency)
const userProductivityData = [
  { name: 'Emma Davis', score: 95, records: 152, consistency: 92 },
  { name: 'David Lee', score: 88, records: 131, consistency: 85 },
  { name: 'Mike Johnson', score: 85, records: 128, consistency: 82 },
  { name: 'Chris Taylor', score: 78, records: 97, consistency: 75 },
  { name: 'Lisa Anderson', score: 72, records: 82, consistency: 70 },
]

// Data Type Distribution by Top Users
const dataTypeByUsers = [
  { type: 'Contacts', count: 273, users: 5, avgPerUser: 54.6 },
  { type: 'Technologies', count: 155, users: 5, avgPerUser: 31.0 },
  { type: 'Companies', count: 73, users: 5, avgPerUser: 14.6 },
  { type: 'Projects', count: 55, users: 5, avgPerUser: 11.0 },
]

export function ActivityCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8 w-full">
      {/* User Efficiency Ranking */}
      <Card className="border-border p-6 w-full">
        <h3 className="text-lg font-semibold text-foreground mb-4">User Efficiency Ranking</h3>
        <p className="text-xs text-muted-foreground mb-4">Efficiency score based on total records and daily average</p>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={userEfficiencyData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis type="number" domain={[0, 100]} stroke="var(--color-muted-foreground)" />
            <YAxis dataKey="name" type="category" stroke="var(--color-muted-foreground)" width={100} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--color-card)',
                border: '1px solid var(--color-border)',
              }}
              formatter={(value: number, name: string) => {
                if (name === 'efficiency') return [`${value}%`, 'Efficiency Score']
                if (name === 'totalRecords') return [value, 'Total Records']
                if (name === 'avgPerDay') return [value, 'Avg/Day']
                return [value, name]
              }}
            />
            <Legend />
            <Bar dataKey="efficiency" fill="#8b5cf6" radius={[0, 4, 4, 0]} name="Efficiency %" />
          </BarChart>
        </ResponsiveContainer>
        <div className="mt-4 text-xs text-muted-foreground">
          <span>Efficiency = (Total Records × Consistency) / 100</span>
        </div>
      </Card>

      {/* User Data Type Preferences */}
      <Card className="border-border p-6 w-full">
        <h3 className="text-lg font-semibold text-foreground mb-4">Top Users - Data Type Breakdown</h3>
        <p className="text-xs text-muted-foreground mb-4">What type of data each top user adds most</p>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={userDataTypeData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="name" stroke="var(--color-muted-foreground)" angle={-45} textAnchor="end" height={80} />
            <YAxis stroke="var(--color-muted-foreground)" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--color-card)',
                border: '1px solid var(--color-border)',
              }}
            />
            <Legend />
            <Bar dataKey="companies" fill="#8b5cf6" radius={[8, 8, 0, 0]} name="Companies" />
            <Bar dataKey="contacts" fill="#3b82f6" radius={[8, 8, 0, 0]} name="Contacts" />
            <Bar dataKey="technologies" fill="#06b6d4" radius={[8, 8, 0, 0]} name="Technologies" />
            <Bar dataKey="projects" fill="#ec4899" radius={[8, 8, 0, 0]} name="Projects" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* User Productivity Score */}
      <Card className="border-border p-6 w-full">
        <h3 className="text-lg font-semibold text-foreground mb-4">User Productivity Score</h3>
        <p className="text-xs text-muted-foreground mb-4">Combined score: Records + Consistency</p>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={userProductivityData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="name" stroke="var(--color-muted-foreground)" angle={-45} textAnchor="end" height={80} />
            <YAxis domain={[0, 100]} stroke="var(--color-muted-foreground)" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--color-card)',
                border: '1px solid var(--color-border)',
              }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="score" 
              stroke="#8b5cf6" 
              strokeWidth={3} 
              dot={{ r: 5 }} 
              name="Productivity Score"
            />
            <Line 
              type="monotone" 
              dataKey="consistency" 
              stroke="#06b6d4" 
              strokeWidth={2} 
              dot={{ r: 4 }} 
              name="Consistency %"
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Data Type Distribution by Users */}
      <Card className="border-border p-6 w-full">
        <h3 className="text-lg font-semibold text-foreground mb-4">Data Type Distribution</h3>
        <p className="text-xs text-muted-foreground mb-4">Total data added by type across all users</p>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={dataTypeByUsers} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis type="number" stroke="var(--color-muted-foreground)" />
            <YAxis dataKey="type" type="category" stroke="var(--color-muted-foreground)" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--color-card)',
                border: '1px solid var(--color-border)',
              }}
              formatter={(value: number, name: string) => {
                if (name === 'count') return [value, 'Total Records']
                if (name === 'users') return [value, 'Active Users']
                if (name === 'avgPerUser') return [value.toFixed(1), 'Avg/User']
                return [value, name]
              }}
            />
            <Legend />
            <Bar dataKey="count" fill="#3b82f6" radius={[0, 4, 4, 0]} name="Total Records" />
            <Bar dataKey="avgPerUser" fill="#06b6d4" radius={[0, 4, 4, 0]} name="Avg per User" />
          </BarChart>
        </ResponsiveContainer>
        <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
          {dataTypeByUsers.map((item) => (
            <div key={item.type} className="flex items-center justify-between">
              <span className="text-muted-foreground">{item.type}:</span>
              <span className="font-semibold">{item.count} records</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
