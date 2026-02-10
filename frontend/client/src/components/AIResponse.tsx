import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface AIResponseProps {
  response: string | null;
  error: string | null;
}

export function AIResponse({ response, error }: AIResponseProps) {
  if (!response && !error) return null;

  return (
    <AnimatePresence mode="wait">
      {error ? (
        <motion.div
          key="error"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-lg mx-auto mt-8"
        >
          <div className="p-4 rounded-xl bg-destructive/5 border border-destructive/20 text-destructive flex items-center gap-3">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p className="font-medium">{error}</p>
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="response"
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="w-full max-w-2xl mx-auto mt-12"
        >
          <Card className="overflow-hidden border-border/50 shadow-xl shadow-primary/5 bg-white/50 backdrop-blur-sm rounded-2xl">
            <div className="h-1 w-full bg-gradient-to-r from-primary via-purple-400 to-pink-400" />
            <CardContent className="p-8">
              <div className="flex items-start gap-4">
                <div className="mt-1 p-2 rounded-lg bg-primary/10 text-primary">
                  <Bot className="w-5 h-5" />
                </div>
                <div className="prose prose-slate prose-sm max-w-none">
                  <p className="font-mono text-base leading-relaxed text-foreground/90 whitespace-pre-wrap">
                    {response}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
