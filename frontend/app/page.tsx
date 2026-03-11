'use client';

import Link from 'next/link';
import { Bot, Shield, Zap, Activity, ArrowRight, Github, Twitter, Linkedin } from 'lucide-react';

export default function LandingPage() {
  const features = [
    {
      icon: Bot,
      title: 'AI Issue Detection',
      description: 'Advanced AI algorithms detect and classify IT issues in real-time with high accuracy.',
    },
    {
      icon: Zap,
      title: 'Automated Troubleshooting',
      description: 'Follow predefined playbooks to resolve common IT issues without human intervention.',
    },
    {
      icon: Shield,
      title: 'Smart Incident Creation',
      description: 'Automatically create and prioritize incidents when issues require escalation.',
    },
    {
      icon: Activity,
      title: 'Proactive Device Monitoring',
      description: 'Continuous monitoring of device health and performance metrics.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="text-xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            AI Virtual Support
          </div>
          <div className="flex items-center space-x-4">
            <Link
              href="/login"
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              Start Demo
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            AI Powered IT Support Automation
          </h1>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Resolve IT issues instantly using intelligent AI troubleshooting agents. Reduce MTTR and improve employee productivity.
          </p>
          <div className="flex items-center justify-center space-x-4">
            <Link
              href="/signup"
              className="px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center"
            >
              Start Demo
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="/login"
              className="px-8 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
            >
              Login
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-secondary/10">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="glass-panel rounded-2xl p-6 hover:scale-105 transition-transform"
                >
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Architecture Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">How It Works</h2>
            <div className="glass-panel rounded-2xl p-8">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1 text-left">
                    <h3 className="font-semibold">1. User Message</h3>
                    <p className="text-sm text-muted-foreground">User reports an IT issue</p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-primary" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex-1 text-left">
                    <h3 className="font-semibold">2. AI Intent Detection</h3>
                    <p className="text-sm text-muted-foreground">NLP classifies the issue type</p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-primary" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex-1 text-left">
                    <h3 className="font-semibold">3. Scenario Classification</h3>
                    <p className="text-sm text-muted-foreground">Match with support playbook</p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-primary" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex-1 text-left">
                    <h3 className="font-semibold">4. Retrieve Playbook</h3>
                    <p className="text-sm text-muted-foreground">Load troubleshooting steps</p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-primary" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex-1 text-left">
                    <h3 className="font-semibold">5. Generate Response</h3>
                    <p className="text-sm text-muted-foreground">Provide step-by-step guidance</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4">AI Virtual Support</h3>
              <p className="text-sm text-muted-foreground">
                Enterprise-grade IT support automation powered by artificial intelligence.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Features</li>
                <li>Pricing</li>
                <li>Demo</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>About</li>
                <li>Blog</li>
                <li>Careers</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <div className="flex space-x-4">
                <Github className="h-5 w-5 text-muted-foreground hover:text-foreground cursor-pointer" />
                <Twitter className="h-5 w-5 text-muted-foreground hover:text-foreground cursor-pointer" />
                <Linkedin className="h-5 w-5 text-muted-foreground hover:text-foreground cursor-pointer" />
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            © 2024 AI Virtual Support Agent. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}