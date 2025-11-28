'use client'

import { useState } from 'react'
import { Sidebar } from '@/components/sidebar'
import { StatCards } from '@/components/stat-cards'
import { RecentActivity } from '@/components/recent-activity'
import { UserDataTable } from '@/components/user-data-table'
import { ActivityCharts } from '@/components/activity-charts'
import { Header } from '@/components/header'
import { UserDetailsModal } from '@/components/user-details-modal'

export default function Dashboard() {
  const [selectedCard, setSelectedCard] = useState<string | null>(null)
  const [selectedUsers, setSelectedUsers] = useState<any[]>([])

  const handleCardClick = (cardType: string, users: any[]) => {
    setSelectedCard(cardType)
    setSelectedUsers(users)
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
                <UserDataTable />
              </div>
              <div className="flex w-full">
                <RecentActivity />
              </div>
            </div>
            <ActivityCharts />
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
    </div>
  )
}
