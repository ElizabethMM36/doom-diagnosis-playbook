import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skull, Heart, Flame, AlertTriangle, RefreshCw } from "lucide-react";

interface DiagnosisResultProps {
  symptoms: string[];
  personalityScore: number;
  onRestart: () => void;
}

interface Diagnosis {
  disease: string;
  severity: "Critical" | "Terminal" | "Fatal" | "Catastrophic";
  timeLeft: string;
  description: string;
  outcome: "death" | "chronic suffering" | "mild discomfort";
  afterlife?: "heaven" | "hell";
}

const diseases = [
  {
    disease: "Acute Existential Dread Syndrome",
    severity: "Terminal" as const,
    timeLeft: "3-7 days",
    description: "A rare condition where the patient realizes the futility of existence while experiencing mild headaches.",
    outcome: "death" as const,
    afterlife: undefined as "heaven" | "hell" | undefined
  },
  {
    disease: "Catastrophic Paper Cut Disease",
    severity: "Fatal" as const,
    timeLeft: "2 hours",
    description: "What appeared to be a simple paper cut has evolved into a civilization-ending plague.",
    outcome: "death" as const,
    afterlife: undefined as "heaven" | "hell" | undefined
  },
  {
    disease: "Terminal Monday-itis",
    severity: "Critical" as const,
    timeLeft: "Until Friday",
    description: "An incurable condition that affects millions every week. Symptoms worsen during alarm clock exposure.",
    outcome: "chronic suffering" as const,
    afterlife: undefined as "heaven" | "hell" | undefined
  },
  {
    disease: "Malignant Procrastination Disorder",
    severity: "Catastrophic" as const,
    timeLeft: "Eventually",
    description: "Patient will die from putting off important medical treatment. Death scheduled for sometime next week.",
    outcome: "death" as const,
    afterlife: undefined as "heaven" | "hell" | undefined
  },
  {
    disease: "Acute Netflix Dependency",
    severity: "Terminal" as const,
    timeLeft: "One more episode",
    description: "Fatal addiction to binge-watching. Patient's eyes will eventually fall out from screen exposure.",
    outcome: "chronic suffering" as const,
    afterlife: undefined as "heaven" | "hell" | undefined
  },
  {
    disease: "Spontaneous Meme Overdose",
    severity: "Critical" as const,
    timeLeft: "LOL seconds",
    description: "Patient has consumed too many internet memes. Brain cells are converting to emojis.",
    outcome: "death" as const,
    afterlife: undefined as "heaven" | "hell" | undefined
  }
];

