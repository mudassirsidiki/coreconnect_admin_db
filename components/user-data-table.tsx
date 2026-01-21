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
  ptTeamMember: string
  addedBy: string
  companiesAdded: number
  contactsAdded: number
  industry: string
  region: string
  dateAdded: string
  clientName: string
}

interface ContactData {
  id: number
  firstName: string
  lastName: string
  company: string
  department: string
  businessEmail: string
}

interface CompanyData {
  id: number
  companyName: string
  region: string
  industry: string
  revenueRange: string
  employeesRange: string
}

interface UserDataTableProps {
  onUserClick?: (user: UserDataItem) => void
}

// Mock contacts and companies data for each user
const userContactsData: Record<string, ContactData[]> = {
  'Ahmed Ali': [
    { id: 1, firstName: 'John', lastName: 'Smith', company: 'TechCorp Inc.', department: 'Engineering', businessEmail: 'john.smith@techcorp.com' },
    { id: 2, firstName: 'Sarah', lastName: 'Johnson', company: 'TechCorp Inc.', department: 'Sales', businessEmail: 'sarah.johnson@techcorp.com' },
    { id: 3, firstName: 'Michael', lastName: 'Williams', company: 'InnovateTech', department: 'Marketing', businessEmail: 'm.williams@innovatetech.com' },
    { id: 4, firstName: 'Emily', lastName: 'Brown', company: 'DataFlow Solutions', department: 'HR', businessEmail: 'emily.brown@dataflow.com' },
    { id: 5, firstName: 'David', lastName: 'Lee', company: 'TechCorp Inc.', department: 'Finance', businessEmail: 'david.lee@techcorp.com' },
  ],
  'Fatima Khan': [
    { id: 1, firstName: 'Robert', lastName: 'Davis', company: 'MedHealth Solutions', department: 'Medical', businessEmail: 'r.davis@medhealth.com' },
    { id: 2, firstName: 'Jennifer', lastName: 'Miller', company: 'MedHealth Solutions', department: 'Nursing', businessEmail: 'j.miller@medhealth.com' },
    { id: 3, firstName: 'William', lastName: 'Wilson', company: 'HealthTech Ltd', department: 'Research', businessEmail: 'william.wilson@healthtech.com' },
  ],
  'Hassan Malik': [
    { id: 1, firstName: 'James', lastName: 'Taylor', company: 'FinanceGlobal Ltd.', department: 'Trading', businessEmail: 'james.taylor@financeglobal.com' },
    { id: 2, firstName: 'Amanda', lastName: 'Anderson', company: 'FinanceGlobal Ltd.', department: 'Banking', businessEmail: 'a.amanda@financeglobal.com' },
    { id: 3, firstName: 'Daniel', lastName: 'Thomas', company: 'InvestPro', department: 'Investment', businessEmail: 'daniel.thomas@investpro.com' },
    { id: 4, firstName: 'Lisa', lastName: 'Martinez', company: 'FinanceGlobal Ltd.', department: 'Compliance', businessEmail: 'lisa.martinez@financeglobal.com' },
  ],
  'Zainab Raza': [
    { id: 1, firstName: 'Matthew', lastName: 'Garcia', company: 'InnovateTech Systems', department: 'Development', businessEmail: 'matt.garcia@innovatetech.com' },
    { id: 2, firstName: 'Jessica', lastName: 'Robinson', company: 'InnovateTech Systems', department: 'Design', businessEmail: 'jessica.robinson@innovatetech.com' },
    { id: 3, firstName: 'Ryan', lastName: 'Clark', company: 'CodeCraft', department: 'Engineering', businessEmail: 'ryan.clark@codecraft.com' },
    { id: 4, firstName: 'Sarah', lastName: 'Lewis', company: 'InnovateTech Systems', department: 'Product', businessEmail: 'sarah.lewis@innovatetech.com' },
    { id: 5, firstName: 'Kevin', lastName: 'Walker', company: 'Tech Solutions', department: 'DevOps', businessEmail: 'kevin.walker@techsolutions.com' },
  ],
  'Hira Abbas': [
    { id: 1, firstName: 'Brian', lastName: 'Hall', company: 'TelecomGlobal Inc.', department: 'Network', businessEmail: 'brian.hall@telecomglobal.com' },
    { id: 2, firstName: 'Michelle', lastName: 'Young', company: 'TelecomGlobal Inc.', department: 'Sales', businessEmail: 'michelle.young@telecomglobal.com' },
    { id: 3, firstName: 'Joshua', lastName: 'King', company: 'CommTech', department: 'Engineering', businessEmail: 'joshua.king@commtech.com' },
  ],
}

