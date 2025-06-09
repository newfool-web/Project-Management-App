"use client";

import { ChevronDown, Loader, Settings } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getAvatarColor, getAvatarFallbackText } from "@/lib/helper";
import { useAuthContext } from "@/context/auth-provider";
import useWorkspaceId from "@/hooks/use-workspace-id";
import useGetWorkspaceMembers from "@/hooks/api/use-get-workspace-members";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { changeWorkspaceMemberRoleMutationFn } from "@/lib/api";
import { toast } from "@/hooks/use-toast";
import { Permissions } from "@/constant";

const AllMembers = () => {
  const { user, hasPermission } = useAuthContext();

  const canChangeMemberRole = hasPermission(Permissions.CHANGE_MEMBER_ROLE);

  const queryClient = useQueryClient();
  const workspaceId = useWorkspaceId();

  const { data, isPending } = useGetWorkspaceMembers(workspaceId);
  const members = data?.members || [];
  const roles = data?.roles || [];

  const { mutate, isPending: isLoading } = useMutation({
    mutationFn: changeWorkspaceMemberRoleMutationFn,
  });

  const handleSelect = (roleId: string, memberId: string) => {
    if (!roleId || !memberId) return;
    const payload = {
      workspaceId,
      data: {
        roleId,
        memberId,
      },
    };
    mutate(payload, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["members", workspaceId],
        });
        toast({
          title: "Success",
          description: "Member's role changed successfully",
          variant: "success",
        });
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      },
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-slate-100 rounded-lg">
          <Settings className="w-4 h-4 text-slate-600" />
        </div>
        <h3 className="text-lg font-semibold text-slate-900">Manage Members</h3>
      </div>

      {isPending ? (
        <div className="flex items-center justify-center py-12">
          <Loader className="w-8 h-8 animate-spin text-slate-400" />
        </div>
      ) : (
        <div className="space-y-4">
          {members?.map((member) => {
            const name = member.userId?.name;
            const initials = getAvatarFallbackText(name);
            const avatarColor = getAvatarColor(name);
            return (
              <div
                key={member.userId._id}
                className="flex items-center justify-between p-4 rounded-xl border border-slate-200/60 bg-white hover:bg-slate-50/50 transition-colors duration-200"
              >
                <div className="flex items-center space-x-4">
                  <Avatar className="h-10 w-10 ring-2 ring-slate-100">
                    <AvatarImage
                      src={member.userId?.profilePicture || ""}
                      alt="Image"
                    />
                    <AvatarFallback className={`${avatarColor} font-medium`}>
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-slate-900">
                      {name}
                    </p>
                    <p className="text-sm text-slate-500">
                      {member.userId.email}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="min-w-24 capitalize border-slate-200 hover:bg-slate-50 disabled:opacity-95 disabled:pointer-events-none"
                        disabled={
                          isLoading ||
                          !canChangeMemberRole ||
                          member.userId._id === user?._id
                        }
                      >
                        {member.role.name?.toLowerCase()}{" "}
                        {canChangeMemberRole &&
                          member.userId._id !== user?._id && (
                            <ChevronDown className="ml-2 h-3 w-3 text-slate-400" />
                          )}
                      </Button>
                    </PopoverTrigger>
                    {canChangeMemberRole && (
                      <PopoverContent
                        className="p-0 border-slate-200"
                        align="end"
                      >
                        <Command>
                          <CommandInput
                            placeholder="Select new role..."
                            disabled={isLoading}
                            className="disabled:pointer-events-none"
                          />
                          <CommandList>
                            {isLoading ? (
                              <div className="flex items-center justify-center py-6">
                                <Loader className="w-6 h-6 animate-spin text-slate-400" />
                              </div>
                            ) : (
                              <>
                                <CommandEmpty>No roles found.</CommandEmpty>
                                <CommandGroup>
                                  {roles?.map(
                                    (role) =>
                                      role.name !== "OWNER" && (
                                        <CommandItem
                                          key={role._id}
                                          disabled={isLoading}
                                          className="disabled:pointer-events-none flex flex-col items-start px-4 py-3 cursor-pointer hover:bg-slate-50"
                                          onSelect={() => {
                                            handleSelect(
                                              role._id,
                                              member.userId._id
                                            );
                                          }}
                                        >
                                          <p className="capitalize font-medium text-slate-900">
                                            {role.name?.toLowerCase()}
                                          </p>
                                          <p className="text-xs text-slate-500 mt-1">
                                            {role.name === "ADMIN" &&
                                              `Can view, create, edit tasks, project and manage settings.`}
                                            {role.name === "MEMBER" &&
                                              `Can view, edit only task created by them.`}
                                          </p>
                                        </CommandItem>
                                      )
                                  )}
                                </CommandGroup>
                              </>
                            )}
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    )}
                  </Popover>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AllMembers;
