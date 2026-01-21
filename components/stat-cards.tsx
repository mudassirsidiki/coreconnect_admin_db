'use client'

import { Card } from '@/components/ui/card'
import { Users, Shield, Building2, Contact, FolderKanban } from 'lucide-react'

const mockData = {
  totalUsers: [
    { id: 1, name: 'Ahmed Ali', email: 'ahmed.ali@coreconnect.com', status: 'Active' },
    { id: 2, name: 'Fatima Khan', email: 'fatima.khan@coreconnect.com', status: 'Active' },
    { id: 3, name: 'Hassan Malik', email: 'hassan.malik@coreconnect.com', status: 'Active' },
    { id: 4, name: 'Ayesha Sheikh', email: 'ayesha.sheikh@coreconnect.com', status: 'Inactive' },
    { id: 5, name: 'Bilal Ahmed', email: 'bilal.ahmed@coreconnect.com', status: 'Active' },
    { id: 6, name: 'Zainab Raza', email: 'zainab.raza@coreconnect.com', status: 'Active' },
    { id: 7, name: 'Usman Iqbal', email: 'usman.iqbal@coreconnect.com', status: 'Inactive' },
    { id: 8, name: 'Sana Mirza', email: 'sana.mirza@coreconnect.com', status: 'Active' },
    { id: 9, name: 'Omar Butt', email: 'omar.butt@coreconnect.com', status: 'Active' },
    { id: 10, name: 'Hira Abbas', email: 'hira.abbas@coreconnect.com', status: 'Active' },
    { id: 11, name: 'Tariq Hussain', email: 'tariq.hussain@coreconnect.com', status: 'Active' },
    { id: 12, name: 'Amina Khan', email: 'amina.khan@coreconnect.com', status: 'Active' },
    { id: 13, name: 'Faisal Sheikh', email: 'faisal.sheikh@coreconnect.com', status: 'Inactive' },
    { id: 14, name: 'Sara Ali', email: 'sara.ali@coreconnect.com', status: 'Inactive' },
    { id: 15, name: 'Hamza Malik', email: 'hamza.malik@coreconnect.com', status: 'Inactive' },
  ],
  admins: [
    { id: 1, name: 'Ahmed Ali', email: 'ahmed.ali@coreconnect.com' },
    { id: 6, name: 'Zainab Raza', email: 'zainab.raza@coreconnect.com' },
    { id: 16, name: 'Khalid Butt', email: 'khalid.butt@coreconnect.com' },
    { id: 17, name: 'Nida Iqbal', email: 'nida.iqbal@coreconnect.com' },
  ],
  companies: [
    { id: 1, name: 'Tech Solutions Pakistan' },
    { id: 2, name: 'Digital Innovations Ltd' },
    { id: 3, name: 'PakSoft Technologies' },
    { id: 4, name: 'CloudConnect Systems' },
    { id: 5, name: 'DataFlow Solutions' },
    { id: 6, name: 'CodeCraft Pakistan' },
    { id: 7, name: 'InnovateHub Karachi' },
    { id: 8, name: 'SwiftDev Lahore' },
    { id: 9, name: 'ByteBuild Islamabad' },
    { id: 10, name: 'WebWorks Pakistan' },
    { id: 11, name: 'AppSphere Solutions' },
    { id: 12, name: 'DevOps Pakistan' },
    { id: 13, name: 'CyberTech Solutions' },
    { id: 14, name: 'SmartCode Systems' },
    { id: 15, name: 'FutureTech Pakistan' },
  ],
  contacts: [
    { id: 1, name: 'Ahmed Hassan', email: 'ahmed.hassan@email.com' },
    { id: 2, name: 'Fatima Ali', email: 'fatima.ali@email.com' },
    { id: 3, name: 'Hassan Malik', email: 'hassan.malik@email.com' },
    { id: 4, name: 'Ayesha Khan', email: 'ayesha.khan@email.com' },
    { id: 5, name: 'Bilal Ahmed', email: 'bilal.ahmed@email.com' },
    { id: 6, name: 'Zainab Sheikh', email: 'zainab.sheikh@email.com' },
    { id: 7, name: 'Usman Raza', email: 'usman.raza@email.com' },
    { id: 8, name: 'Sana Iqbal', email: 'sana.iqbal@email.com' },
    { id: 9, name: 'Omar Butt', email: 'omar.butt@email.com' },
    { id: 10, name: 'Hira Abbas', email: 'hira.abbas@email.com' },
    { id: 11, name: 'Tariq Hussain', email: 'tariq.hussain@email.com' },
    { id: 12, name: 'Amina Khan', email: 'amina.khan@email.com' },
    { id: 13, name: 'Faisal Sheikh', email: 'faisal.sheikh@email.com' },
    { id: 14, name: 'Sara Ali', email: 'sara.ali@email.com' },
    { id: 15, name: 'Hamza Malik', email: 'hamza.malik@email.com' },
  ],
  projects: [
    { id: 1, name: 'E-Commerce Platform' },
    { id: 2, name: 'Healthcare Management System' },
    { id: 3, name: 'School Management Portal' },
    { id: 4, name: 'Banking Application' },
    { id: 5, name: 'Real Estate Portal' },
    { id: 6, name: 'Food Delivery App' },
    { id: 7, name: 'Inventory Management' },
    { id: 8, name: 'CRM System' },
    { id: 9, name: 'HR Management System' },
    { id: 10, name: 'E-Learning Platform' },
    { id: 11, name: 'Social Media App' },
    { id: 12, name: 'Fitness Tracker' },
    { id: 13, name: 'Weather App' },
    { id: 14, name: 'News Aggregator' },
    { id: 15, name: 'Task Management Tool' },
  ],
  technologies: [
    { id: 1, name: 'React' },
    { id: 2, name: 'Node.js' },
    { id: 3, name: 'Python' },
    { id: 4, name: 'JavaScript' },
    { id: 5, name: 'TypeScript' },
    { id: 6, name: 'Next.js' },
    { id: 7, name: 'MongoDB' },
    { id: 8, name: 'PostgreSQL' },
    { id: 9, name: 'Docker' },
    { id: 10, name: 'Kubernetes' },
    { id: 11, name: 'AWS' },
    { id: 12, name: 'Azure' },
    { id: 13, name: 'GraphQL' },
    { id: 14, name: 'Redis' },
    { id: 15, name: 'Elasticsearch' },
  ],
}

