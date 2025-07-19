import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Navbar } from "@/components/Navbar";
import { Link } from "react-router-dom";
import { Bot, Zap, Shield, TrendingUp, MessageSquare, Activity, Users } from "lucide-react";

export const Home = () => {
  const features = [
    {
      icon: MessageSquare,
      title: "Natural Language Processing",
      description: "Describe what you want to do in plain English, and our AI will understand and execute complex Web3 operations."
    },
    {
      icon: Shield,
      title: "Secure Transaction Preview",
      description: "Review every transaction before it's sent. See exactly what will happen on the blockchain."
    },
    {
      icon: Activity,
      title: "Intent Registry",
      description: "Track all your interactions with complete transparency. View your transaction history and intent logs."
    },
    {
      icon: TrendingUp,
      title: "Analytics Dashboard",
      description: "Monitor your Web3 activity with detailed statistics and insights about your blockchain interactions."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="gradient-hero py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <div className="animate-fade-up">
            <div className="mb-8">
              <Bot className="h-16 w-16 mx-auto text-primary mb-4" />
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                  Intellichain Agent
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Your AI-Powered Web3 Assistant for the BlockDAG Primordial Testnet
              </p>
              <p className="text-lg text-muted-foreground mb-12 max-w-3xl mx-auto">
                Transform complex blockchain interactions into simple conversations. 
                Just tell us what you want to do, and we'll handle the rest.
              </p>
            </div>
            
            <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
              <Link to="/chat">
                <Button variant="hero" size="lg" className="w-full sm:w-auto text-lg px-8 py-4">
                  <MessageSquare className="h-5 w-5 mr-2" />
                  Start Chatting
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg px-8 py-4">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Problem & Solution */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Intellichain?</h2>
            <p className="text-lg text-muted-foreground">
              Web3 interactions shouldn't require a computer science degree
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <Card className="gradient-card border-destructive/20">
              <CardContent className="p-8 text-center">
                <div className="h-12 w-12 bg-destructive/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-6 w-6 text-destructive" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-destructive">The Problem</h3>
                <p className="text-muted-foreground">
                  Complex smart contract interactions, confusing interfaces, 
                  and technical barriers prevent mainstream Web3 adoption.
                </p>
              </CardContent>
            </Card>
            
            <Card className="gradient-card border-success/20">
              <CardContent className="p-8 text-center">
                <div className="h-12 w-12 bg-success/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Bot className="h-6 w-6 text-success" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-success">Our Solution</h3>
                <p className="text-muted-foreground">
                  Natural language AI that understands your intent and 
                  translates it into secure, verified blockchain transactions.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Powerful Features</h2>
            <p className="text-lg text-muted-foreground">
              Everything you need for safe, simple Web3 interactions
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="gradient-card hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-2xl">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Connect your wallet and start having conversations with the blockchain.
          </p>
          <Link to="/chat">
            <Button variant="hero" size="lg" className="text-lg px-8 py-4">
              <Users className="h-5 w-5 mr-2" />
              Launch Intellichain
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};