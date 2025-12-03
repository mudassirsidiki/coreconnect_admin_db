'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Clock, ArrowUpDown, ArrowDown } from 'lucide-react'

type SortBy = 'time' | 'total'

interface UserDataItem {
  id: number
  name: string
  timestamp: string // ISO date string for sorting
  date: string // Display date
  time: string // Display time
  manual: {
    companies: number
    contacts: number
    technologies: number
    projects: number
  }
  wizard: {
    companies: number
    contacts: number
    technologies: number
    projects: number
  }
}

const mockUserData: UserDataItem[] = [
  {
    id: 1,
    name: 'Ahmed Ali',
    timestamp: '2025-11-20T08:15:00',
    date: '20 Nov 2025',
    time: '08:15 AM',
    manual: { companies: 5, contacts: 20, technologies: 10, projects: 3 },
    wizard: { companies: 7, contacts: 25, technologies: 13, projects: 5 },
  },
  {
    id: 2,
    name: 'Fatima Khan',
    timestamp: '2025-11-20T09:30:00',
    date: '20 Nov 2025',
    time: '09:30 AM',
    manual: { companies: 3, contacts: 15, technologies: 8, projects: 2 },
    wizard: { companies: 5, contacts: 17, technologies: 7, projects: 3 },
  },
  {
    id: 3,
    name: 'Hassan Malik',
    timestamp: '2025-11-20T10:45:00',
    date: '20 Nov 2025',
    time: '10:45 AM',
    manual: { companies: 8, contacts: 30, technologies: 18, projects: 6 },
    wizard: { companies: 7, contacts: 28, technologies: 13, projects: 6 },
  },
  {
    id: 4,
    name: 'Ayesha Sheikh',
    timestamp: '2025-11-20T11:20:00',
    date: '20 Nov 2025',
    time: '11:20 AM',
    manual: { companies: 2, contacts: 10, technologies: 5, projects: 1 },
    wizard: { companies: 4, contacts: 12, technologies: 5, projects: 2 },
  },
  {
    id: 5,
    name: 'Bilal Ahmed',
    timestamp: '2025-11-20T12:10:00',
    date: '20 Nov 2025',
    time: '12:10 PM',
    manual: { companies: 4, contacts: 18, technologies: 9, projects: 3 },
    wizard: { companies: 6, contacts: 20, technologies: 10, projects: 4 },
  },
  {
    id: 6,
    name: 'Zainab Raza',
    timestamp: '2025-11-20T13:25:00',
    date: '20 Nov 2025',
    time: '01:25 PM',
    manual: { companies: 10, contacts: 35, technologies: 25, projects: 8 },
    wizard: { companies: 8, contacts: 30, technologies: 17, projects: 7 },
  },
  {
    id: 8,
    name: 'Usman Iqbal',
    timestamp: '2025-11-20T14:40:00',
    date: '20 Nov 2025',
    time: '02:40 PM',
    manual: { companies: 6, contacts: 22, technologies: 12, projects: 4 },
    wizard: { companies: 5, contacts: 20, technologies: 10, projects: 3 },
  },
  {
    id: 9,
    name: 'Sana Mirza',
    timestamp: '2025-11-20T15:55:00',
    date: '20 Nov 2025',
    time: '03:55 PM',
    manual: { companies: 7, contacts: 25, technologies: 14, projects: 5 },
    wizard: { companies: 6, contacts: 23, technologies: 12, projects: 4 },
  },
  {
    id: 10,
    name: 'Omar Butt',
    timestamp: '2025-11-20T16:30:00',
    date: '20 Nov 2025',
    time: '04:30 PM',
    manual: { companies: 5, contacts: 20, technologies: 11, projects: 3 },
    wizard: { companies: 4, contacts: 18, technologies: 9, projects: 2 },
  },
  {
    id: 11,
    name: 'Hira Abbas',
    timestamp: '2025-11-20T17:15:00',
    date: '20 Nov 2025',
    time: '05:15 PM',
    manual: { companies: 9, contacts: 32, technologies: 19, projects: 7 },
    wizard: { companies: 7, contacts: 28, technologies: 15, projects: 5 },
  },
  {
    id: 12,
    name: 'Tariq Hussain',
    timestamp: '2025-11-20T18:00:00',
    date: '20 Nov 2025',
    time: '06:00 PM',
    manual: { companies: 4, contacts: 16, technologies: 8, projects: 2 },
    wizard: { companies: 5, contacts: 19, technologies: 10, projects: 3 },
  },
]