export function StatCards({ onCardClick }: { onCardClick: (type: string, data: any[]) => void }) {
  return (
    <div className="flex flex-wrap gap-4">
      {/* Total Users Card */}
      <Card
        className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-4 cursor-pointer hover:shadow-lg transition-all hover:scale-105 border-0 flex-1 min-w-[150px]"
        onClick={() => onCardClick('Total Users', mockData.totalUsers)}
      >
        <div className="flex items-center justify-between mb-2">
          <div>
            <p className="text-purple-100 text-xs mb-1">Total Users</p>
            <h3 className="text-2xl font-bold">{mockData.totalUsers.length}</h3>
          </div>
          <div className="bg-white/20 p-2 rounded-lg">
            <Users className="w-5 h-5" />
          </div>
        </div>
        <p className="text-purple-100 text-xs">Name, Email, Status</p>
      </Card>

      {/* Admins Card */}
      <Card
        className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-4 cursor-pointer hover:shadow-lg transition-all hover:scale-105 border-0 flex-1 min-w-[150px]"
        onClick={() => onCardClick('Admins', mockData.admins)}
      >
        <div className="flex items-center justify-between mb-2">
          <div>
            <p className="text-blue-100 text-xs mb-1">Admins</p>
            <h3 className="text-2xl font-bold">{mockData.admins.length}</h3>
          </div>
          <div className="bg-white/20 p-2 rounded-lg">
            <Shield className="w-5 h-5" />
          </div>
        </div>
        <p className="text-blue-100 text-xs">Admin Name, Email</p>
      </Card>

      {/* Companies Card */}
      <Card
        className="bg-gradient-to-br from-green-500 to-green-600 text-white p-4 border-0 flex-1 min-w-[150px]"
      >
        <div className="flex items-center justify-between mb-2">
          <div>
            <p className="text-green-100 text-xs mb-1">Companies</p>
            <h3 className="text-2xl font-bold">{mockData.companies.length}</h3>
          </div>
          <div className="bg-white/20 p-2 rounded-lg">
            <Building2 className="w-5 h-5" />
          </div>
        </div>
        <p className="text-green-100 text-xs">Total companies</p>
      </Card>

      {/* Contacts Card */}
      <Card
        className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-4 border-0 flex-1 min-w-[150px]"
      >
        <div className="flex items-center justify-between mb-2">
          <div>
            <p className="text-orange-100 text-xs mb-1">Contacts</p>
            <h3 className="text-2xl font-bold">{mockData.contacts.length}</h3>
          </div>
          <div className="bg-white/20 p-2 rounded-lg">
            <Contact className="w-5 h-5" />
          </div>
        </div>
        <p className="text-orange-100 text-xs">Total contacts</p>
      </Card>

      {/* Projects Card */}
      <Card
        className="bg-gradient-to-br from-pink-500 to-pink-600 text-white p-4 border-0 flex-1 min-w-[150px]"
      >
        <div className="flex items-center justify-between mb-2">
          <div>
            <p className="text-pink-100 text-xs mb-1">Projects</p>
            <h3 className="text-2xl font-bold">{mockData.projects.length}</h3>
          </div>
          <div className="bg-white/20 p-2 rounded-lg">
            <FolderKanban className="w-5 h-5" />
          </div>
        </div>
        <p className="text-pink-100 text-xs">Total projects</p>
      </Card>
    </div>
  )
}