const userCompaniesData: Record<string, CompanyData[]> = {
  'Ahmed Ali': [
    { id: 1, companyName: 'TechCorp Inc.', region: 'North America', industry: 'Technology', revenueRange: '$10M-$50M', employeesRange: '100-500' },
    { id: 2, companyName: 'InnovateTech', region: 'North America', industry: 'Software', revenueRange: '$5M-$10M', employeesRange: '50-100' },
    { id: 3, companyName: 'DataFlow Solutions', region: 'Europe', industry: 'Data Analytics', revenueRange: '$1M-$5M', employeesRange: '20-50' },
  ],
  'Fatima Khan': [
    { id: 1, companyName: 'MedHealth Solutions', region: 'North America', industry: 'Healthcare', revenueRange: '$50M-$100M', employeesRange: '500-1000' },
    { id: 2, companyName: 'HealthTech Ltd', region: 'Europe', industry: 'Healthcare', revenueRange: '$10M-$50M', employeesRange: '100-500' },
  ],
  'Hassan Malik': [
    { id: 1, companyName: 'FinanceGlobal Ltd.', region: 'North America', industry: 'Finance', revenueRange: '$100M-$500M', employeesRange: '1000-5000' },
    { id: 2, companyName: 'InvestPro', region: 'Europe', industry: 'Investment', revenueRange: '$50M-$100M', employeesRange: '500-1000' },
  ],
  'Zainab Raza': [
    { id: 1, companyName: 'InnovateTech Systems', region: 'North America', industry: 'Technology', revenueRange: '$50M-$100M', employeesRange: '500-1000' },
    { id: 2, companyName: 'CodeCraft', region: 'Asia', industry: 'Software', revenueRange: '$10M-$50M', employeesRange: '100-500' },
    { id: 3, companyName: 'Tech Solutions', region: 'Asia', industry: 'Technology', revenueRange: '$5M-$10M', employeesRange: '50-100' },
  ],
  'Hira Abbas': [
    { id: 1, companyName: 'TelecomGlobal Inc.', region: 'North America', industry: 'Telecommunications', revenueRange: '$500M-$1B', employeesRange: '5000+' },
    { id: 2, companyName: 'CommTech', region: 'Asia', industry: 'Telecommunications', revenueRange: '$10M-$50M', employeesRange: '100-500' },
  ],
}

