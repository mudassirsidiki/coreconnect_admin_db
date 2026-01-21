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
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react'

// Daily Activity Trend - Companies and Contacts added over time
const dailyActivityData = [
  { date: '15 Nov', companies: 12, contacts: 45 },
  { date: '16 Nov', companies: 8, contacts: 32 },
  { date: '17 Nov', companies: 15, contacts: 58 },
  { date: '18 Nov', companies: 6, contacts: 22 },
  { date: '19 Nov', companies: 10, contacts: 38 },
  { date: '20 Nov', companies: 18, contacts: 65 },
  { date: '21 Nov', companies: 11, contacts: 42 },
  { date: '22 Nov', companies: 13, contacts: 48 },
  { date: '23 Nov', companies: 9, contacts: 38 },
  { date: '24 Nov', companies: 16, contacts: 60 },
  { date: '25 Nov', companies: 9, contacts: 35 },
]

// PT Team Members Data - Aggregated from user data
const ptTeamMembersData = [
  { name: 'Zainab Raza', companies: 18, contacts: 65 },
  { name: 'Hira Abbas', companies: 16, contacts: 60 },
  { name: 'Hassan Malik', companies: 15, contacts: 58 },
  { name: 'Sana Mirza', companies: 13, contacts: 48 },
  { name: 'Ahmed Ali', companies: 12, contacts: 45 },
  { name: 'Usman Iqbal', companies: 11, contacts: 42 },
  { name: 'Bilal Ahmed', companies: 10, contacts: 38 },
  { name: 'Fatima Khan', companies: 8, contacts: 32 },
  { name: 'Omar Butt', companies: 9, contacts: 38 },
  { name: 'Tariq Hussain', companies: 9, contacts: 35 },
  { name: 'Ayesha Sheikh', companies: 6, contacts: 22 },
  { name: 'Mohammad Ali', companies: 14, contacts: 52 },
  { name: 'Ayesha Rahman', companies: 12, contacts: 48 },
  { name: 'Omar Sheikh', companies: 11, contacts: 44 },
  { name: 'Zainab Ali', companies: 10, contacts: 40 },
  { name: 'Usman Khan', companies: 13, contacts: 50 },
  { name: 'Hira Malik', companies: 15, contacts: 55 },
  { name: 'Tariq Ahmed', companies: 9, contacts: 36 },
  { name: 'Fatima Hussain', companies: 11, contacts: 42 },
  { name: 'Hassan Raza', companies: 8, contacts: 30 },
  { name: 'Ayesha Iqbal', companies: 12, contacts: 46 },
  { name: 'Mohammad Hassan', companies: 16, contacts: 58 },
]

type SortField = 'companies' | 'contacts' | null
type SortDirection = 'asc' | 'desc' | null

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

interface PTMember {
  name: string
  companies: number
  contacts: number
}

interface PTTeamMembersTableProps {
  onUserClick?: (userName: string) => void
}

