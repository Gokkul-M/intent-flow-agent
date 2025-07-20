import { useState, useEffect, useRef } from "react";
import { Navbar } from "@/components/Navbar";
import { ChatInput } from "@/components/ChatInput";
import { MessageBubble } from "@/components/MessageBubble";
import { TransactionPreview } from "@/components/TransactionPreview";
import { Card, CardContent } from "@/components/ui/card";
import { Bot, Sparkles, Wallet } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

interface PendingTransaction {
  functionName: string;
  contractAddress: string;
  parameters: Record<string, any>;
  estimatedGas: string;
}

export const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your Web3 assistant. I can help you interact with smart contracts on the BlockDAG Primordial Testnet. Try saying something like:\n\n• 'Swap 100 USDC for ETH'\n• 'Mint an NFT on collection 0x123...'\n• 'Delegate 50 tokens to validator xyz'\n\nWhat would you like to do?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [pendingTx, setPendingTx] = useState<PendingTransaction | null>(null);
  const [isSendingTx, setIsSendingTx] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const addMessage = (content: string, isUser: boolean) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      isUser,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const simulateAIResponse = async (userMessage: string) => {
    setIsLoading(true);
    setIsTyping(true);
    
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Enhanced intent parsing with more sophisticated responses
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes("swap") || lowerMessage.includes("exchange")) {
      setIsTyping(false);
      const aiResponse = "I understand you want to swap tokens. Let me analyze the best route and prepare that transaction for you.";
      addMessage(aiResponse, false);
      
      // Show transaction preview
      setPendingTx({
        functionName: "swapExactTokensForTokens",
        contractAddress: "0x742d35Cc6C3F3f6a9C6bB7F7B8e6F8Df2E4F8B1A",
        parameters: {
          amountIn: "100000000", // 100 USDC (6 decimals)
          amountOutMin: "0.098234567", // Min ETH out
          path: "['0xA0b86a33E6441...', '0xC02aaA39b223...']",
          to: "0x742d35Cc6C3F3f6a9C6bB7F7B8e6F8Df2E4F8B1",
          deadline: Math.floor(Date.now() / 1000) + 1200
        },
        estimatedGas: "180,000 gas (~$12.50)"
      });
    } else if (lowerMessage.includes("nft") || lowerMessage.includes("mint")) {
      setIsTyping(false);
      const aiResponse = "Perfect! I'll help you mint an NFT. I found a verified collection on the BlockDAG Testnet. Here's your transaction preview:";
      addMessage(aiResponse, false);
      
      setPendingTx({
        functionName: "mintNFT",
        contractAddress: "0x9C8f4B7F6B5A3C2D1E0F9A8B7C6D5E4F3A2B1C0D",
        parameters: {
          to: "0x742d35Cc6C3F3f6a9C6bB7F7B8e6F8Df2E4F8B1",
          tokenURI: "ipfs://QmYourNFTMetadataHash",
          quantity: "1"
        },
        estimatedGas: "85,000 gas (~$5.80)"
      });
    } else if (lowerMessage.includes("delegate") || lowerMessage.includes("stake")) {
      setIsTyping(false);
      const aiResponse = "I'll help you delegate your tokens. This will stake them with a validator to earn rewards. Here's the delegation preview:";
      addMessage(aiResponse, false);
      
      setPendingTx({
        functionName: "delegate",
        contractAddress: "0xA1B2C3D4E5F6789012345678901234567890123456",
        parameters: {
          validator: "validator_xyz123",
          amount: "50000000000000000000", // 50 tokens (18 decimals)
          delegator: "0x742d35Cc6C3F3f6a9C6bB7F7B8e6F8Df2E4F8B1"
        },
        estimatedGas: "120,000 gas (~$8.20)"
      });
    } else if (lowerMessage.includes("balance") || lowerMessage.includes("check")) {
      setIsTyping(false);
      const aiResponse = "I can check your token balances! Here's what I found:\n\n• ETH: 2.45 ETH\n• USDC: 1,250.00 USDC\n• BDAG: 500.00 BDAG\n\nWould you like to perform any operations with these tokens?";
      addMessage(aiResponse, false);
    } else {
      setIsTyping(false);
      const responses = [
        "I can help you with Web3 transactions! Try commands like:\n• 'Swap 100 USDC for ETH'\n• 'Mint an NFT'\n• 'Delegate 50 tokens'\n• 'Check my balance'",
        "I specialize in blockchain interactions. Could you be more specific about what you'd like to do? For example, swapping tokens, minting NFTs, or staking?",
        "I understand you want to interact with the blockchain. Please specify the type of transaction - like swapping, minting, delegating, or checking balances."
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      addMessage(randomResponse, false);
    }
    
    setIsLoading(false);
    setIsTyping(false);
  };

  const handleSendMessage = (message: string) => {
    addMessage(message, true);
    simulateAIResponse(message);
  };

  const handleConfirmTransaction = async () => {
    if (!pendingTx) return;
    
    setIsSendingTx(true);
    
    // Simulate transaction submission
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const txHash = "0x" + Math.random().toString(16).substr(2, 64);
    
    addMessage(
      `✅ Transaction sent successfully!\n\nTransaction Hash: ${txHash}\n\nYou can track its progress on the BlockDAG explorer. The transaction should confirm in 1-2 minutes.`,
      false
    );
    
    toast({
      title: "Transaction Sent",
      description: `TX: ${txHash.slice(0, 8)}...${txHash.slice(-8)}`,
    });
    
    setPendingTx(null);
    setIsSendingTx(false);
  };

  const handleRejectTransaction = () => {
    addMessage("Transaction cancelled. Is there anything else I can help you with?", false);
    setPendingTx(null);
  };

  const connectWallet = () => {
    setWalletConnected(!walletConnected);
    toast({
      title: walletConnected ? "Wallet Disconnected" : "Wallet Connected",
      description: walletConnected ? "MetaMask has been disconnected" : "MetaMask connected successfully",
    });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full px-2 sm:px-4">
        {/* Header */}
        <div className="border-b p-3 sm:p-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                <Bot className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h1 className="font-semibold">Intellichain Assistant</h1>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <Sparkles className="h-3 w-3" />
                  AI-powered Web3 interactions
                </p>
              </div>
            </div>
            <button
              onClick={connectWallet}
              className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                walletConnected 
                  ? "bg-success/10 text-success border border-success/20" 
                  : "bg-muted hover:bg-muted/80"
              }`}
            >
              <Wallet className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">{walletConnected ? "Connected" : "Connect Wallet"}</span>
              <span className="sm:hidden">{walletConnected ? "✓" : "Connect"}</span>
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-1 sm:px-4 py-2 sm:py-4 space-y-2 sm:space-y-4">
          {messages.map((message) => (
            <MessageBubble
              key={message.id}
              message={message.content}
              isUser={message.isUser}
              timestamp={message.timestamp}
            />
          ))}
          
          {/* AI Thinking Indicator */}
          {(isLoading || isTyping) && (
            <div className="flex gap-3 p-4 animate-fade-in">
              <div className="h-8 w-8 bg-muted rounded-full flex items-center justify-center">
                <Bot className="h-4 w-4" />
              </div>
              <div className="bg-muted rounded-lg px-3 py-2">
                <div className="flex items-center gap-1">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                  <span className="text-sm text-muted-foreground ml-2">
                    {isTyping ? "Analyzing request..." : "Thinking..."}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Auto-scroll anchor */}
          <div ref={messagesEndRef} />

          {/* Transaction Preview */}
          {pendingTx && (
            <div className="mx-4 animate-scale-in">
              <TransactionPreview
                functionName={pendingTx.functionName}
                contractAddress={pendingTx.contractAddress}
                parameters={pendingTx.parameters}
                estimatedGas={pendingTx.estimatedGas}
                onConfirm={handleConfirmTransaction}
                onReject={handleRejectTransaction}
                isLoading={isSendingTx}
              />
            </div>
          )}

          {/* Suggestions */}
          {messages.length === 1 && !isLoading && !walletConnected && (
            <div className="mx-4 animate-fade-in">
              <Card className="gradient-card border-warning/20 bg-warning/5">
                <CardContent className="p-4">
                  <h3 className="font-medium mb-2 text-warning flex items-center gap-2">
                    <Wallet className="h-4 w-4" />
                    Wallet Required
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Connect your MetaMask wallet to execute transactions on the BlockDAG Testnet.
                  </p>
                  <button
                    onClick={connectWallet}
                    className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
                  >
                    Connect Wallet
                  </button>
                </CardContent>
              </Card>
            </div>
          )}

          {messages.length === 1 && !isLoading && walletConnected && (
            <div className="mx-4 animate-fade-in">
              <Card className="gradient-card border-primary/20">
                <CardContent className="p-4">
                  <h3 className="font-medium mb-3 text-primary">Try these examples:</h3>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {[
                      "Swap 100 USDC for ETH",
                      "Mint an NFT",
                      "Delegate 50 tokens",
                      "Check my balance"
                    ].map((example, index) => (
                      <button
                        key={index}
                        onClick={() => handleSendMessage(example)}
                        className="text-left text-sm p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors hover-scale border border-transparent hover:border-primary/20"
                      >
                        {example}
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        {/* Input */}
        <ChatInput
          onSendMessage={handleSendMessage}
          isLoading={isLoading || isSendingTx}
        />
      </div>
    </div>
  );
};