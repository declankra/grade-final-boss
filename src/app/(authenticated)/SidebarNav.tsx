// src/app/(authenticated)/SidebarNav.tsx
'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Home, Settings, BookOpen, Calculator, MessageCircle, ChevronDown, GraduationCap } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from '@/components/ui/sidebar';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// Client component for the sidebar navigation
function SidebarNav() {
  const [isCalculationsOpen, setIsCalculationsOpen] = useState(false);
  const [isClassesOpen, setIsClassesOpen] = useState(false);
  const [showFeedbackDialog, setShowFeedbackDialog] = useState(false);
  const [showQuestionDialog, setShowQuestionDialog] = useState(false);

  return (
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
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton asChild>
                      <Link href="/calculator/course-grades">Course Grades</Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton asChild>
                      <Link href="/calculator/gpa">GPA</Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              )}
            </SidebarMenuItem>

            {/* Resources Section */}
            <SidebarGroupLabel>Resources</SidebarGroupLabel>
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

            {/* Contact Section */}
            <SidebarGroupLabel>Contact</SidebarGroupLabel>
            
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
  );
}

export { SidebarNav };