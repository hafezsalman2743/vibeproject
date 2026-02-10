import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { checkMarks, MarksResponse } from "@/services/api";
import { CheckCircle2, XCircle, Calculator } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function MarksChecker() {
    const [marks, setMarks] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<MarksResponse | null>(null);
    const { toast } = useToast();

    const handleCheck = async (e: React.FormEvent) => {
        e.preventDefault();
        const marksNum = parseFloat(marks);

        if (isNaN(marksNum) || marksNum < 0 || marksNum > 100) {
            toast({
                title: "Invalid input",
                description: "Please enter a valid mark between 0 and 100",
                variant: "destructive",
            });
            return;
        }

        setLoading(true);
        setResult(null);

        try {
            const response = await checkMarks(marksNum);
            if (response.error) {
                throw new Error(response.error);
            }
            setResult(response);
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.message,
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="w-full max-w-md mx-auto shadow-lg border-primary/20">
            <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                        <Calculator className="w-5 h-5" />
                    </div>
                    <CardTitle className="text-xl">Math Marks Checker</CardTitle>
                </div>
                <CardDescription>
                    Enter your math marks to see if you passed or failed.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <form onSubmit={handleCheck} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="marks">Math Marks (0-100)</Label>
                        <Input
                            id="marks"
                            type="number"
                            placeholder="e.g. 75"
                            value={marks}
                            onChange={(e) => setMarks(e.target.value)}
                            min="0"
                            max="100"
                            step="0.1"
                            required
                        />
                    </div>
                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? "Checking..." : "Check Status"}
                    </Button>
                </form>

                <AnimatePresence mode="wait">
                    {result && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            className={`p-4 rounded-xl border flex flex-col items-center text-center gap-2 ${result.status === "Pass"
                                    ? "bg-green-500/10 border-green-500/20 text-green-700 dark:text-green-400"
                                    : "bg-red-500/10 border-red-500/20 text-red-700 dark:text-red-400"
                                }`}
                        >
                            <div className="mb-1">
                                {result.status === "Pass" ? (
                                    <CheckCircle2 className="w-10 h-10" />
                                ) : (
                                    <XCircle className="w-10 h-10" />
                                )}
                            </div>
                            <h3 className="text-2xl font-black uppercase tracking-wider">
                                {result.status}
                            </h3>
                            <p className="text-sm font-medium opacity-80">
                                {result.message}
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </CardContent>
        </Card>
    );
}
