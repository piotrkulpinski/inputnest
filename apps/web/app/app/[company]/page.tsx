"use client"

import { Button, Header } from "@curiousleaf/design"
import { SearchIcon, BellRingIcon, CalendarIcon, PlusIcon, LayoutDashboardIcon } from "lucide-react"

export default function CompanyDashboard() {
  return (
    <Header
      avatar={{
        children: <LayoutDashboardIcon />,
        variant: "outline",
        theme: "gray",
      }}
      title="Dashboard"
      description="Organize and access your payment cards."
      size="lg"
      className="border-b py-4"
    >
      <div className="flex items-center gap-3">
        <Button theme="gray" variant="ghost" prefix={<SearchIcon />} />
        <Button theme="gray" variant="ghost" prefix={<BellRingIcon />} />
        <Button theme="gray" variant="outline" prefix={<CalendarIcon />}>
          Schedule
        </Button>
        <Button prefix={<PlusIcon />}>Create Request</Button>
      </div>
    </Header>
  )
}
