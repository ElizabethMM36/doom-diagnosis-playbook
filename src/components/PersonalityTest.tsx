import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Brain, AlertTriangle } from "lucide-react";

interface PersonalityTestProps {
  onComplete: (score: number) => void;
}

const questions = [
  {
    question: "How often do you worry about your health?",
    options: [
      { text: "Never", value: 1 },
      { text: "Rarely", value: 2 },
      { text: "Sometimes", value: 3 },
      { text: "Often", value: 4 },
      { text: "Constantly", value: 5 }
    ]
  },
  {
    question: "When you feel unwell, what do you usually think?",
    options: [
      { text: "It's probably nothing", value: 1 },
      { text: "I should monitor it", value: 2 },
      { text: "I should see a doctor soon", value: 3 },
      { text: "This could be serious", value: 4 },
      { text: "I'm definitely dying", value: 5 }
    ]
  },
  {
    question: "How do you handle uncertainty?",
    options: [
      { text: "Very well", value: 1 },
      { text: "Pretty well", value: 2 },
      { text: "Okay", value: 3 },
      { text: "Poorly", value: 4 },
      { text: "I panic immediately", value: 5 }
    ]
  },
  {
    question: "Your general outlook on life is:",
    options: [
      { text: "Very optimistic", value: 1 },
      { text: "Mostly positive", value: 2 },
      { text: "Neutral", value: 3 },
      { text: "Somewhat pessimistic", value: 4 },
      { text: "Doom and gloom", value: 5 }
    ]
  },
  {
    question: "How often do you Google your symptoms?",
    options: [
      { text: "Never", value: 1 },
      { text: "Rarely", value: 2 },
      { text: "Sometimes", value: 3 },
      { text: "Frequently", value: 4 },
      { text: "Every single symptom", value: 5 }
    ]
  }
];

export const PersonalityTest = ({ onComplete }: PersonalityTestProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const handleNext = () => {
    if (selectedAnswer !== null) {
      const newAnswers = [...answers, selectedAnswer];
      setAnswers(newAnswers);
      
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        // Calculate total score
        const totalScore = newAnswers.reduce((sum, score) => sum + score, 0);
        onComplete(totalScore);
      }
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <Card className="w-full max-w-2xl shadow-ominous animate-slide-in-ominous">
      <CardHeader className="text-center border-b border-border">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Brain className="h-8 w-8 text-medical-warning" />
          <AlertTriangle className="h-6 w-6 text-medical-danger animate-pulse" />
        </div>
        <CardTitle className="text-2xl font-bold text-medical-death">
          Psychological Assessment
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Your mental state affects diagnosis severity. Answer honestly.
        </CardDescription>
        <div className="w-full bg-muted rounded-full h-2 mt-4">
          <div 
            className="bg-gradient-danger h-2 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          Question {currentQuestion + 1} of {questions.length}
        </p>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-medical-death">
            {questions[currentQuestion].question}
          </h3>
          
          <RadioGroup
            value={selectedAnswer?.toString() || ""}
            onValueChange={(value) => setSelectedAnswer(parseInt(value))}
            className="space-y-3"
          >
            {questions[currentQuestion].options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem value={option.value.toString()} id={`option-${index}`} />
                <Label 
                  htmlFor={`option-${index}`} 
                  className="flex-1 cursor-pointer hover:text-medical-danger transition-colors"
                >
                  {option.text}
                </Label>
              </div>
            ))}
          </RadioGroup>

          <Button
            variant="medical"
            size="lg"
            onClick={handleNext}
            disabled={selectedAnswer === null}
            className="w-full mt-6 text-lg font-semibold"
          >
            {currentQuestion < questions.length - 1 ? "Next Question" : "Complete Assessment"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};