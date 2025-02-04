// src/app/(authenticated)/dashboard/page.tsx
// Dashboard (Home) for signed-in users
'use client';
import { useState } from "react";
import Link from "next/link";
import { 
  Home, 
  Settings, 
  BookOpen, 
  Calculator, 
  MessageCircle,
  ChevronDown,
  GraduationCap,
  Calendar
} from "lucide-react";
import {
  Sidebar,
  SidebarProvider,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function DashboardPage() {
  const [isCalculationsOpen, setIsCalculationsOpen] = useState(false);
  const [isClassesOpen, setIsClassesOpen] = useState(false);
  const [showFeedbackDialog, setShowFeedbackDialog] = useState(false);
  const [showQuestionDialog, setShowQuestionDialog] = useState(false);

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen bg-background">
        <Sidebar>
          <SidebarContent>
            <SidebarGroup>
              <SidebarMenu>
                {/* Dashboard/Home */}
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Dashboard">
                    <Link href="/dashboard" className="flex items-center">
                      <Home className="mr-2" />
                      <span>Dashboard</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                {/* Classes Section */}
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    onClick={() => setIsClassesOpen(!isClassesOpen)}
                    className="w-full"
                  >
                    <GraduationCap className="mr-2" />
                    <span>Classes</span>
                    <ChevronDown 
                      className={`ml-auto h-4 w-4 transform transition-transform ${
                        isClassesOpen ? "rotate-180" : ""
                      }`}
                    />
                  </SidebarMenuButton>
                  {isClassesOpen && (
                    <SidebarMenuSub>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild>
                          <Link href="/classes/current">Current Semester</Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild>
                          <Link href="/classes/past">Past Classes</Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  )}
                </SidebarMenuItem>

                {/* Calculations Section */}
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    onClick={() => setIsCalculationsOpen(!isCalculationsOpen)}
                    className="w-full"
                  >
                    <Calculator className="mr-2" />
                    <span>Calculations</span>
                    <ChevronDown 
                      className={`ml-auto h-4 w-4 transform transition-transform ${
                        isCalculationsOpen ? "rotate-180" : ""
                      }`}
                    />
                  </SidebarMenuButton>
                  {isCalculationsOpen && (
                    <SidebarMenuSub>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild>
                          <Link href="/calculator/final-exam">Final Exam</Link>
                        </SidebarMenuSubButton>
                        <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild>
                          <Link href="/calculator/course-grades">Course Grades</Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild>
                          <Link href="/calculator/gpa">GPA</Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  )}
                </SidebarMenuItem>

                {/* Semester Header */}
                <SidebarGroupLabel>Semester</SidebarGroupLabel>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="/semester/current" className="flex items-center">
                      <Calendar className="mr-2" />
                      <span>Current Term</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                {/* Learn */}
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Learning Resources">
                    <Link href="/learn" className="flex items-center">
                      <BookOpen className="mr-2" />
                      <span>Learn</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                {/* Settings */}
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Settings">
                    <Link href="/settings" className="flex items-center">
                      <Settings className="mr-2" />
                      <span>Settings</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                {/* Feedback Dialog */}
                <SidebarMenuItem>
                  <Dialog open={showFeedbackDialog} onOpenChange={setShowFeedbackDialog}>
                    <DialogTrigger asChild>
                      <SidebarMenuButton className="w-full">
                        <MessageCircle className="mr-2" />
                        <span>Feedback</span>
                      </SidebarMenuButton>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Send Feedback</DialogTitle>
                        <DialogDescription>
                          Help us improve Grade Final Boss
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 pt-4">
                        <div className="space-y-2">
                          <Label htmlFor="feedback">Your Feedback</Label>
                          <Input id="feedback" placeholder="Share your thoughts..." />
                        </div>
                        <Button type="submit" className="w-full">Send Feedback</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </SidebarMenuItem>

                {/* Question Dialog */}
                <SidebarMenuItem>
                  <Dialog open={showQuestionDialog} onOpenChange={setShowQuestionDialog}>
                    <DialogTrigger asChild>
                      <SidebarMenuButton className="w-full">
                        <MessageCircle className="mr-2" />
                        <span>Question?</span>
                      </SidebarMenuButton>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Ask a Question</DialogTitle>
                        <DialogDescription>
                          We're here to help
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 pt-4">
                        <div className="space-y-2">
                          <Label htmlFor="question">Your Question</Label>
                          <Input id="question" placeholder="What would you like to know?" />
                        </div>
                        <Button type="submit" className="w-full">Send Question</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        {/* Main Dashboard Content */}
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Grade Dashboard</h1>
            
            {/* Dashboard Content */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {/* Placeholder for actual dashboard widgets */}
              <div className="rounded-lg border bg-card p-6">
                <h2 className="text-lg font-semibold mb-2">Current GPA</h2>
                <p className="text-2xl font-bold">3.2</p>
              </div>
              <div className="rounded-lg border bg-card p-6">
                <h2 className="text-lg font-semibold mb-2">Projected GPA</h2>
                <p className="text-2xl font-bold">3.45</p>
              </div>
              <div className="rounded-lg border bg-card p-6">
                <h2 className="text-lg font-semibold mb-2">Classes This Semester</h2>
                <p className="text-2xl font-bold">5</p>
              </div>
              <div className="rounded-lg border bg-card p-6">
                <h2 className="text-lg font-semibold mb-2">Upcoming Finals</h2>
                <p className="text-2xl font-bold">3</p>
              </div>

            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}