'use client'

import { Search, Bell, Settings, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'

export function Header() {
  const [dateRange, setDateRange] = useState('')

  return (
    <header className="bg-card border-b border-border px-8 py-4 flex items-center justify-between sticky top-0 z-40">
      <div className="flex items-center gap-4 flex-1">
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 w-64 bg-background"
          />
        </div>

        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="date"
            className="pl-10 pr-4 py-2 bg-background"
            onChange={(e) => setDateRange(e.target.value)}
          />
        </div>

        <Button variant="ghost" size="icon">
          <Bell className="w-5 h-5" />
        </Button>

        <Button variant="ghost" size="icon">
          <Settings className="w-5 h-5" />
        </Button>

        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-blue-500" />
      </div>
    </header>
  )
}