const mockUserData: UserDataItem[] = [
  {
    id: 1,
    ptTeamMember: 'Ahmed Ali',
    addedBy: 'Mohammad Hassan',
    companiesAdded: 12,
    contactsAdded: 45,
    industry: 'Technology',
    region: 'USA',
    dateAdded: '15 Nov 2025',
    clientName: 'TechCorp Inc.',
  },
  {
    id: 2,
    ptTeamMember: 'Fatima Khan',
    addedBy: 'Ayesha Rahman',
    companiesAdded: 8,
    contactsAdded: 32,
    industry: 'Healthcare',
    region: 'Canada',
    dateAdded: '16 Nov 2025',
    clientName: 'MedHealth Solutions',
  },
  {
    id: 3,
    ptTeamMember: 'Hassan Malik',
    addedBy: 'Omar Sheikh',
    companiesAdded: 15,
    contactsAdded: 58,
    industry: 'Finance',
    region: 'USA',
    dateAdded: '17 Nov 2025',
    clientName: 'FinanceGlobal Ltd.',
  },
  {
    id: 4,
    ptTeamMember: 'Ayesha Sheikh',
    addedBy: 'Zainab Ali',
    companiesAdded: 6,
    contactsAdded: 22,
    industry: 'Retail',
    region: 'Canada',
    dateAdded: '18 Nov 2025',
    clientName: 'RetailMax Group',
  },
  {
    id: 5,
    ptTeamMember: 'Bilal Ahmed',
    addedBy: 'Usman Khan',
    companiesAdded: 10,
    contactsAdded: 38,
    industry: 'Manufacturing',
    region: 'USA',
    dateAdded: '19 Nov 2025',
    clientName: 'ManufacturePro Co.',
  },
  {
    id: 6,
    ptTeamMember: 'Zainab Raza',
    addedBy: 'Hira Malik',
    companiesAdded: 18,
    contactsAdded: 65,
    industry: 'Technology',
    region: 'Canada',
    dateAdded: '20 Nov 2025',
    clientName: 'InnovateTech Systems',
  },
  {
    id: 7,
    ptTeamMember: 'Usman Iqbal',
    addedBy: 'Tariq Ahmed',
    companiesAdded: 11,
    contactsAdded: 42,
    industry: 'Energy',
    region: 'USA',
    dateAdded: '21 Nov 2025',
    clientName: 'EnergySolutions Corp.',
  },
  {
    id: 8,
    ptTeamMember: 'Sana Mirza',
    addedBy: 'Fatima Hussain',
    companiesAdded: 13,
    contactsAdded: 48,
    industry: 'Education',
    region: 'Canada',
    dateAdded: '22 Nov 2025',
    clientName: 'EduTech Academy',
  },
  {
    id: 9,
    ptTeamMember: 'Omar Butt',
    addedBy: 'Hassan Raza',
    companiesAdded: 9,
    contactsAdded: 38,
    industry: 'Real Estate',
    region: 'USA',
    dateAdded: '23 Nov 2025',
    clientName: 'PropertyDevelopers LLC',
  },
  {
    id: 10,
    ptTeamMember: 'Hira Abbas',
    addedBy: 'Ayesha Iqbal',
    companiesAdded: 16,
    contactsAdded: 60,
    industry: 'Telecommunications',
    region: 'Canada',
    dateAdded: '24 Nov 2025',
    clientName: 'TelecomGlobal Inc.',
  },
  {
    id: 11,
    ptTeamMember: 'Tariq Hussain',
    addedBy: 'Mohammad Ali',
    companiesAdded: 9,
    contactsAdded: 35,
    industry: 'Transportation',
    region: 'USA',
    dateAdded: '25 Nov 2025',
    clientName: 'TransportLogistics Ltd.',
  },
]

export function UserDataTable({ onUserClick }: UserDataTableProps) {
  const [sortBy, setSortBy] = useState<SortBy>('time')

  // Sort users based on selected sort option
  const sortedUsers = [...mockUserData].sort((a, b) => {
    if (sortBy === 'time') {
      // Sort by date added in ascending order (oldest first)
      return a.dateAdded.localeCompare(b.dateAdded)
    } else {
      // Sort by total (companies + contacts) in descending order (highest first)
      const totalA = a.companiesAdded + a.contactsAdded
      const totalB = b.companiesAdded + b.contactsAdded
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
        <div className="flex-1 overflow-y-auto overflow-x-auto [&_div[data-slot='table-container']]:overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-foreground font-semibold">PT Team Member</TableHead>
                <TableHead className="text-foreground font-semibold">Client Name</TableHead>
                <TableHead className="text-foreground font-semibold text-center">
                  Companies Added
                </TableHead>
                <TableHead className="text-foreground font-semibold text-center">
                  Contacts Added
                </TableHead>
                <TableHead className="text-foreground font-semibold">Industry</TableHead>
                <TableHead className="text-foreground font-semibold">Region</TableHead>
                <TableHead className="text-foreground font-semibold">
                  <button
                    onClick={handleSortToggle}
                    className="flex items-center gap-2 hover:opacity-70 transition-opacity"
                  >
                    <Clock className="w-4 h-4" />
                    Date Added
                    {sortBy === 'time' ? (
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
                return (
                  <TableRow
                    key={user.id}
                    className={`hover:bg-muted/50 ${onUserClick ? 'cursor-pointer' : ''}`}
                    onClick={() => onUserClick?.(user)}
                  >
                    <TableCell className="font-medium text-foreground">
                      {user.ptTeamMember}
                    </TableCell>
                    <TableCell className="text-foreground">{user.clientName}</TableCell>
                    <TableCell className="text-center text-foreground">
                      {user.companiesAdded}
                    </TableCell>
                    <TableCell className="text-center text-foreground">
                      {user.contactsAdded}
                    </TableCell>
                    <TableCell className="text-foreground">{user.industry}</TableCell>
                    <TableCell className="text-foreground">{user.region}</TableCell>
                    <TableCell className="text-foreground">{user.dateAdded}</TableCell>
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
