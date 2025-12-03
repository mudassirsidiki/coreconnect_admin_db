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
import { Badge } from '@/components/ui/badge'

interface UserDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  cardType: string
  users: any[]
}

export function UserDetailsModal({ isOpen, onClose, cardType, users }: UserDetailsModalProps) {
  const isAdminCard = cardType === 'Admins'
  const isCompaniesCard = cardType === 'Companies'
  const isContactsCard = cardType === 'Contacts'
  const isProjectsCard = cardType === 'Projects'
  const isTechnologiesCard = cardType === 'Technologies'

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[85vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {cardType} - {users.length} {users.length === 1 ? 'item' : 'items'}
          </DialogTitle>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto overflow-x-hidden mt-4">
          <div className="w-full overflow-x-hidden [&_div[data-slot='table-container']]:overflow-x-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16">#</TableHead>
                  {isCompaniesCard || isProjectsCard || isTechnologiesCard ? (
                    <TableHead className="min-w-[200px]">Name</TableHead>
                  ) : isContactsCard ? (
                    <>
                      <TableHead className="min-w-[200px]">Contact Name</TableHead>
                      <TableHead className="min-w-[250px]">Email</TableHead>
                    </>
                  ) : isAdminCard ? (
                    <>
                      <TableHead className="min-w-[200px]">Admin Name</TableHead>
                      <TableHead className="min-w-[250px]">Email</TableHead>
                    </>
                  ) : (
                    <>
                      <TableHead className="min-w-[200px]">Name</TableHead>
                      <TableHead className="min-w-[250px]">Email</TableHead>
                      <TableHead className="w-28 text-center">Status</TableHead>
                    </>
                  )}
                </TableRow>
              </TableHeader>
              <TableBody>
                {isCompaniesCard || isProjectsCard || isTechnologiesCard ? (
                  users.map((item, index) => (
                    <TableRow key={item.id} className="hover:bg-muted/50">
                      <TableCell className="font-medium text-muted-foreground">
                        {index + 1}
                      </TableCell>
                      <TableCell>
                        <span className="font-semibold text-foreground">{item.name}</span>
                      </TableCell>
                    </TableRow>
                  ))
                ) : isContactsCard ? (
                  users.map((contact, index) => (
                    <TableRow key={contact.id} className="hover:bg-muted/50">
                      <TableCell className="font-medium text-muted-foreground">
                        {index + 1}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 min-w-0">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-white font-semibold text-xs flex-shrink-0">
                            {contact.name.split(' ').map((n: string) => n[0]).join('')}
                          </div>
                          <span className="font-semibold text-foreground truncate">{contact.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        <span className="truncate block">{contact.email || 'No email'}</span>
                      </TableCell>
                    </TableRow>
                  ))
                ) : isAdminCard ? (
                  users.map((admin, index) => (
                    <TableRow key={admin.id} className="hover:bg-muted/50">
                      <TableCell className="font-medium text-muted-foreground">
                        {index + 1}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 min-w-0">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white font-semibold text-xs flex-shrink-0">
                            {admin.name.split(' ').map((n: string) => n[0]).join('')}
                          </div>
                          <span className="font-semibold text-foreground truncate">{admin.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        <span className="truncate block">{admin.email || 'No email'}</span>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  users.map((user, index) => (
                    <TableRow key={user.id} className="hover:bg-muted/50">
                      <TableCell className="font-medium text-muted-foreground">
                        {index + 1}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 min-w-0">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center text-white font-semibold text-xs flex-shrink-0">
                            {user.name.split(' ').map((n: string) => n[0]).join('')}
                          </div>
                          <span className="font-semibold text-foreground truncate">{user.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        <span className="truncate block">{user.email || 'No email'}</span>
                      </TableCell>
                      <TableCell className="text-center">
                        {user.status ? (
                          <Badge
                            variant={user.status === 'Active' ? 'default' : 'secondary'}
                            className={
                              user.status === 'Active'
                                ? 'bg-green-500 hover:bg-green-600 text-white whitespace-nowrap'
                                : 'bg-gray-500 hover:bg-gray-600 text-white whitespace-nowrap'
                            }
                          >
                            {user.status}
                          </Badge>
                        ) : (
                          <span className="text-muted-foreground text-sm">-</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
