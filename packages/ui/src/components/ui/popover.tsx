import { cn } from "@acme/ui/lib/utils";
import { TextClassContext } from "@acme/ui/text";
import * as PopoverPrimitive from "@rn-primitives/popover";
import { Platform, StyleSheet } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

const Popover = PopoverPrimitive.Root;

const PopoverTrigger = PopoverPrimitive.Trigger;

function PopoverContent({
  className,
  align = "center",
  sideOffset = 4,
  portalHost,
  ...props
}: PopoverPrimitive.ContentProps & {
  ref?: React.RefObject<PopoverPrimitive.ContentRef>;
  portalHost?: string;
}) {
  return (
    <PopoverPrimitive.Portal hostName={portalHost}>
      <PopoverPrimitive.Overlay
        style={Platform.OS !== "web" ? StyleSheet.absoluteFill : undefined}
      >
        <Animated.View entering={FadeIn.duration(200)} exiting={FadeOut}>
          <TextClassContext.Provider value="text-popover-foreground">
            <PopoverPrimitive.Content
              align={align}
              sideOffset={sideOffset}
              className={cn(
                "web:cursor-auto web:outline-none web:data-[side=bottom]:slide-in-from-top-2 web:data-[side=left]:slide-in-from-right-2 web:data-[side=right]:slide-in-from-left-2 web:data-[side=top]:slide-in-from-bottom-2 web:animate-in web:zoom-in-95 web:fade-in-0 z-50 w-72 rounded-md border border-border bg-popover p-4 shadow-md shadow-foreground/5",
                className,
              )}
              {...props}
            />
          </TextClassContext.Provider>
        </Animated.View>
      </PopoverPrimitive.Overlay>
    </PopoverPrimitive.Portal>
  );
}

export { Popover, PopoverContent, PopoverTrigger };
