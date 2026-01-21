'use client'

import { useState } from 'react'
import { Sidebar } from '@/components/sidebar'
import { StatCards } from '@/components/stat-cards'
import { RecentActivity } from '@/components/recent-activity'
import { UserDataTable } from '@/components/user-data-table'
import { Header } from '@/components/header'
import { UserDetailsModal } from '@/components/user-details-modal'
import { UserDataDetailsModal } from '@/components/user-data-details-modal'
import { PTTeamMembersTable, ptMemberContactsData, ptMemberCompaniesData } from '@/components/activity-charts'

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

export default function Dashboard() {
  const [selectedCard, setSelectedCard] = useState<string | null>(null)
  const [selectedUsers, setSelectedUsers] = useState<any[]>([])
  const [selectedUserData, setSelectedUserData] = useState<UserDataItem | null>(null)
  const [selectedPTMember, setSelectedPTMember] = useState<string | null>(null)
  const [userContacts, setUserContacts] = useState<ContactData[]>([])
  const [userCompanies, setUserCompanies] = useState<CompanyData[]>([])

  const handleCardClick = (cardType: string, users: any[]) => {
    setSelectedCard(cardType)
    setSelectedUsers(users)
  }

  const handleUserClick = (user: UserDataItem) => {
    setSelectedUserData(user)
    // Get contacts and companies data for this user
    // In a real app, this would come from an API
    setUserContacts(userContactsData[user.ptTeamMember] || [])
    setUserCompanies(userCompaniesData[user.ptTeamMember] || [])
  }

  const handlePTMemberClick = (userName: string) => {
    setSelectedPTMember(userName)
    setSelectedUserData(null) // Close other modal
    // Get contacts and companies data for this PT member
    setUserContacts(ptMemberContactsData[userName] || [])
    setUserCompanies(ptMemberCompaniesData[userName] || [])
  }

  // Mock data - same as in user-data-table.tsx
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
    'Ayesha Sheikh': [
      { id: 1, firstName: 'Chris', lastName: 'White', company: 'RetailMax Group', department: 'Operations', businessEmail: 'chris.white@retailmax.com' },
      { id: 2, firstName: 'Laura', lastName: 'Martin', company: 'RetailMax Group', department: 'Sales', businessEmail: 'laura.martin@retailmax.com' },
    ],
    'Bilal Ahmed': [
      { id: 1, firstName: 'Daniel', lastName: 'Harris', company: 'ManufacturePro Co.', department: 'Production', businessEmail: 'daniel.harris@manufacturepro.com' },
      { id: 2, firstName: 'Nancy', lastName: 'Thompson', company: 'ManufacturePro Co.', department: 'Quality', businessEmail: 'nancy.thompson@manufacturepro.com' },
    ],
    'Usman Iqbal': [
      { id: 1, firstName: 'Paul', lastName: 'Robinson', company: 'EnergySolutions Corp.', department: 'Engineering', businessEmail: 'paul.robinson@energysolutions.com' },
      { id: 2, firstName: 'Kelly', lastName: 'Clark', company: 'EnergySolutions Corp.', department: 'Sales', businessEmail: 'kelly.clark@energysolutions.com' },
    ],
    'Sana Mirza': [
      { id: 1, firstName: 'George', lastName: 'Rodriguez', company: 'EduTech Academy', department: 'Teaching', businessEmail: 'george.rodriguez@edutech.com' },
      { id: 2, firstName: 'Cynthia', lastName: 'Lewis', company: 'EduTech Academy', department: 'Admin', businessEmail: 'cynthia.lewis@edutech.com' },
    ],
    'Omar Butt': [
      { id: 1, firstName: 'Edward', lastName: 'Walker', company: 'PropertyDevelopers LLC', department: 'Real Estate', businessEmail: 'edward.walker@propertydev.com' },
    ],
    'Tariq Hussain': [
      { id: 1, firstName: 'Henry', lastName: 'Hall', company: 'TransportLogistics Ltd.', department: 'Logistics', businessEmail: 'henry.hall@transportlogistics.com' },
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
    'Ayesha Sheikh': [
      { id: 1, companyName: 'RetailMax Group', region: 'Europe', industry: 'Retail', revenueRange: '$50M-$100M', employeesRange: '500-1000' },
    ],
    'Bilal Ahmed': [
      { id: 1, companyName: 'ManufacturePro Co.', region: 'Asia', industry: 'Manufacturing', revenueRange: '$100M-$500M', employeesRange: '1000-5000' },
    ],
    'Usman Iqbal': [
      { id: 1, companyName: 'EnergySolutions Corp.', region: 'North America', industry: 'Energy', revenueRange: '$500M-$1B', employeesRange: '5000+' },
    ],
    'Sana Mirza': [
      { id: 1, companyName: 'EduTech Academy', region: 'Europe', industry: 'Education', revenueRange: '$10M-$50M', employeesRange: '100-500' },
    ],
    'Omar Butt': [
      { id: 1, companyName: 'PropertyDevelopers LLC', region: 'North America', industry: 'Real Estate', revenueRange: '$50M-$100M', employeesRange: '500-1000' },
    ],
    'Tariq Hussain': [
      { id: 1, companyName: 'TransportLogistics Ltd.', region: 'Europe', industry: 'Transportation', revenueRange: '$100M-$500M', employeesRange: '1000-5000' },
    ],
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <div className="flex-1 overflow-auto">
          <main className="p-8 max-w-7xl mx-auto w-full">
            <StatCards onCardClick={handleCardClick} />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8 items-stretch w-full">
              <div className="lg:col-span-2 flex w-full">
                <UserDataTable onUserClick={handleUserClick} />
              </div>
              <div className="flex w-full">
                <RecentActivity />
              </div>
            </div>
            <div className="mt-8 w-full">
              <PTTeamMembersTable onUserClick={handlePTMemberClick} />
            </div>
          </main>
        </div>
      </div>

      {selectedCard && (
        <UserDetailsModal
          isOpen={!!selectedCard}
          onClose={() => setSelectedCard(null)}
          cardType={selectedCard}
          users={selectedUsers}
        />
      )}

      <UserDataDetailsModal
        isOpen={!!selectedUserData || !!selectedPTMember}
        onClose={() => {
          setSelectedUserData(null)
          setSelectedPTMember(null)
        }}
        user={selectedUserData}
        userName={selectedPTMember}
        contacts={userContacts}
        companies={userCompanies}
      />
    </div>
  )
}
