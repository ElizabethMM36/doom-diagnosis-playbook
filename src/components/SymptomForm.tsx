import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Stethoscope, Activity } from "lucide-react";

interface SymptomFormProps {
  onSubmit: (symptoms: string[]) => void;
}

export const SymptomForm = ({ onSubmit }: SymptomFormProps) => {
  const [symptoms, setSymptoms] = useState<string[]>([""]);
  const [additionalInfo, setAdditionalInfo] = useState("");

  const addSymptom = () => {
    setSymptoms([...symptoms, ""]);
  };

  const updateSymptom = (index: number, value: string) => {
    const newSymptoms = [...symptoms];
    newSymptoms[index] = value;
    setSymptoms(newSymptoms);
  };

  const removeSymptom = (index: number) => {
    if (symptoms.length > 1) {
      setSymptoms(symptoms.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = () => {
    const validSymptoms = symptoms.filter(s => s.trim());
    if (additionalInfo.trim()) {
      validSymptoms.push(additionalInfo);
    }
    if (validSymptoms.length > 0) {
      onSubmit(validSymptoms);
    }
  };

  return (
    <Card className="w-full max-w-2xl shadow-ominous animate-slide-in-ominous">
      <CardHeader className="text-center border-b border-border">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Stethoscope className="h-8 w-8 text-medical-danger" />
          <Activity className="h-6 w-6 text-medical-warning animate-pulse" />
        </div>
        <CardTitle className="text-2xl font-bold text-medical-death">
          Medical Symptom Assessment
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Please describe your symptoms in detail for the most accurate diagnosis
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div>
            <Label className="text-sm font-medium text-foreground">Primary Symptoms</Label>
            {symptoms.map((symptom, index) => (
              <div key={index} className="flex gap-2 mt-2">
                <Input
                  placeholder={`Symptom ${index + 1}`}
                  value={symptom}
                  onChange={(e) => updateSymptom(index, e.target.value)}
                  className="flex-1"
                />
                {symptoms.length > 1 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeSymptom(index)}
                    className="text-medical-danger hover:bg-medical-danger hover:text-white"
                  >
                    ×
                  </Button>
                )}
              </div>
            ))}
            <Button
              variant="ghost"
              size="sm"
              onClick={addSymptom}
              className="mt-2 text-medical-warning hover:bg-medical-warning hover:text-white"
            >
              + Add Another Symptom
            </Button>
          </div>

          <div>
            <Label htmlFor="additional" className="text-sm font-medium text-foreground">
              Additional Information
            </Label>
            <Textarea
              id="additional"
              placeholder="Any other details about your condition, duration, severity, etc."
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
              className="mt-2 min-h-[100px]"
            />
          </div>

          <Button
            variant="medical"
            size="lg"
            onClick={handleSubmit}
            className="w-full mt-6 text-lg font-semibold"
            disabled={symptoms.every(s => !s.trim()) && !additionalInfo.trim()}
          >
            Begin Diagnostic Assessment
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};