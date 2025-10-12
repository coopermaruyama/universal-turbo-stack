<<<<<<< HEAD
export { Portal, PortalHost } from "@rn-primitives/portal";
export { cn } from "./lib/utils";
=======
import { cx } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: Parameters<typeof cx>) => twMerge(cx(inputs));
>>>>>>> upstream/main