// Mock contacts data for PT team members
const ptMemberContactsData: Record<string, ContactData[]> = {
  'Ahmed Ali': [
    { id: 1, firstName: 'John', lastName: 'Smith', company: 'TechCorp Inc.', department: 'Engineering', businessEmail: 'john.smith@techcorp.com' },
    { id: 2, firstName: 'Sarah', lastName: 'Johnson', company: 'TechCorp Inc.', department: 'Sales', businessEmail: 'sarah.johnson@techcorp.com' },
    { id: 3, firstName: 'Michael', lastName: 'Williams', company: 'InnovateTech', department: 'Marketing', businessEmail: 'm.williams@innovatetech.com' },
    { id: 4, firstName: 'Emily', lastName: 'Brown', company: 'DataFlow Solutions', department: 'HR', businessEmail: 'emily.brown@dataflow.com' },
    { id: 5, firstName: 'David', lastName: 'Lee', company: 'TechCorp Inc.', department: 'Finance', businessEmail: 'david.lee@techcorp.com' },
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
  'Hassan Malik': [
    { id: 1, firstName: 'James', lastName: 'Taylor', company: 'FinanceGlobal Ltd.', department: 'Trading', businessEmail: 'james.taylor@financeglobal.com' },
    { id: 2, firstName: 'Amanda', lastName: 'Anderson', company: 'FinanceGlobal Ltd.', department: 'Banking', businessEmail: 'a.amanda@financeglobal.com' },
    { id: 3, firstName: 'Daniel', lastName: 'Thomas', company: 'InvestPro', department: 'Investment', businessEmail: 'daniel.thomas@investpro.com' },
    { id: 4, firstName: 'Lisa', lastName: 'Martinez', company: 'FinanceGlobal Ltd.', department: 'Compliance', businessEmail: 'lisa.martinez@financeglobal.com' },
  ],
  'Sana Mirza': [
    { id: 1, firstName: 'George', lastName: 'Rodriguez', company: 'EduTech Academy', department: 'Teaching', businessEmail: 'george.rodriguez@edutech.com' },
    { id: 2, firstName: 'Cynthia', lastName: 'Lewis', company: 'EduTech Academy', department: 'Admin', businessEmail: 'cynthia.lewis@edutech.com' },
  ],
  'Usman Iqbal': [
    { id: 1, firstName: 'Paul', lastName: 'Robinson', company: 'EnergySolutions Corp.', department: 'Engineering', businessEmail: 'paul.robinson@energysolutions.com' },
    { id: 2, firstName: 'Kelly', lastName: 'Clark', company: 'EnergySolutions Corp.', department: 'Sales', businessEmail: 'kelly.clark@energysolutions.com' },
  ],
  'Bilal Ahmed': [
    { id: 1, firstName: 'Daniel', lastName: 'Harris', company: 'ManufacturePro Co.', department: 'Production', businessEmail: 'daniel.harris@manufacturepro.com' },
    { id: 2, firstName: 'Nancy', lastName: 'Thompson', company: 'ManufacturePro Co.', department: 'Quality', businessEmail: 'nancy.thompson@manufacturepro.com' },
  ],
  'Fatima Khan': [
    { id: 1, firstName: 'Robert', lastName: 'Davis', company: 'MedHealth Solutions', department: 'Medical', businessEmail: 'r.davis@medhealth.com' },
    { id: 2, firstName: 'Jennifer', lastName: 'Miller', company: 'MedHealth Solutions', department: 'Nursing', businessEmail: 'j.miller@medhealth.com' },
    { id: 3, firstName: 'William', lastName: 'Wilson', company: 'HealthTech Ltd', department: 'Research', businessEmail: 'william.wilson@healthtech.com' },
  ],
  'Omar Butt': [
    { id: 1, firstName: 'Edward', lastName: 'Walker', company: 'PropertyDevelopers LLC', department: 'Real Estate', businessEmail: 'edward.walker@propertydev.com' },
  ],
  'Tariq Hussain': [
    { id: 1, firstName: 'Henry', lastName: 'Hall', company: 'TransportLogistics Ltd.', department: 'Logistics', businessEmail: 'henry.hall@transportlogistics.com' },
  ],
  'Ayesha Sheikh': [
    { id: 1, firstName: 'Chris', lastName: 'White', company: 'RetailMax Group', department: 'Operations', businessEmail: 'chris.white@retailmax.com' },
    { id: 2, firstName: 'Laura', lastName: 'Martin', company: 'RetailMax Group', department: 'Sales', businessEmail: 'laura.martin@retailmax.com' },
  ],
  'Mohammad Ali': [
    { id: 1, firstName: 'Steve', lastName: 'Adams', company: 'GlobalTech', department: 'Sales', businessEmail: 'steve.adams@globaltech.com' },
    { id: 2, firstName: 'Rachel', lastName: 'Green', company: 'GlobalTech', department: 'Marketing', businessEmail: 'rachel.green@globaltech.com' },
  ],
  'Ayesha Rahman': [
    { id: 1, firstName: 'Tom', lastName: 'Brown', company: 'SoftServe', department: 'Engineering', businessEmail: 'tom.brown@softserve.com' },
  ],
  'Omar Sheikh': [
    { id: 1, firstName: 'Lisa', lastName: 'Wilson', company: 'DataDrive', department: 'Analytics', businessEmail: 'lisa.wilson@datadrive.com' },
  ],
  'Zainab Ali': [
    { id: 1, firstName: 'Mark', lastName: 'Taylor', company: 'CloudFirst', department: 'DevOps', businessEmail: 'mark.taylor@cloudfirst.com' },
  ],
  'Usman Khan': [
    { id: 1, firstName: 'Sophie', lastName: 'Moore', company: 'TechStart', department: 'Product', businessEmail: 'sophie.moore@techstart.com' },
  ],
  'Hira Malik': [
    { id: 1, firstName: 'Jason', lastName: 'Clark', company: 'InnovateLab', department: 'R&D', businessEmail: 'jason.clark@innovatelab.com' },
  ],
  'Tariq Ahmed': [
    { id: 1, firstName: 'Amy', lastName: 'Lewis', company: 'NetWorks', department: 'IT', businessEmail: 'amy.lewis@networks.com' },
  ],
  'Fatima Hussain': [
    { id: 1, firstName: 'David', lastName: 'Walker', company: 'SecureData', department: 'Security', businessEmail: 'david.walker@securedata.com' },
  ],
  'Hassan Raza': [
    { id: 1, firstName: 'Emma', lastName: 'Hall', company: 'FinTech Plus', department: 'Finance', businessEmail: 'emma.hall@fintechplus.com' },
  ],
  'Ayesha Iqbal': [
    { id: 1, firstName: 'Chris', lastName: 'Young', company: 'MediaMax', department: 'Creative', businessEmail: 'chris.young@mediamax.com' },
  ],
  'Mohammad Hassan': [
    { id: 1, firstName: 'Daniel', lastName: 'King', company: 'PrimeTech', department: 'Engineering', businessEmail: 'daniel.king@primetech.com' },
    { id: 2, firstName: 'Sophia', lastName: 'Scott', company: 'PrimeTech', department: 'Sales', businessEmail: 'sophia.scott@primetech.com' },
  ],
}

const ptMemberCompaniesData: Record<string, CompanyData[]> = {
  'Ahmed Ali': [
    { id: 1, companyName: 'TechCorp Inc.', region: 'North America', industry: 'Technology', revenueRange: '$10M-$50M', employeesRange: '100-500' },
    { id: 2, companyName: 'InnovateTech', region: 'North America', industry: 'Software', revenueRange: '$5M-$10M', employeesRange: '50-100' },
    { id: 3, companyName: 'DataFlow Solutions', region: 'Europe', industry: 'Data Analytics', revenueRange: '$1M-$5M', employeesRange: '20-50' },
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
  'Hassan Malik': [
    { id: 1, companyName: 'FinanceGlobal Ltd.', region: 'North America', industry: 'Finance', revenueRange: '$100M-$500M', employeesRange: '1000-5000' },
    { id: 2, companyName: 'InvestPro', region: 'Europe', industry: 'Investment', revenueRange: '$50M-$100M', employeesRange: '500-1000' },
  ],
  'Sana Mirza': [
    { id: 1, companyName: 'EduTech Academy', region: 'Europe', industry: 'Education', revenueRange: '$10M-$50M', employeesRange: '100-500' },
  ],
  'Usman Iqbal': [
    { id: 1, companyName: 'EnergySolutions Corp.', region: 'North America', industry: 'Energy', revenueRange: '$500M-$1B', employeesRange: '5000+' },
  ],
  'Bilal Ahmed': [
    { id: 1, companyName: 'ManufacturePro Co.', region: 'Asia', industry: 'Manufacturing', revenueRange: '$100M-$500M', employeesRange: '1000-5000' },
  ],
  'Fatima Khan': [
    { id: 1, companyName: 'MedHealth Solutions', region: 'North America', industry: 'Healthcare', revenueRange: '$50M-$100M', employeesRange: '500-1000' },
    { id: 2, companyName: 'HealthTech Ltd', region: 'Europe', industry: 'Healthcare', revenueRange: '$10M-$50M', employeesRange: '100-500' },
  ],
  'Omar Butt': [
    { id: 1, companyName: 'PropertyDevelopers LLC', region: 'North America', industry: 'Real Estate', revenueRange: '$50M-$100M', employeesRange: '500-1000' },
  ],
  'Tariq Hussain': [
    { id: 1, companyName: 'TransportLogistics Ltd.', region: 'Europe', industry: 'Transportation', revenueRange: '$100M-$500M', employeesRange: '1000-5000' },
  ],
  'Ayesha Sheikh': [
    { id: 1, companyName: 'RetailMax Group', region: 'Europe', industry: 'Retail', revenueRange: '$50M-$100M', employeesRange: '500-1000' },
  ],
  'Mohammad Ali': [
    { id: 1, companyName: 'GlobalTech', region: 'North America', industry: 'Technology', revenueRange: '$100M-$500M', employeesRange: '1000-5000' },
  ],
  'Ayesha Rahman': [
    { id: 1, companyName: 'SoftServe', region: 'Europe', industry: 'Software', revenueRange: '$10M-$50M', employeesRange: '100-500' },
  ],
  'Omar Sheikh': [
    { id: 1, companyName: 'DataDrive', region: 'Asia', industry: 'Data Analytics', revenueRange: '$5M-$10M', employeesRange: '50-100' },
  ],
  'Zainab Ali': [
    { id: 1, companyName: 'CloudFirst', region: 'North America', industry: 'Cloud Services', revenueRange: '$50M-$100M', employeesRange: '500-1000' },
  ],
  'Usman Khan': [
    { id: 1, companyName: 'TechStart', region: 'Asia', industry: 'Technology', revenueRange: '$1M-$5M', employeesRange: '20-50' },
  ],
  'Hira Malik': [
    { id: 1, companyName: 'InnovateLab', region: 'Europe', industry: 'R&D', revenueRange: '$10M-$50M', employeesRange: '100-500' },
  ],
  'Tariq Ahmed': [
    { id: 1, companyName: 'NetWorks', region: 'North America', industry: 'IT Services', revenueRange: '$5M-$10M', employeesRange: '50-100' },
  ],
  'Fatima Hussain': [
    { id: 1, companyName: 'SecureData', region: 'Europe', industry: 'Cybersecurity', revenueRange: '$10M-$50M', employeesRange: '100-500' },
  ],
  'Hassan Raza': [
    { id: 1, companyName: 'FinTech Plus', region: 'Asia', industry: 'Finance', revenueRange: '$50M-$100M', employeesRange: '500-1000' },
  ],
  'Ayesha Iqbal': [
    { id: 1, companyName: 'MediaMax', region: 'North America', industry: 'Media', revenueRange: '$5M-$10M', employeesRange: '50-100' },
  ],
  'Mohammad Hassan': [
    { id: 1, companyName: 'PrimeTech', region: 'North America', industry: 'Technology', revenueRange: '$100M-$500M', employeesRange: '1000-5000' },
  ],
}

export { ptMemberContactsData, ptMemberCompaniesData }
export type { ContactData, CompanyData }

export function ActivityCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8 w-full">
      {/* Daily Activity Trend */}
      <Card className="border-border p-6 w-full">
        <h3 className="text-lg font-semibold text-foreground mb-4">Daily Activity Trend</h3>
        <p className="text-xs text-muted-foreground mb-4">
          Companies and Contacts added over the past 11 days
        </p>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={dailyActivityData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="date" 
              stroke="var(--color-muted-foreground)" 
              tick={{ fontSize: 12 }}
            />
            <YAxis stroke="var(--color-muted-foreground)" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--color-card)',
                border: '1px solid var(--color-border)',
              }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="companies" 
              stroke="#8b5cf6" 
              strokeWidth={2} 
              dot={{ r: 4 }} 
              name="Companies Added"
            />
            <Line 
              type="monotone" 
              dataKey="contacts" 
              stroke="#3b82f6" 
              strokeWidth={2} 
              dot={{ r: 4 }} 
              name="Contacts Added"
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* PT Team Members Table */}
      <PTTeamMembersTable />
    </div>
  )
}

