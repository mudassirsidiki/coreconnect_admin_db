'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

type ImportMethod = 'total' | 'manual' | 'wizard'

interface UserDataItem {
  id: number
  name: string
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
    name: 'John Doe',
    manual: { companies: 5, contacts: 20, technologies: 10, projects: 3 },
    wizard: { companies: 7, contacts: 25, technologies: 13, projects: 5 },
  },
  {
    id: 2,
    name: 'Jane Smith',
    manual: { companies: 3, contacts: 15, technologies: 8, projects: 2 },
    wizard: { companies: 5, contacts: 17, technologies: 7, projects: 3 },
  },
  {
    id: 3,
    name: 'Mike Johnson',
    manual: { companies: 8, contacts: 30, technologies: 18, projects: 6 },
    wizard: { companies: 7, contacts: 28, technologies: 13, projects: 6 },
  },
  {
    id: 4,
    name: 'Sarah Williams',
    manual: { companies: 2, contacts: 10, technologies: 5, projects: 1 },
    wizard: { companies: 4, contacts: 12, technologies: 5, projects: 2 },
  },
  {
    id: 5,
    name: 'Tom Brown',
    manual: { companies: 4, contacts: 18, technologies: 9, projects: 3 },
    wizard: { companies: 6, contacts: 20, technologies: 10, projects: 4 },
  },
  {
    id: 6,
    name: 'Emma Davis',
    manual: { companies: 10, contacts: 35, technologies: 25, projects: 8 },
    wizard: { companies: 8, contacts: 30, technologies: 17, projects: 7 },
  },
  {
    id: 8,
    name: 'Lisa Anderson',
    manual: { companies: 6, contacts: 22, technologies: 12, projects: 4 },
    wizard: { companies: 5, contacts: 20, technologies: 10, projects: 3 },
  },
  {
    id: 9,
    name: 'Chris Taylor',
    manual: { companies: 7, contacts: 25, technologies: 14, projects: 5 },
    wizard: { companies: 6, contacts: 23, technologies: 12, projects: 4 },
  },
  {
    id: 10,
    name: 'Rachel Martinez',
    manual: { companies: 5, contacts: 20, technologies: 11, projects: 3 },
    wizard: { companies: 4, contacts: 18, technologies: 9, projects: 2 },
  },
  {
    id: 11,
    name: 'David Lee',
    manual: { companies: 9, contacts: 32, technologies: 19, projects: 7 },
    wizard: { companies: 7, contacts: 28, technologies: 15, projects: 5 },
  },
  {
    id: 12,
    name: 'Sophia Chen',
    manual: { companies: 4, contacts: 16, technologies: 8, projects: 2 },
    wizard: { companies: 5, contacts: 19, technologies: 10, projects: 3 },
  },
]

export function UserDataTable() {
  const [filterMethod, setFilterMethod] = useState<ImportMethod>('total')

  const getDataForMethod = (user: UserDataItem, method: ImportMethod) => {
    if (method === 'total') {
      return {
        companies: user.manual.companies + user.wizard.companies,
        contacts: user.manual.contacts + user.wizard.contacts,
        technologies: user.manual.technologies + user.wizard.technologies,
        projects: user.manual.projects + user.wizard.projects,
      }
    } else if (method === 'manual') {
      return user.manual
    } else {
      return user.wizard
    }
  }

  // Calculate total activity for sorting
  const getTotalActivity = (user: UserDataItem, method: ImportMethod) => {
    const data = getDataForMethod(user, method)
    return data.companies + data.contacts + data.technologies + data.projects
  }

  // Sort users by total activity in descending order
  const sortedUsers = [...mockUserData].sort((a, b) => {
    const activityA = getTotalActivity(a, filterMethod)
    const activityB = getTotalActivity(b, filterMethod)
    return activityB - activityA // Descending order
  })

  return (
    <Card className="border-border h-full flex flex-col w-full">
      <div className="p-6 flex flex-col flex-1 min-h-0">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <h3 className="text-lg font-semibold text-foreground">User Data Activity</h3>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm text-muted-foreground">Filter by:</span>
            <Button
              variant={filterMethod === 'total' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterMethod('total')}
            >
              Total
            </Button>
            <Button
              variant={filterMethod === 'manual' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterMethod('manual')}
            >
              Manual
            </Button>
            <Button
              variant={filterMethod === 'wizard' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterMethod('wizard')}
            >
              Import Wizard
            </Button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto overflow-x-hidden [&_div[data-slot='table-container']]:overflow-x-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-foreground font-semibold">User Name</TableHead>
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
                  Total
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedUsers.map((user) => {
                const data = getDataForMethod(user, filterMethod)
                const total = data.companies + data.contacts + data.technologies + data.projects
                return (
                  <TableRow key={user.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium text-foreground">{user.name}</TableCell>
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
