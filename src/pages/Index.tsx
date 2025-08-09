import { useState } from "react";
import { SymptomForm } from "@/components/SymptomForm";
import { PersonalityTest } from "@/components/PersonalityTest";
import { DiagnosisResult } from "@/components/DiagnosisResult";
import { Stethoscope, Skull, AlertTriangle } from "lucide-react";

type AppState = "welcome" | "symptoms" | "personality" | "diagnosis";

const Index = () => {
  const [appState, setAppState] = useState<AppState>("welcome");
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [personalityScore, setPersonalityScore] = useState(0);

  const handleSymptomsSubmit = (userSymptoms: string[]) => {
    setSymptoms(userSymptoms);
    setAppState("personality");
  };

  const handlePersonalityComplete = (score: number) => {
    setPersonalityScore(score);
    setAppState("diagnosis");
  };

  const handleRestart = () => {
    setAppState("welcome");
    setSymptoms([]);
    setPersonalityScore(0);
  };

  const WelcomeScreen = () => (
    <div className="text-center space-y-8 animate-slide-in-ominous">
      <div className="space-y-4">
        <div className="flex items-center justify-center gap-4 mb-6">
          <Stethoscope className="h-16 w-16 text-medical-danger" />
          <Skull className="h-12 w-12 text-medical-death animate-pulse" />
          <AlertTriangle className="h-14 w-14 text-medical-warning" />
        </div>
        <h1 className="text-6xl font-bold bg-gradient-danger bg-clip-text text-transparent mb-4">
          Hypochondriapp
        </h1>
        <p className="text-2xl text-medical-death font-semibold">
          The Medical App That Always Finds The Worst
        </p>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Enter your symptoms and let our advanced AI diagnose you with the most catastrophic diseases imaginable. 
          Your personality will determine just how doomed you really are.
        </p>
      </div>
      
      <div className="bg-muted/30 p-6 rounded-lg border border-medical-danger/20 max-w-xl mx-auto">
        <h3 className="text-lg font-semibold text-medical-death mb-3">⚠️ Medical Disclaimer</h3>
        <p className="text-sm text-muted-foreground">
          This app is designed for entertainment purposes only. All diagnoses are completely fabricated 
          and should not be used for actual medical advice. Please consult real doctors for real problems.
        </p>
      </div>

      <button
        onClick={() => setAppState("symptoms")}
        className="bg-gradient-danger text-white px-8 py-4 rounded-lg text-xl font-semibold 
                   hover:shadow-danger transition-all duration-300 transform hover:scale-105 
                   shadow-ominous"
      >
        Begin Medical Assessment
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Stethoscope className="h-8 w-8 text-medical-danger" />
              <h1 className="text-2xl font-bold text-medical-death">Hypochondriapp</h1>
            </div>
            {appState !== "welcome" && (
              <button
                onClick={handleRestart}
                className="text-sm text-muted-foreground hover:text-medical-danger transition-colors"
              >
                Start Over
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[calc(100vh-120px)]">
          {appState === "welcome" && <WelcomeScreen />}
          {appState === "symptoms" && (
            <SymptomForm onSubmit={handleSymptomsSubmit} />
          )}
          {appState === "personality" && (
            <PersonalityTest onComplete={handlePersonalityComplete} />
          )}
          {appState === "diagnosis" && (
            <DiagnosisResult
              symptoms={symptoms}
              personalityScore={personalityScore}
              onRestart={handleRestart}
            />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border mt-auto">
        <div className="container mx-auto px-4 py-4 text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 Hypochondriapp - Making hypochondria fun since today
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;