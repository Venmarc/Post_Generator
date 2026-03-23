"use client"

import React from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { 
  LogOut, 
  User, 
  ChevronDown
} from "lucide-react"

export default function UserNav({ email }: { email: string | undefined }) {
  const router = useRouter()
  const supabase = createClient()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/")
    router.refresh()
  }

  return (
    <div className="flex items-center gap-4">
      <div className="hidden sm:flex flex-col items-end">
        <span className="text-xs font-semibold text-white/90 truncate max-w-[150px]">{email}</span>
        <span className="text-[10px] text-accent font-bold uppercase tracking-widest">Pro Member</span>
      </div>
      
      <div className="relative group">
        <button className="flex items-center gap-2 p-1 rounded-full hover:bg-white/5 transition-colors border border-transparent hover:border-white/10 group">
          <div className="w-10 h-10 rounded-full bg-linear-to-tr from-accent to-accent-dark flex items-center justify-center border border-border-subtle/50 text-void font-bold">
            {email?.charAt(0).toUpperCase() || <User className="w-5 h-5" />}
          </div>
          <ChevronDown className="w-4 h-4 text-text-secondary/50 group-hover:text-text-primary transition-colors" />
        </button>

        {/* Dropdown Menu */}
        <div className="absolute right-0 top-full mt-2 w-56 rounded-2xl bg-surface border border-border-subtle shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 p-2 transform origin-top-right scale-95 group-hover:scale-100">
          <div className="px-4 py-3 border-b border-border-subtle/50 mb-1">
            <p className="text-xs text-text-secondary">Signed in as</p>
            <p className="text-sm font-bold truncate">{email}</p>
          </div>
          
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-sm text-text-secondary hover:text-text-primary transition-all">
            <User className="w-4 h-4" />
            Profile Settings
          </button>
          
          <button 
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-500/10 text-sm text-red-500 transition-all"
          >
            <LogOut className="w-4 h-4" />
            Log Out
          </button>
        </div>
      </div>
    </div>
  )
}
