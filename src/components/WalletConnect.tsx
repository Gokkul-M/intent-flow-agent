import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Wallet, Check, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const WalletConnect = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState<string>("");
  const [isConnecting, setIsConnecting] = useState(false);
  const { toast } = useToast();

  const connectWallet = async () => {
    setIsConnecting(true);
    
    try {
      // Simulate wallet connection
      setTimeout(() => {
        const mockAddress = "0x742d35Cc6C3F3f6a9C6bB7F7B8e6F8Df2E4F8B1";
        setAddress(mockAddress);
        setIsConnected(true);
        setIsConnecting(false);
        toast({
          title: "Wallet Connected",
          description: `Connected to ${mockAddress.slice(0, 6)}...${mockAddress.slice(-4)}`,
        });
      }, 1500);
    } catch (error) {
      setIsConnecting(false);
      toast({
        variant: "destructive",
        title: "Connection Failed",
        description: "Please try again or check your wallet.",
      });
    }
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    setAddress("");
    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been disconnected.",
    });
  };

  if (isConnected) {
    return (
      <div className="flex items-center space-x-2">
        <div className="hidden sm:flex items-center space-x-2 px-3 py-2 bg-success/10 border border-success/20 rounded-md">
          <Check className="h-4 w-4 text-success" />
          <span className="text-sm font-medium text-success">
            {address.slice(0, 6)}...{address.slice(-4)}
          </span>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={disconnectWallet}
          className="text-destructive hover:text-destructive"
        >
          Disconnect
        </Button>
      </div>
    );
  }

  return (
    <Button
      onClick={connectWallet}
      disabled={isConnecting}
      className="bg-gradient-to-r from-primary to-accent text-white hover:from-primary/90 hover:to-accent/90"
    >
      {isConnecting ? (
        <>
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          Connecting...
        </>
      ) : (
        <>
          <Wallet className="h-4 w-4" />
          Connect Wallet
        </>
      )}
    </Button>
  );
};