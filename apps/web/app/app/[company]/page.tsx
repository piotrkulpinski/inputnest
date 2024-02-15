"use client"

import { Button, Header } from "@curiousleaf/design"
import { SearchIcon, BellRingIcon, CalendarIcon, PlusIcon, LayoutDashboardIcon } from "lucide-react"

export default function CompanyDashboard() {
  return (
    <Header
      title="Dashboard"
      description="Organize and access your payment cards."
      size="h3"
      className="border-b py-4"
    >
      <div className="flex items-center gap-3">
        <Button theme="secondary" variant="ghost" prefix={<SearchIcon />} />
        <Button theme="secondary" variant="ghost" prefix={<BellRingIcon />} />
        <Button theme="secondary" variant="outline" prefix={<CalendarIcon />}>
          Schedule
        </Button>
        <Button theme="secondary" prefix={<PlusIcon />}>Create Request</Button>
      </div>
    </Header>
  )
}