export function UserDataTable() {
  const [sortBy, setSortBy] = useState<SortBy>('time')

  // Get total data for each user
  const getTotalData = (user: UserDataItem) => {
    return {
      companies: user.manual.companies + user.wizard.companies,
      contacts: user.manual.contacts + user.wizard.contacts,
      technologies: user.manual.technologies + user.wizard.technologies,
      projects: user.manual.projects + user.wizard.projects,
    }
  }

  // Calculate total activity for display
  const getTotalActivity = (user: UserDataItem) => {
    const data = getTotalData(user)
    return data.companies + data.contacts + data.technologies + data.projects
  }

  // Sort users based on selected sort option
  const sortedUsers = [...mockUserData].sort((a, b) => {
    if (sortBy === 'time') {
      // Sort by timestamp in ascending order (oldest first)
      const timeA = new Date(a.timestamp).getTime()
      const timeB = new Date(b.timestamp).getTime()
      return timeA - timeB
    } else {
      // Sort by total in descending order (highest first)
      const totalA = getTotalActivity(a)
      const totalB = getTotalActivity(b)
      return totalB - totalA // Descending order (highest to lowest)
    }
  })

  const handleSortToggle = () => {
    setSortBy(sortBy === 'time' ? 'total' : 'time')
  }

  return (
    <Card className="border-border h-full flex flex-col w-full">
      <div className="p-6 flex flex-col flex-1 min-h-0">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-foreground">User Data Activity</h3>
        </div>
        <div className="flex-1 overflow-y-auto overflow-x-hidden [&_div[data-slot='table-container']]:overflow-x-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-foreground font-semibold">User Name</TableHead>
                <TableHead className="text-foreground font-semibold">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Date & Time
                  </div>
                </TableHead>
                <TableHead className="text-foreground font-semibold text-right">
                  Companies
                </TableHead>
                <TableHead className="text-foreground font-semibold text-right">
                  Contacts
                </TableHead>
                <TableHead className="text-foreground font-semibold text-right">
                  Technologies
                </TableHead>
                <TableHead className="text-foreground font-semibold text-right">
                  Projects
                </TableHead>
                <TableHead className="text-foreground font-semibold text-right">
                  <button
                    onClick={handleSortToggle}
                    className="flex items-center gap-2 hover:opacity-70 transition-opacity ml-auto"
                  >
                    Total
                    {sortBy === 'total' ? (
                      <ArrowDown className="w-4 h-4" />
                    ) : (
                      <ArrowUpDown className="w-4 h-4 opacity-50" />
                    )}
                  </button>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedUsers.map((user) => {
                const data = getTotalData(user)
                const total = data.companies + data.contacts + data.technologies + data.projects
                return (
                  <TableRow key={user.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium text-foreground">{user.name}</TableCell>
                    <TableCell className="text-foreground">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">{user.date}</span>
                        <span className="text-xs text-muted-foreground">{user.time}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right text-foreground">{data.companies}</TableCell>
                    <TableCell className="text-right text-foreground">{data.contacts}</TableCell>
                    <TableCell className="text-right text-foreground">
                      {data.technologies}
                    </TableCell>
                    <TableCell className="text-right text-foreground">{data.projects}</TableCell>
                    <TableCell className="text-right text-foreground font-semibold">
                      {total}
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </Card>
  )
}
