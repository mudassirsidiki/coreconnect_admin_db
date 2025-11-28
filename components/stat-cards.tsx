'use client'

import { Card } from '@/components/ui/card'
import { Users, UserCheck, UserX, Shield } from 'lucide-react'

const mockData = {
  totalUsers: [
    { id: 1, name: 'John Doe', email: 'john.doe@coreconnect.com', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@coreconnect.com', role: 'User', status: 'Active' },
    { id: 3, name: 'Mike Johnson', email: 'mike.johnson@coreconnect.com', role: 'User', status: 'Active' },
    { id: 4, name: 'Sarah Williams', email: 'sarah.williams@coreconnect.com', role: 'User', status: 'Inactive' },
    { id: 5, name: 'Tom Brown', email: 'tom.brown@coreconnect.com', role: 'User', status: 'Active' },
    { id: 6, name: 'Emma Davis', email: 'emma.davis@coreconnect.com', role: 'Admin', status: 'Active' },
    { id: 7, name: 'Alex Wilson', email: 'alex.wilson@coreconnect.com', role: 'User', status: 'Inactive' },
    { id: 8, name: 'Lisa Anderson', email: 'lisa.anderson@coreconnect.com', role: 'User', status: 'Active' },
    { id: 9, name: 'Chris Taylor', email: 'chris.taylor@coreconnect.com', role: 'User', status: 'Active' },
    { id: 10, name: 'Rachel Martinez', email: 'rachel.martinez@coreconnect.com', role: 'User', status: 'Active' },
    { id: 11, name: 'David Lee', email: 'david.lee@coreconnect.com', role: 'User', status: 'Active' },
    { id: 12, name: 'Sophia Chen', email: 'sophia.chen@coreconnect.com', role: 'User', status: 'Active' },
    { id: 13, name: 'Michael Park', email: 'michael.park@coreconnect.com', role: 'User', status: 'Inactive' },
    { id: 14, name: 'Olivia White', email: 'olivia.white@coreconnect.com', role: 'User', status: 'Inactive' },
    { id: 15, name: 'James Miller', email: 'james.miller@coreconnect.com', role: 'User', status: 'Inactive' },
  ],
  activeUsers: [
    { id: 1, name: 'John Doe', email: 'john.doe@coreconnect.com', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@coreconnect.com', role: 'User', status: 'Active' },
    { id: 3, name: 'Mike Johnson', email: 'mike.johnson@coreconnect.com', role: 'User', status: 'Active' },
    { id: 5, name: 'Tom Brown', email: 'tom.brown@coreconnect.com', role: 'User', status: 'Active' },
    { id: 6, name: 'Emma Davis', email: 'emma.davis@coreconnect.com', role: 'Admin', status: 'Active' },
    { id: 8, name: 'Lisa Anderson', email: 'lisa.anderson@coreconnect.com', role: 'User', status: 'Active' },
    { id: 9, name: 'Chris Taylor', email: 'chris.taylor@coreconnect.com', role: 'User', status: 'Active' },
    { id: 10, name: 'Rachel Martinez', email: 'rachel.martinez@coreconnect.com', role: 'User', status: 'Active' },
    { id: 11, name: 'David Lee', email: 'david.lee@coreconnect.com', role: 'User', status: 'Active' },
    { id: 12, name: 'Sophia Chen', email: 'sophia.chen@coreconnect.com', role: 'User', status: 'Active' },
  ],
  inactiveUsers: [
    { id: 4, name: 'Sarah Williams', email: 'sarah.williams@coreconnect.com', role: 'User', status: 'Inactive' },
    { id: 7, name: 'Alex Wilson', email: 'alex.wilson@coreconnect.com', role: 'User', status: 'Inactive' },
    { id: 13, name: 'Michael Park', email: 'michael.park@coreconnect.com', role: 'User', status: 'Inactive' },
    { id: 14, name: 'Olivia White', email: 'olivia.white@coreconnect.com', role: 'User', status: 'Inactive' },
    { id: 15, name: 'James Miller', email: 'james.miller@coreconnect.com', role: 'User', status: 'Inactive' },
  ],
  admins: [
    { id: 1, name: 'John Doe', email: 'john.doe@coreconnect.com', role: 'Admin', status: 'Active' },
    { id: 6, name: 'Emma Davis', email: 'emma.davis@coreconnect.com', role: 'Admin', status: 'Active' },
    { id: 18, name: 'Mark Thompson', email: 'mark.thompson@coreconnect.com', role: 'Admin', status: 'Active' },
    { id: 19, name: 'Jennifer Adams', email: 'jennifer.adams@coreconnect.com', role: 'Admin', status: 'Active' },
  ],
}

export function StatCards({ onCardClick }: { onCardClick: (type: string, users: any[]) => void }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Total Users Card */}
      <Card
        className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 cursor-pointer hover:shadow-lg transition-all hover:scale-105 border-0"
        onClick={() => onCardClick('Users', mockData.totalUsers)}
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-purple-100 text-sm mb-1">Total Users</p>
            <h3 className="text-4xl font-bold">15</h3>
          </div>
          <div className="bg-white/20 p-3 rounded-lg">
            <Users className="w-6 h-6" />
          </div>
        </div>
        <p className="text-purple-100 text-xs">In CoreConnect</p>
      </Card>

      {/* Active Users Card */}
      <Card
        className="bg-gradient-to-br from-red-500 to-red-600 text-white p-6 cursor-pointer hover:shadow-lg transition-all hover:scale-105 border-0"
        onClick={() => onCardClick('Active Users', mockData.activeUsers)}
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-red-100 text-sm mb-1">Active Users</p>
            <h3 className="text-4xl font-bold">10</h3>
          </div>
          <div className="bg-white/20 p-3 rounded-lg">
            <UserCheck className="w-6 h-6" />
          </div>
        </div>
        <p className="text-red-100 text-xs">Currently active</p>
      </Card>

      {/* Inactive Users Card */}
      <Card
        className="bg-gradient-to-br from-pink-500 to-pink-600 text-white p-6 cursor-pointer hover:shadow-lg transition-all hover:scale-105 border-0"
        onClick={() => onCardClick('Inactive Users', mockData.inactiveUsers)}
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-pink-100 text-sm mb-1">Inactive Users</p>
            <h3 className="text-4xl font-bold">5</h3>
          </div>
          <div className="bg-white/20 p-3 rounded-lg">
            <UserX className="w-6 h-6" />
          </div>
        </div>
        <p className="text-pink-100 text-xs">Inactive accounts</p>
      </Card>

      {/* Admins Card */}
      <Card
        className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 cursor-pointer hover:shadow-lg transition-all hover:scale-105 border-0"
        onClick={() => onCardClick('Admins', mockData.admins)}
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-blue-100 text-sm mb-1">Admins</p>
            <h3 className="text-4xl font-bold">4</h3>
          </div>
          <div className="bg-white/20 p-3 rounded-lg">
            <Shield className="w-6 h-6" />
          </div>
        </div>
        <p className="text-blue-100 text-xs">System administrators</p>
      </Card>
    </div>
  )
}
