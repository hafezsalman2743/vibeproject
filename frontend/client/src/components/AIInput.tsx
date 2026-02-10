import React, { useState } from "react";
import { Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

interface AIInputProps {
  onSubmit: (value: string) => void;
  isLoading: boolean;
}

export function AIInput({ onSubmit, isLoading }: AIInputProps) {
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      onSubmit(value);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      onSubmit={handleSubmit}
      className="w-full max-w-lg mx-auto relative group"
    >
      <div className="relative flex items-center">
        <Sparkles className="absolute left-4 w-5 h-5 text-primary/50 group-focus-within:text-primary transition-colors duration-300" />
        <Input
          type="text"
          placeholder="Ask something wonderful..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={isLoading}
          data-testid="input-query"
          className="pl-12 pr-32 h-14 text-lg bg-white shadow-sm border-gray-200 focus-visible:ring-primary/20 focus-visible:border-primary rounded-2xl transition-all duration-300 hover:shadow-md"
        />
        <div className="absolute right-2">
          <Button 
            type="submit" 
            disabled={!value.trim() || isLoading}
            size="sm"
            data-testid="button-submit"
            className="h-10 px-4 rounded-xl font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 shadow-sm hover:shadow-md active:scale-95"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Thinking
              </span>
            ) : (
              <span className="flex items-center gap-2">
                Run
                <Send className="w-4 h-4" />
              </span>
            )}
          </Button>
        </div>
      </div>
    </motion.form>
  );
}
