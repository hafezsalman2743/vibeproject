import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Rocket, Shield, Zap, ArrowRight } from "lucide-react";

export default function Landing() {
    return (
        <div className="min-h-screen bg-background">
            {/* Navigation */}
            <nav className="fixed top-0 w-full z-50 border-b bg-background/80 backdrop-blur-md">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
                        Vibe Project
                    </div>
                    <div className="flex gap-4">
                        <Link href="/sign-in">
                            <Button variant="ghost">Sign In</Button>
                        </Link>
                        <Link href="/sign-up">
                            <Button>Sign Up</Button>
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-4">
                <div className="container mx-auto text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-5xl md:text-7xl font-bold mb-6 tracking-tight"
                    >
                        Experience the <span className="text-primary">Next Generation</span> of Vibe
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto"
                    >
                        A powerful platform built for speed, security, and seamless collaboration.
                        Join thousands of users today.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        <Link href="/sign-up">
                            <Button size="lg" className="px-8 h-12 text-lg gap-2">
                                Get Started <ArrowRight className="w-5 h-5" />
                            </Button>
                        </Link>
                        <Button size="lg" variant="outline" className="px-8 h-12 text-lg">
                            Learn More
                        </Button>
                    </motion.div>
                </div>
            </section>

            {/* Features */}
            <section className="py-20 bg-muted/50">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={<Zap className="w-8 h-8 text-primary" />}
                            title="Lightning Fast"
                            description="Built with Vite and optimized for performance, ensuring a snappy experience."
                        />
                        <FeatureCard
                            icon={<Shield className="w-8 h-8 text-primary" />}
                            title="Secure by Design"
                            description="Enterprise-grade security powered by Firebase Authentication."
                        />
                        <FeatureCard
                            icon={<Rocket className="w-8 h-8 text-primary" />}
                            title="Scalable Backend"
                            description="High-performance FastAPI backend ready to handle your growth."
                        />
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-10 border-t">
                <div className="container mx-auto px-4 text-center text-muted-foreground">
                    <p>© 2026 Vibe Project. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="p-8 rounded-2xl bg-card border shadow-sm"
        >
            <div className="mb-4">{icon}</div>
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <p className="text-muted-foreground">{description}</p>
        </motion.div>
    );
}
