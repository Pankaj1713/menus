import * as React from "react";

import { cn } from "@/lib/utils";
import { isDesktop } from "@/lib/hooks/Diamensions";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { setIsAddToCart } from "@/lib/store/slices/models.slice";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

interface CustomModelProps {
  children: React.ReactNode;
  trigger?: React.ReactNode;
  title?: string;
  description?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
  contentClassName?: string;
  setOpenModel?: (open: boolean) => void;
  closeModel?: () => void;
}

export function CustomModel({
  children,
  trigger,
  title = "Dialog Title",
  description,
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
  className,
  closeModel,
  setOpenModel,
  contentClassName,
}: CustomModelProps) {
  const dispatch = useDispatch();
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false);
  const isDesktopp = isDesktop();

  const open = controlledOpen ?? uncontrolledOpen;

  if (isDesktopp) {
    return (
      <Dialog open={open} onOpenChange={closeModel}>
        <DialogContent
          className={cn(
            "sm:max-w-[425px] lg:h-[80vh] overflow-y-auto !border-none",
            contentClassName
          )}
        >
          <DialogHeader>
            <DialogTitle className="border-none">{title}</DialogTitle>
            {description && (
              <DialogDescription>{description}</DialogDescription>
            )}
          </DialogHeader>
          {children}
        </DialogContent>
      </Dialog>
    );
  }
  return (
    <Drawer open={open} onOpenChange={closeModel}>
      <DrawerContent className={cn("!border-none !p-0", contentClassName)}>
        <DrawerHeader className="text-left !p-0 !m-0 ">
          <DrawerTitle className="border-none h-0 bg-slate-400 ">
            {title}
          </DrawerTitle>
          {description && <DrawerDescription>{description}</DrawerDescription>}
        </DrawerHeader>
        <ScrollArea className="h-[80vh] border-none w-full rounded-md border">
          <div className=" px-4 pb-10">{children}</div>
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  );
}
