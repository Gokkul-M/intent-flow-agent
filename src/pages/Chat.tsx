import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { ChatInput } from "@/components/ChatInput";
import { MessageBubble } from "@/components/MessageBubble";
import { TransactionPreview } from "@/components/TransactionPreview";
import { Card, CardContent } from "@/components/ui/card";
import { Bot, Sparkles } from "lucide-react";
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
  const { toast } = useToast();

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
    
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simple intent parsing simulation
    if (userMessage.toLowerCase().includes("swap")) {
      const aiResponse = "I understand you want to swap tokens. Let me prepare that transaction for you.";
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
    } else if (userMessage.toLowerCase().includes("nft") || userMessage.toLowerCase().includes("mint")) {
      const aiResponse = "I'll help you mint an NFT. Here's the transaction preview:";
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
    } else {
      const responses = [
        "I can help you with that! However, I need more specific details. Could you tell me exactly what blockchain operation you'd like to perform?",
        "Interesting request! For safety, I need you to be more specific about the smart contract function you want to execute.",
        "I understand you want to interact with the blockchain. Could you provide more details about the specific transaction you have in mind?"
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      addMessage(randomResponse, false);
    }
    
    setIsLoading(false);
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

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full">
        {/* Header */}
        <div className="border-b p-4">
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
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <MessageBubble
              key={message.id}
              message={message.content}
              isUser={message.isUser}
              timestamp={message.timestamp}
            />
          ))}
          
          {/* AI Thinking Indicator */}
          {isLoading && (
            <div className="flex gap-3 p-4">
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
                  <span className="text-sm text-muted-foreground ml-2">Thinking...</span>
                </div>
              </div>
            </div>
          )}

          {/* Transaction Preview */}
          {pendingTx && (
            <div className="mx-4">
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
          {messages.length === 1 && !isLoading && (
            <div className="mx-4">
              <Card className="gradient-card border-primary/20">
                <CardContent className="p-4">
                  <h3 className="font-medium mb-3 text-primary">Try these examples:</h3>
                  <div className="space-y-2">
                    {[
                      "Swap 100 USDC for ETH on Uniswap",
                      "Mint an NFT from contract 0x123...",
                      "Delegate 50 tokens to validator abc123",
                      "Check my token balance for USDC"
                    ].map((example, index) => (
                      <button
                        key={index}
                        onClick={() => handleSendMessage(example)}
                        className="block w-full text-left text-sm p-2 rounded bg-muted/50 hover:bg-muted transition-colors"
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