'use client'

import { useState } from 'react'
import { ChevronDown, Users, Settings, Download, ArrowLeft, LayoutDashboard } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Logo from '@/components/logo'

export function Sidebar() {
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null)

  const toggleMenu = (menu: string) => {
    setExpandedMenu(expandedMenu === menu ? null : menu)
  }

  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border h-screen flex flex-col overflow-y-auto sticky top-0">
      <div className="p-6 border-b border-sidebar-border">
        <Logo />
      </div>

      <nav className="flex-1 p-4 space-y-2">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-white hover:bg-sidebar-accent"
        >
          <LayoutDashboard className="w-5 h-5 text-white" />
          Dashboard
        </Button>

        <div>
          <button
            onClick={() => toggleMenu('users')}
            className="w-full flex items-center justify-between px-4 py-2 text-white hover:bg-sidebar-accent rounded-md transition-colors"
          >
            <span className="flex items-center gap-3">
              <Users className="w-5 h-5 text-white" />
              Users
            </span>
            <ChevronDown
              className={`w-4 h-4 text-white transition-transform ${
                expandedMenu === 'users' ? 'rotate-180' : ''
              }`}
            />
          </button>
          {expandedMenu === 'users' && (
            <div className="ml-8 space-y-1 mt-2">
              <Button variant="ghost" className="w-full justify-start text-sm text-white hover:bg-sidebar-accent" asChild>
                <span>Add New</span>
              </Button>
              <Button variant="ghost" className="w-full justify-start text-sm text-white hover:bg-sidebar-accent" asChild>
                <span>Users List</span>
              </Button>
              <Button variant="ghost" className="w-full justify-start text-sm text-white hover:bg-sidebar-accent" asChild>
                <span>Roles</span>
              </Button>
              <Button variant="ghost" className="w-full justify-start text-sm text-white hover:bg-sidebar-accent" asChild>
                <span>User Logs</span>
              </Button>
            </div>
          )}
        </div>

        <div>
          <button
            onClick={() => toggleMenu('fields')}
            className="w-full flex items-center justify-between px-4 py-2 text-white hover:bg-sidebar-accent rounded-md transition-colors"
          >
            <span className="flex items-center gap-3">
              <Settings className="w-5 h-5 text-white" />
              Custom Fields
            </span>
            <ChevronDown
              className={`w-4 h-4 text-white transition-transform ${
                expandedMenu === 'fields' ? 'rotate-180' : ''
              }`}
            />
          </button>
          {expandedMenu === 'fields' && (
            <div className="ml-8 space-y-1 mt-2">
              <Button variant="ghost" className="w-full justify-start text-sm text-white hover:bg-sidebar-accent" asChild>
                <span>Add New</span>
              </Button>
              <Button variant="ghost" className="w-full justify-start text-sm text-white hover:bg-sidebar-accent" asChild>
                <span>Field List</span>
              </Button>
              <Button variant="ghost" className="w-full justify-start text-sm text-white hover:bg-sidebar-accent" asChild>
                <span>Position</span>
              </Button>
            </div>
          )}
        </div>

        <div>
          <button
            onClick={() => toggleMenu('wizard')}
            className="w-full flex items-center justify-between px-4 py-2 text-white hover:bg-sidebar-accent rounded-md transition-colors"
          >
            <span className="flex items-center gap-3">
              <Download className="w-5 h-5 text-white" />
              Import Wizard
            </span>
            <ChevronDown
              className={`w-4 h-4 text-white transition-transform ${
                expandedMenu === 'wizard' ? 'rotate-180' : ''
              }`}
            />
          </button>
          {expandedMenu === 'wizard' && (
            <div className="ml-8 space-y-1 mt-2">
              <Button variant="ghost" className="w-full justify-start text-sm text-white hover:bg-sidebar-accent" asChild>
                <span>Add New</span>
              </Button>
              <Button variant="ghost" className="w-full justify-start text-sm text-white hover:bg-sidebar-accent" asChild>
                <span>Get Import Format</span>
              </Button>
              <Button variant="ghost" className="w-full justify-start text-sm text-white hover:bg-sidebar-accent" asChild>
                <span>Companies Ids</span>
              </Button>
            </div>
          )}
        </div>
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <Button variant="ghost" className="w-full justify-start gap-3 text-white hover:bg-sidebar-accent">
          <ArrowLeft className="w-5 h-5 text-white" />
          Go Back
        </Button>
      </div>
    </aside>
  )
}
