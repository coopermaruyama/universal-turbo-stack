import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { 
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "./dialog";
import { Button } from "./button";
import { Input } from "./input";
import { Label } from "./label";
import { YStack, XStack, Text } from "tamagui";

// Dialog Stories
const dialogMeta: Meta<typeof Dialog> = {
  title: "UI/Dialog",
  component: Dialog,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default dialogMeta;
type DialogStory = StoryObj<typeof dialogMeta>;

// Basic Dialog
export const Default: DialogStory = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open Dialog</Button>
      </DialogTrigger>
      
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        
        <YStack gap="$4">
          <YStack gap="$2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" defaultValue="John Doe" />
          </YStack>
          
          <YStack gap="$2">
            <Label htmlFor="username">Username</Label>
            <Input id="username" defaultValue="@johndoe" />
          </YStack>
        </YStack>
        
        <DialogFooter>
          <Button variant="outline">Cancel</Button>
          <Button>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

// Simple Dialog
export const Simple: DialogStory = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Simple Dialog</Button>
      </DialogTrigger>
      
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Simple Dialog</DialogTitle>
          <DialogDescription>
            This is a simple dialog with just a title and description.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  ),
};

// Dialog without close button
export const WithoutCloseButton: DialogStory = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">No Close Button</Button>
      </DialogTrigger>
      
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>No Close Button</DialogTitle>
          <DialogDescription>
            This dialog doesn't have a close button in the corner.
          </DialogDescription>
        </DialogHeader>
        
        <DialogFooter>
          <Button variant="outline">Cancel</Button>
          <Button>Continue</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

// Form Dialog
export const FormDialog: DialogStory = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create Account</Button>
      </DialogTrigger>
      
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Account</DialogTitle>
          <DialogDescription>
            Enter your details below to create your account.
          </DialogDescription>
        </DialogHeader>
        
        <YStack gap="$4">
          <YStack gap="$2">
            <Label htmlFor="first-name">First Name</Label>
            <Input id="first-name" placeholder="John" />
          </YStack>
          
          <YStack gap="$2">
            <Label htmlFor="last-name">Last Name</Label>
            <Input id="last-name" placeholder="Doe" />
          </YStack>
          
          <YStack gap="$2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="john@example.com" />
          </YStack>
          
          <YStack gap="$2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="••••••••" />
          </YStack>
        </YStack>
        
        <DialogFooter>
          <Button variant="outline">Cancel</Button>
          <Button>Create Account</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

// Controlled Dialog
export const Controlled: DialogStory = {
  render: () => {
    const [open, setOpen] = React.useState(false);
    
    return (
      <YStack gap="$3" alignItems="center">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>Controlled Dialog</Button>
          </DialogTrigger>
          
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Controlled Dialog</DialogTitle>
              <DialogDescription>
                This dialog's state is controlled by React state.
              </DialogDescription>
            </DialogHeader>
            
            <DialogFooter>
              <Button variant="outline" onPress={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onPress={() => setOpen(false)}>
                OK
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        <Text fontSize="$3" color="$mutedForeground">
          Dialog is {open ? "open" : "closed"}
        </Text>
        
        <Button variant="ghost" onPress={() => setOpen(!open)}>
          Toggle Dialog
        </Button>
      </YStack>
    );
  },
};

// AlertDialog Stories
const alertDialogMeta: Meta<typeof AlertDialog> = {
  title: "UI/AlertDialog",
  component: AlertDialog,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

type AlertDialogStory = StoryObj<typeof alertDialogMeta>;

// Default AlertDialog
export const AlertDialogDefault: AlertDialogStory = {
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Delete Account</Button>
      </AlertDialogTrigger>
      
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction destructive>
            Yes, delete account
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
};

// Confirmation AlertDialog
export const ConfirmationAlert: AlertDialogStory = {
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>Save Changes</Button>
      </AlertDialogTrigger>
      
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Save Changes?</AlertDialogTitle>
          <AlertDialogDescription>
            You have unsaved changes. Do you want to save them before leaving?
          </AlertDialogDescription>
        </AlertDialogHeader>
        
        <AlertDialogFooter>
          <AlertDialogCancel>Don't Save</AlertDialogCancel>
          <AlertDialogAction>Save Changes</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
};

// Warning AlertDialog
export const WarningAlert: AlertDialogStory = {
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Clear Data</Button>
      </AlertDialogTrigger>
      
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Clear All Data?</AlertDialogTitle>
          <AlertDialogDescription>
            This will remove all your data including settings, preferences, and
            saved content. This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        
        <AlertDialogFooter>
          <AlertDialogCancel>Keep Data</AlertDialogCancel>
          <AlertDialogAction destructive>
            Clear All Data
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
};

// Success AlertDialog
export const SuccessAlert: AlertDialogStory = {
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="secondary">Complete Setup</Button>
      </AlertDialogTrigger>
      
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Setup Complete!</AlertDialogTitle>
          <AlertDialogDescription>
            Your account has been successfully set up. You can now start using
            all the features.
          </AlertDialogDescription>
        </AlertDialogHeader>
        
        <AlertDialogFooter>
          <AlertDialogAction>Get Started</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
};

// Multiple Actions AlertDialog
export const MultipleActions: AlertDialogStory = {
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Multiple Actions</Button>
      </AlertDialogTrigger>
      
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Choose an Action</AlertDialogTitle>
          <AlertDialogDescription>
            What would you like to do with this file?
          </AlertDialogDescription>
        </AlertDialogHeader>
        
        <AlertDialogFooter>
          <XStack gap="$2" flex={1}>
            <AlertDialogCancel flex={1}>Cancel</AlertDialogCancel>
            <AlertDialogAction variant="outlined" flex={1}>
              Download
            </AlertDialogAction>
            <AlertDialogAction destructive flex={1}>
              Delete
            </AlertDialogAction>
          </XStack>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
};