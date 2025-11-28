'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, User } from 'lucide-react'

const mockActivity = [
  {
    id: 1,
    user: 'John Doe',
    action: 'Updated',
    item: 'admin dashboard',
    time: '20 Nov 2025',
    timestamp: '12:24am',
  },
  {
    id: 2,
    user: 'Jane Smith',
    action: 'Created',
    item: 'new company',
    time: '20 Nov 2025',
    timestamp: '11:45am',
  },
  {
    id: 3,
    user: 'Mike Johnson',
    action: 'Updated',
    item: 'user roles',
    time: '19 Nov 2025',
    timestamp: '11:00pm',
  },
  {
    id: 4,
    user: 'Emma Davis',
    action: 'Created',
    item: 'new contact',
    time: '19 Nov 2025',
    timestamp: '11:09pm',
  },
  {
    id: 5,
    user: 'Tom Brown',
    action: 'Updated',
    item: 'project status',
    time: '19 Nov 2025',
    timestamp: '11:06pm',
  },
]

export function RecentActivity() {
  return (
    <Card className="border-border h-full w-full">
      <div className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Recent Changes
        </h3>
        <div className="space-y-4">
          {mockActivity.map((activity) => (
            <div
              key={activity.id}
              className="p-3 hover:bg-muted/50 rounded-lg transition-colors border border-border/50"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-blue-500 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-foreground text-sm">{activity.user}</span>
                    <Badge variant="outline" className="text-xs">
                      {activity.action}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">
                    Visited {activity.item}
                  </p>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    {activity.time} @ {activity.timestamp}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}
