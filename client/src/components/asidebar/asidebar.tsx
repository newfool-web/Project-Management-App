import { useState } from "react";
import { Link } from "react-router-dom";
import { EllipsisIcon, Loader, LogOut } from "lucide-react";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroupContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Logo from "@/components/logo";
import LogoutDialog from "./logout-dialog";
import { WorkspaceSwitcher } from "./workspace-switcher";
import { NavMain } from "./nav-main";
import { NavProjects } from "./nav-projects";
import { Separator } from "../ui/separator";
import useWorkspaceId from "@/hooks/use-workspace-id";
import { useAuthContext } from "@/context/auth-provider";

const Asidebar = () => {
  const { isLoading, user } = useAuthContext();

  const { open } = useSidebar();
  const workspaceId = useWorkspaceId();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Sidebar collapsible="icon">
        <SidebarHeader className="!py-0">
          <div className="flex h-[50px] items-center justify-start w-full px-4">
            <Logo url={`/workspace/${workspaceId}`} />
            {open && (
              <Link
                to={`/workspace/${workspaceId}`}
                className="hidden md:flex ml-2 items-center gap-2 self-center font-semibold bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent"
              >
                Team-Verge
              </Link>
            )}
          </div>
        </SidebarHeader>
        <SidebarContent className="!mt-0">
          <SidebarGroup className="!py-0">
            <SidebarGroupContent>
              <WorkspaceSwitcher />
              <Separator className="bg-purple-200/40" />
              <NavMain />
              <Separator className="bg-purple-200/40" />
              <NavProjects />
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem className="mb-2 p-2 hover:bg-purple-50/20 rounded-lg transition-colors duration-200">
              {isLoading ? (
                <Loader
                  size="24px"
                  className="place-self-center self-center animate-spin text-slate-600"
                />
              ) : (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuButton
                      size="lg"
                      className="w-full flex justify-between items-center bg-transparent text-slate-900 hover:bg-purple-50/50 data-[state=open]:bg-purple-50/50 rounded-xl transition-all duration-300 shadow-sm"
                    >
                      <Avatar className="h-9 w-9 rounded-full ring-2 ring-purple-200/40">
                        <AvatarImage src={user?.profilePicture || ""} />
                        <AvatarFallback className="rounded-full border border-purple-200/40 bg-gradient-to-br from-cyan-400 to-purple-500 text-white font-bold text-lg">
                          {user?.name?.split(" ")?.[0]?.charAt(0)}
                          {user?.name?.split(" ")?.[1]?.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="grid flex-1 text-left text-sm leading-tight ml-3">
                        <span className="truncate font-semibold text-slate-900">
                          {user?.name}
                        </span>
                        <span className="truncate text-xs text-slate-600">{user?.email}</span>
                      </div>
                      <EllipsisIcon className="ml-auto size-5 text-slate-600" />
                    </SidebarMenuButton>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-xl bg-white/95 backdrop-blur-md border border-purple-200/60 shadow-xl overflow-hidden py-2"
                    side={"bottom"}
                    align="start"
                    sideOffset={8}
                  >
                    <DropdownMenuGroup></DropdownMenuGroup>
                    <DropdownMenuSeparator className="bg-purple-200/40" />
                    <DropdownMenuItem 
                      onClick={() => setIsOpen(true)}
                      className="flex items-center gap-2 px-4 py-2 text-slate-700 hover:bg-purple-50/30 rounded-lg transition-colors duration-200 cursor-pointer focus:outline-none focus:bg-purple-50/30"
                    >
                      <LogOut className="h-4 w-4 text-purple-500" />
                      <span className="font-medium">Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>

      <LogoutDialog isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default Asidebar;
