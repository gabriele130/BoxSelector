import { Checkbox } from "@/components/ui/checkbox";
import { Home, Building, Sprout, Store } from "lucide-react";
import { WasteType } from "@/contexts/BookingContext";

interface WasteTypeCardProps {
  type: WasteType;
  title: string;
  description: string;
  icon: "home" | "building" | "plant" | "store";
  examples: string[];
  isSelected: boolean;
  onToggle: () => void;
}

export function WasteTypeCard({
  type,
  title,
  description,
  icon,
  examples,
  isSelected,
  onToggle,
}: WasteTypeCardProps) {
  const getIcon = () => {
    switch (icon) {
      case "home":
        return <Home className="h-6 w-6" />;
      case "building":
        return <Building className="h-6 w-6" />;
      case "plant":
        return <Sprout className="h-6 w-6" />;
      case "store":
        return <Store className="h-6 w-6" />;
      default:
        return <Home className="h-6 w-6" />;
    }
  };

  return (
    <div
      className={`relative bg-black border ${
        isSelected
          ? "border-2 border-primary bg-black"
          : "border-gray-700"
      } rounded-lg p-5 transition-all hover:border-primary cursor-pointer`}
      onClick={onToggle}
      data-waste-type={type}
    >
      <div className="absolute right-4 top-4">
        <Checkbox checked={isSelected} onCheckedChange={onToggle} className="h-5 w-5" />
      </div>
      
      <div className="flex items-start">
        <div
          className={`mr-4 flex-shrink-0 w-12 h-12 rounded-full ${
            isSelected ? "bg-primary-800/50" : "bg-gray-700"
          } flex items-center justify-center`}
        >
          <div className={isSelected ? "text-white" : "text-white"}>
            {getIcon()}
          </div>
        </div>
        
        <div>
          <h3 className="font-medium text-lg text-white">{title}</h3>
          <p className="text-sm text-gray-300 mb-3">{description}</p>
          
          <div className="grid grid-cols-2 gap-x-4 gap-y-1">
            {examples.map((example, index) => (
              <div key={index} className="text-xs text-gray-300 flex items-center">
                <span className="mr-1.5">•</span> {example}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