export function PTTeamMembersTable({ onUserClick }: PTTeamMembersTableProps) {
  const [sortField, setSortField] = useState<SortField>(null)
  const [sortDirection, setSortDirection] = useState<SortDirection>(null)

  const handleSort = (field: 'companies' | 'contacts') => {
    if (sortField === field) {
      // Toggle direction if same field
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      // New field, start with descending
      setSortField(field)
      setSortDirection('desc')
    }
  }

  // Sort the data
  const sortedData = [...ptTeamMembersData].sort((a, b) => {
    if (!sortField || !sortDirection) return 0

    const aValue = a[sortField]
    const bValue = b[sortField]

    if (sortDirection === 'asc') {
      return aValue - bValue
    } else {
      return bValue - aValue
    }
  })

  const getSortIcon = (field: 'companies' | 'contacts') => {
    if (sortField !== field) {
      return <ArrowUpDown className="w-4 h-4 opacity-50" />
    }
    return sortDirection === 'asc' ? (
      <ArrowUp className="w-4 h-4" />
    ) : (
      <ArrowDown className="w-4 h-4" />
    )
  }

  return (
    <Card className="border-border p-6 w-full flex flex-col h-full">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground mb-2">PT Team Members</h3>
        <p className="text-xs text-muted-foreground">
          All team members with their companies and contacts added
        </p>
      </div>
      <div className="flex-1 overflow-y-auto overflow-x-hidden max-h-[400px]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-foreground font-semibold">PT Team Member</TableHead>
              <TableHead className="text-foreground font-semibold text-center">
                <button
                  onClick={() => handleSort('companies')}
                  className="flex items-center gap-2 hover:opacity-70 transition-opacity mx-auto"
                >
                  Companies Added
                  {getSortIcon('companies')}
                </button>
              </TableHead>
              <TableHead className="text-foreground font-semibold text-center">
                <button
                  onClick={() => handleSort('contacts')}
                  className="flex items-center gap-2 hover:opacity-70 transition-opacity mx-auto"
                >
                  Contacts Added
                  {getSortIcon('contacts')}
                </button>
              </TableHead>
              <TableHead className="text-foreground font-semibold text-center">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedData.map((member, index) => (
              <TableRow
                key={index}
                className={`hover:bg-muted/50 ${onUserClick ? 'cursor-pointer' : ''}`}
                onClick={() => onUserClick?.(member.name)}
              >
                <TableCell className="font-medium text-foreground">{member.name}</TableCell>
                <TableCell className="text-center text-foreground">{member.companies}</TableCell>
                <TableCell className="text-center text-foreground">{member.contacts}</TableCell>
                <TableCell className="text-center text-foreground font-semibold">
                  {member.companies + member.contacts}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  )
}
