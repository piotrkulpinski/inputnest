"use client"

import { Button, Header } from "@curiousleaf/design"
import { IconSearch, IconBellRinging, IconCalendar, IconPlus, IconTable } from "@tabler/icons-react"

export default function CompanyDashboard() {
  return (
    <Header
      avatar={{
        children: <IconTable />,
        variant: "outline",
        theme: "gray",
      }}
      title="Dashboard"
      description="Organize and access your payment cards."
      size="lg"
      className="border-b py-4"
    >
      <div className="flex items-center gap-3">
        <Button theme="gray" variant="ghost" prefix={<IconSearch />} />
        <Button theme="gray" variant="ghost" prefix={<IconBellRinging />} />
        <Button theme="gray" variant="outline" prefix={<IconCalendar />}>
          Schedule
        </Button>
        <Button prefix={<IconPlus />}>Create Request</Button>
      </div>
    </Header>
  )
}
