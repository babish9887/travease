import * as React from "react";

import { cn } from "../../lib/utils";
import { Search } from "lucide-react";
import { Button } from "./button";

const Input = React.forwardRef(({ className, type, icon, ...props }, ref) => {
  console.log(icon);

  return (
    <div className="relative flex gap-2 items-center">
      <input
        type={type}
        className={cn(
          "flex h-10 text-black w-full rounded-md border border-input bg-background px-4 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:black focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
      {icon ? (
        <Search className="absolute right-3 cursor-pointer w-5 h-5 text-orange" />
      ) : (
        <Button className="absolute right-0 bg-orange hover:bg-orange/90">
          Subscribe
        </Button>
      )}
    </div>
  );
});
Input.displayName = "Input";

export { Input };
