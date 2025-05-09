import { Recycle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="p-4 md:p-6 border-b border-gray-800">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Recycle className="h-6 w-6 text-blue-500" />
            <h1 className="text-xl font-bold">Waste Management</h1>
          </div>
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              className="p-2 text-sm text-gray-300 hover:text-white"
            >
              Help
            </Button>
            <Button
              className="p-2 text-sm bg-blue-700 hover:bg-blue-600 rounded-md"
            >
              Log In
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
