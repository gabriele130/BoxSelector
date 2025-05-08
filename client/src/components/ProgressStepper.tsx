import { MapPin, Trash2, Truck, FileText, Calendar, CreditCard } from "lucide-react";

interface ProgressStepperProps {
  currentStep: number;
}

interface Step {
  id: number;
  title: string;
  icon: React.ReactNode;
}

export function ProgressStepper({ currentStep }: ProgressStepperProps) {
  const steps: Step[] = [
    { id: 1, title: "Postcode", icon: <MapPin className="h-5 w-5" /> },
    { id: 2, title: "Waste Type", icon: <Trash2 className="h-5 w-5" /> },
    { id: 3, title: "Select Skip", icon: <Truck className="h-5 w-5" /> },
    { id: 4, title: "Permit Check", icon: <FileText className="h-5 w-5" /> },
    { id: 5, title: "Choose Date", icon: <Calendar className="h-5 w-5" /> },
    { id: 6, title: "Payment", icon: <CreditCard className="h-5 w-5" /> },
  ];

  return (
    <div className="mb-10">
      <div className="flex items-center justify-between">
        <div className="w-full flex items-center">
          {steps.map((step, index) => (
            <div key={step.id} className="flex flex-col items-center relative flex-1">
              <div
                className={`w-10 h-10 rounded-full border-2 flex items-center justify-center mb-2 ${
                  step.id < currentStep
                    ? "border-emerald-500 bg-emerald-500/10 text-emerald-500"
                    : step.id === currentStep
                    ? "border-primary text-primary"
                    : "border-gray-800 text-gray-600"
                }`}
              >
                {step.icon}
              </div>
              <div
                className={`text-xs absolute -bottom-6 text-center w-24 ${
                  step.id <= currentStep ? "text-primary-300" : "text-gray-500"
                }`}
              >
                {step.title}
              </div>
              
              {index < steps.length - 1 && (
                <div
                  className={`absolute left-0 top-5 h-0.5 w-full ${
                    step.id < currentStep
                      ? "bg-emerald-500/50"
                      : "bg-primary-800"
                  }`}
                  style={{ left: "50%", width: "100%" }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
