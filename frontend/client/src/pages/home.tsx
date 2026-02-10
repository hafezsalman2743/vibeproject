import React, { useState } from "react";
import { AIInput } from "@/components/AIInput";
import { AIResponse } from "@/components/AIResponse";
import { predict } from "@/services/api";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { LogOut, User as UserIcon } from "lucide-react";
import { MarksChecker } from "@/components/MarksChecker";

export default function Home() {
  const { user, logout } = useAuth();
  const [response, setResponse] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handlePredict = async (input: string) => {
    setIsLoading(true);
    setError(null);
    setResponse(null);

    // Artificial delay for better UX
    await new Promise(resolve => setTimeout(resolve, 600));

    const result = await predict(input);

    if (result.error) {
      setError(result.error);
    } else {
      setResponse(result.result || "No response received.");
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center p-6 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-50 via-background to-background">
      {/* Header */}
      <header className="w-full max-w-6xl flex justify-between items-center mb-12">
        <div className="text-xl font-bold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
          Vibe AI
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-muted/50 border text-sm font-medium">
            <UserIcon className="w-4 h-4" />
            {user?.email}
          </div>
          <Button variant="outline" size="sm" onClick={logout} className="gap-2">
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </header>

      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-12 mb-20">
        <div className="flex flex-col items-center gap-8 order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center space-y-4"
          >
            <div className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-wide uppercase mb-2">
              Beta Preview
            </div>
            <h1 className="text-5xl font-bold tracking-tight text-foreground">
              AI Predictor
            </h1>
            <p className="text-lg text-muted-foreground max-w-md mx-auto leading-relaxed">
              Welcome, <span className="text-foreground font-medium">{user?.email?.split('@')[0]}</span>.
              Start getting intelligent predictions now.
            </p>
          </motion.div>

          <div className="w-full mt-4">
            <AIInput onSubmit={handlePredict} isLoading={isLoading} />
          </div>

          <div className="w-full min-h-[200px]">
            <AIResponse response={response} error={error} />
          </div>
        </div>

        <div className="flex flex-col items-center justify-center order-1 lg:order-2">
          <MarksChecker />
        </div>
      </div>


      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="fixed bottom-6 text-sm text-muted-foreground/30 font-mono"
      >
        Vibe Project © 2026
      </motion.footer>
    </div>
  );
}

