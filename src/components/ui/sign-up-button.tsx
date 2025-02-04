'use client'

import SignUpDialog from "./sign-up-dialog"
import { useState } from "react"

export default function SignUpButton() {
  const [open, setOpen] = useState(false)
  
  return (
    <div>
      <SignUpDialog 
        open={open} 
        onOpenChange={setOpen}
      />
    </div>
  )
} 