"use client";

import React from "react";
import { 
  styled, 
  Dialog as TamaguiDialog,
  Sheet,
  YStack,
  XStack,
  Text,
  Button,
  H2,
  Adapt,
  GetProps
} from "tamagui";
import { X } from "@tamagui/lucide-icons";

// Base Dialog components
const DialogContentBase = styled(TamaguiDialog.Content, {
  name: "ShadcnDialogContent",

  backgroundColor: "$background",
  borderColor: "$border",
  borderWidth: 1,
  borderRadius: "$3", // rounded-lg
  padding: "$6",
  shadowColor: "$shadowColor",
  shadowOffset: { width: 0, height: 10 },
  shadowOpacity: 0.15,
  shadowRadius: 25,
  
  maxWidth: 500,
  width: "90%",
  maxHeight: "85%",
  overflow: "hidden",

  // Focus trap styling
  focusStyle: {
    outlineWidth: 0,
  },

  // Animation
  enterStyle: {
    scale: 0.95,
    opacity: 0,
  },
  exitStyle: {
    scale: 0.95,
    opacity: 0,
  },
  
  // animation: "quick", // Temporarily removed
});

const DialogOverlay = styled(TamaguiDialog.Overlay, {
  name: "ShadcnDialogOverlay",
  backgroundColor: "rgba(0, 0, 0, 0.8)",
  
  enterStyle: {
    opacity: 0,
  },
  exitStyle: {
    opacity: 0,
  },
  
  // animation: "quick", // Temporarily removed
});

const DialogTitle = styled(H2, {
  name: "ShadcnDialogTitle",
  fontSize: "$6", // text-lg
  fontWeight: "600", // font-semibold
  color: "$foreground",
  lineHeight: 1,
  marginBottom: "$2",
});

const DialogDescription = styled(Text, {
  name: "ShadcnDialogDescription",
  fontSize: "$4", // text-sm
  color: "$mutedForeground",
  lineHeight: "$5",
  marginBottom: "$4",
});

const DialogHeader = styled(YStack, {
  name: "ShadcnDialogHeader",
  gap: "$2",
  marginBottom: "$4",
});

const DialogFooter = styled(XStack, {
  name: "ShadcnDialogFooter",
  justifyContent: "flex-end",
  gap: "$2",
  marginTop: "$6",
});

const DialogClose = styled(TamaguiDialog.Close, {
  name: "ShadcnDialogClose",
  position: "absolute",
  top: "$4",
  right: "$4",
  padding: "$2",
  borderRadius: "$1",
  backgroundColor: "transparent",
  borderWidth: 0,
  cursor: "pointer",

  hoverStyle: {
    backgroundColor: "$accent",
  },

  focusStyle: {
    backgroundColor: "$accent",
    outlineWidth: 0,
  },
});

// Dialog component types
interface DialogProps {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  modal?: boolean;
}

interface DialogContentProps extends GetProps<typeof DialogContentBase> {
  children: React.ReactNode;
  showCloseButton?: boolean;
}

interface DialogTriggerProps {
  children: React.ReactNode;
  asChild?: boolean;
}

// Main Dialog component
export const Dialog = React.forwardRef<
  React.ElementRef<typeof TamaguiDialog>,
  DialogProps
>(({ children, ...props }, ref) => {
  return (
    <TamaguiDialog ref={ref} {...props}>
      {children}
    </TamaguiDialog>
  );
});

Dialog.displayName = "Dialog";

// Dialog Trigger
export const DialogTrigger = React.forwardRef<
  React.ElementRef<typeof TamaguiDialog.Trigger>,
  DialogTriggerProps
>(({ children, asChild = false, ...props }, ref) => {
  return (
    <TamaguiDialog.Trigger ref={ref} asChild={asChild} {...props}>
      {children}
    </TamaguiDialog.Trigger>
  );
});

DialogTrigger.displayName = "DialogTrigger";

// Dialog Content with responsive behavior
export const DialogContentComponent = React.forwardRef<
  React.ElementRef<typeof DialogContentBase>,
  DialogContentProps
>(({ children, showCloseButton = true, ...props }, ref) => {
  return (
    <TamaguiDialog.Portal>
      <DialogOverlay />
      
      <Adapt when="sm" platform="touch">
        <Sheet
          zIndex={200000}
          modal
          dismissOnSnapToBottom
          animationConfig={{
            type: "spring",
            damping: 20,
            mass: 1.2,
            stiffness: 250,
          }}
        >
          <Sheet.Frame>
            <Sheet.ScrollView>
              <YStack padding="$4" gap="$4">
                {children}
              </YStack>
            </Sheet.ScrollView>
          </Sheet.Frame>
          <Sheet.Overlay
            // animation="lazy"
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />
        </Sheet>
      </Adapt>

      <DialogContentBase ref={ref} {...props}>
        {showCloseButton && (
          <DialogClose>
            <X size="$4" />
          </DialogClose>
        )}
        {children}
      </DialogContentBase>
    </TamaguiDialog.Portal>
  );
});

DialogContentComponent.displayName = "DialogContent";

// AlertDialog components (uses Dialog as base)
interface AlertDialogProps extends DialogProps {
  destructive?: boolean;
}

interface AlertDialogContentProps extends DialogContentProps {
  destructive?: boolean;
}

interface AlertDialogActionProps extends GetProps<typeof Button> {
  destructive?: boolean;
}

// AlertDialog wrapper
export const AlertDialog = React.forwardRef<
  React.ElementRef<typeof Dialog>,
  AlertDialogProps
>(({ children, ...props }, ref) => {
  return (
    <Dialog ref={ref} {...props}>
      {children}
    </Dialog>
  );
});

AlertDialog.displayName = "AlertDialog";

// AlertDialog Trigger (same as Dialog Trigger)
export const AlertDialogTrigger = DialogTrigger;

// AlertDialog Content
export const AlertDialogContent = React.forwardRef<
  React.ElementRef<typeof DialogContentComponent>,
  AlertDialogContentProps
>(({ children, destructive = false, ...props }, ref) => {
  return (
    <DialogContentComponent ref={ref} showCloseButton={false} {...props}>
      {children}
    </DialogContentComponent>
  );
});

AlertDialogContent.displayName = "AlertDialogContent";

// AlertDialog Action
export const AlertDialogAction = React.forwardRef<
  React.ElementRef<typeof Button>,
  AlertDialogActionProps
>(({ destructive = false, ...props }, ref) => {
  return (
    <TamaguiDialog.Close asChild>
      <Button
        ref={ref}
        variant={destructive ? "outlined" : "outlined"}
        {...props}
      />
    </TamaguiDialog.Close>
  );
});

AlertDialogAction.displayName = "AlertDialogAction";

// AlertDialog Cancel
export const AlertDialogCancel = React.forwardRef<
  React.ElementRef<typeof Button>,
  GetProps<typeof Button>
>((props, ref) => {
  return (
    <TamaguiDialog.Close asChild>
      <Button ref={ref} variant="outlined" {...props} />
    </TamaguiDialog.Close>
  );
});

AlertDialogCancel.displayName = "AlertDialogCancel";

// Export re-styled components
export {
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
};

// Alias exports for consistency
export const DialogContent = DialogContentComponent;
export const AlertDialogHeader = DialogHeader;
export const AlertDialogFooter = DialogFooter;
export const AlertDialogTitle = DialogTitle;
export const AlertDialogDescription = DialogDescription;

// Export types
export type {
  DialogProps,
  DialogContentProps,
  DialogTriggerProps,
  AlertDialogProps,
  AlertDialogContentProps,
  AlertDialogActionProps,
};