export const DiagnosisResult = ({ symptoms, personalityScore, onRestart }: DiagnosisResultProps) => {
  const [diagnosis, setDiagnosis] = useState<Diagnosis | null>(null);
  const [isRevealing, setIsRevealing] = useState(true);

  useEffect(() => {
    // Generate diagnosis based on symptoms and personality
    const baseDiagnosis = diseases[Math.floor(Math.random() * diseases.length)];
    
    // Personality score affects outcome (higher score = worse outcome)
    let finalDiagnosis = { ...baseDiagnosis };
    
    if (personalityScore >= 20) {
      finalDiagnosis.outcome = "death";
      finalDiagnosis.severity = "Catastrophic";
    } else if (personalityScore >= 15) {
      finalDiagnosis.severity = "Fatal";
    }
    
    // Determine afterlife based on symptoms and personality
    if (finalDiagnosis.outcome === "death") {
      // More symptoms + higher anxiety = more likely to go to hell
      const hellProbability = (symptoms.length * 0.2) + (personalityScore * 0.02);
      finalDiagnosis.afterlife = Math.random() < hellProbability ? "hell" : "heaven";
    }
    
    setTimeout(() => {
      setDiagnosis(finalDiagnosis);
      setIsRevealing(false);
    }, 2000);
  }, [symptoms, personalityScore]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Critical": return "bg-medical-warning";
      case "Terminal": return "bg-medical-danger";
      case "Fatal": return "bg-medical-death";
      case "Catastrophic": return "bg-gradient-death";
      default: return "bg-muted";
    }
  };

  const getAfterlifeContent = () => {
    if (!diagnosis?.afterlife) return null;
    
    if (diagnosis.afterlife === "heaven") {
      return (
        <Card className="mt-6 border-medical-heaven bg-gradient-heaven/10">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-2">
              <Heart className="h-12 w-12 text-medical-heaven" />
            </div>
            <CardTitle className="text-xl text-medical-heaven">
              Congratulations! You're going to Heaven!
            </CardTitle>
            <CardDescription>
              Despite your terrible fate, your pure heart has earned you eternal bliss.
            </CardDescription>
          </CardHeader>
        </Card>
      );
    } else {
      return (
        <Card className="mt-6 border-medical-hell bg-gradient-hell/10">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-2">
              <Flame className="h-12 w-12 text-medical-hell animate-pulse" />
            </div>
            <CardTitle className="text-xl text-medical-hell">
              Welcome to Eternal Damnation!
            </CardTitle>
            <CardDescription className="text-medical-hell/80">
              Your symptoms were clearly caused by your sinful lifestyle. Enjoy the flames!
            </CardDescription>
          </CardHeader>
        </Card>
      );
    }
  };

  if (isRevealing) {
    return (
      <Card className="w-full max-w-2xl shadow-ominous animate-slide-in-ominous">
        <CardContent className="pt-12 pb-12 text-center">
          <AlertTriangle className="h-16 w-16 text-medical-danger mx-auto mb-4 animate-pulse" />
          <h2 className="text-2xl font-bold text-medical-death mb-4">
            Analyzing Your Condition...
          </h2>
          <p className="text-muted-foreground">
            Our advanced AI is determining your fate...
          </p>
          <div className="animate-pulse mt-8">
            <div className="h-2 bg-gradient-danger rounded w-3/4 mx-auto"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!diagnosis) return null;

  return (
    <div className="w-full max-w-2xl space-y-6 animate-slide-in-ominous">
      <Card className="shadow-ominous border-medical-danger">
        <CardHeader className="text-center border-b border-border bg-gradient-danger/5">
          <div className="flex justify-center mb-2">
            <Skull className="h-12 w-12 text-medical-danger" />
          </div>
          <CardTitle className="text-3xl font-bold text-medical-death">
            DIAGNOSIS COMPLETE
          </CardTitle>
          <CardDescription className="text-lg text-medical-danger font-semibold">
            Medical Assessment Results
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-medical-death mb-2">
                {diagnosis.disease}
              </h3>
              <Badge className={`${getSeverityColor(diagnosis.severity)} text-white text-lg px-4 py-1`}>
                {diagnosis.severity}
              </Badge>
            </div>
            
            <div className="bg-muted/50 p-4 rounded-lg">
              <p className="text-medical-death font-semibold mb-2">Time Remaining:</p>
              <p className="text-2xl font-bold text-medical-danger">{diagnosis.timeLeft}</p>
            </div>
            
            <div className="bg-muted/50 p-4 rounded-lg">
              <p className="text-medical-death font-semibold mb-2">Prognosis:</p>
              <p className="text-foreground">{diagnosis.description}</p>
            </div>
            
            <div className="bg-muted/50 p-4 rounded-lg">
              <p className="text-medical-death font-semibold mb-2">Your Symptoms Led To:</p>
              <ul className="list-disc list-inside text-sm text-muted-foreground">
                {symptoms.map((symptom, index) => (
                  <li key={index}>{symptom}</li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {getAfterlifeContent()}

      <div className="text-center space-y-4">
        <p className="text-sm text-muted-foreground italic">
          *This diagnosis is 100% accurate and scientifically verified by our team of imaginary doctors.
        </p>
        <Button
          variant="medical"
          size="lg"
          onClick={onRestart}
          className="text-lg font-semibold"
        >
          <RefreshCw className="mr-2 h-5 w-5" />
          Get Another Opinion
        </Button>
      </div>
    </div>
  );
};