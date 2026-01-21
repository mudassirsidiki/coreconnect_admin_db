'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Building2, Users } from 'lucide-react'

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

interface UserDataDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  user: UserDataItem | null
  userName?: string
  contacts: ContactData[]
  companies: CompanyData[]
}

export function UserDataDetailsModal({
  isOpen,
  onClose,
  user,
  userName,
  contacts,
  companies,
}: UserDataDetailsModalProps) {
  const displayName = user?.ptTeamMember || userName || ''

  if (!displayName) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {displayName} - Uploaded Data
          </DialogTitle>
          {user && (
            <p className="text-sm text-muted-foreground mt-1">
              {user.clientName} • {user.dateAdded}
            </p>
          )}
        </DialogHeader>

        <Tabs defaultValue="contacts" className="flex-1 flex flex-col overflow-hidden">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="contacts" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Contacts ({contacts.length})
            </TabsTrigger>
            <TabsTrigger value="companies" className="flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              Companies ({companies.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="contacts" className="flex-1 overflow-y-auto mt-4">
            {contacts.length > 0 ? (
              <div className="w-full overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-16">#</TableHead>
                      <TableHead>First Name</TableHead>
                      <TableHead>Last Name</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Business Email</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {contacts.map((contact, index) => (
                      <TableRow key={contact.id} className="hover:bg-muted/50">
                        <TableCell className="font-medium text-muted-foreground">
                          {index + 1}
                        </TableCell>
                        <TableCell className="text-foreground">{contact.firstName}</TableCell>
                        <TableCell className="text-foreground">{contact.lastName}</TableCell>
                        <TableCell className="text-foreground">{contact.company}</TableCell>
                        <TableCell className="text-foreground">{contact.department}</TableCell>
                        <TableCell className="text-muted-foreground">{contact.businessEmail}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="flex items-center justify-center h-64 text-muted-foreground">
                No contacts data available for this user
              </div>
            )}
          </TabsContent>

          <TabsContent value="companies" className="flex-1 overflow-y-auto mt-4">
            {companies.length > 0 ? (
              <div className="w-full overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-16">#</TableHead>
                      <TableHead>Company Name</TableHead>
                      <TableHead>Region</TableHead>
                      <TableHead>Industry</TableHead>
                      <TableHead>Revenue Range</TableHead>
                      <TableHead>Employees Range</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {companies.map((company, index) => (
                      <TableRow key={company.id} className="hover:bg-muted/50">
                        <TableCell className="font-medium text-muted-foreground">
                          {index + 1}
                        </TableCell>
                        <TableCell className="text-foreground font-medium">
                          {company.companyName}
                        </TableCell>
                        <TableCell className="text-foreground">{company.region}</TableCell>
                        <TableCell className="text-foreground">{company.industry}</TableCell>
                        <TableCell className="text-foreground">{company.revenueRange}</TableCell>
                        <TableCell className="text-foreground">{company.employeesRange}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="flex items-center justify-center h-64 text-muted-foreground">
                No companies data available for this user
              </div>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
