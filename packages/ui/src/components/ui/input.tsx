import { cn } from "@acme/ui/lib/utils";
import type * as React from "react";
import type { TextInputProps } from "react-native";
import { TextInput } from "react-native";

function Input({
  className,
  placeholderClassName,
  ...props
}: TextInputProps & {
  ref?: React.RefObject<TextInput>;
}) {
  return (
    <TextInput
      className={cn(
        "web:flex native:h-12 web:w-full web:py-2 native:text-lg native:leading-[1.25] web:ring-offset-background web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2 h-10 rounded-md border border-input bg-background px-3 text-base text-foreground file:border-0 file:bg-transparent file:font-medium placeholder:text-muted-foreground lg:text-sm",
        props.editable === false && "web:cursor-not-allowed opacity-50",
        className,
      )}
      placeholderClassName={cn("text-muted-foreground", placeholderClassName)}
      {...props}
    />
  );
}

export { Input };
