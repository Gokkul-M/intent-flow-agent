import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Clock, CheckCircle, AlertCircle, Loader } from "lucide-react";

interface IntentLogProps {
  id: string;
  prompt: string;
  functionName: string;
  txHash?: string;
  status: "pending" | "success" | "failed";
  timestamp: Date;
  gasUsed?: string;
}

export const IntentLogCard = ({ 
  id, 
  prompt, 
  functionName, 
  txHash, 
  status, 
  timestamp,
  gasUsed 
}: IntentLogProps) => {
  const getStatusIcon = () => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-success" />;
      case "failed":
        return <AlertCircle className="h-4 w-4 text-destructive" />;
      case "pending":
        return <Loader className="h-4 w-4 text-warning animate-spin" />;
    }
  };

  const getStatusBadge = () => {
    const variants = {
      success: "bg-success/10 text-success border-success/20",
      failed: "bg-destructive/10 text-destructive border-destructive/20",
      pending: "bg-warning/10 text-warning border-warning/20"
    };

    return (
      <Badge variant="outline" className={variants[status]}>
        {getStatusIcon()}
        <span className="ml-1 capitalize">{status}</span>
      </Badge>
    );
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {timestamp.toLocaleDateString()} at {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
          {getStatusBadge()}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <label className="text-sm font-medium text-muted-foreground">User Prompt</label>
          <p className="text-sm bg-muted p-2 rounded mt-1">{prompt}</p>
        </div>

        <div>
          <label className="text-sm font-medium text-muted-foreground">Executed Function</label>
          <p className="text-sm font-mono bg-muted p-2 rounded mt-1">{functionName}</p>
        </div>

        {txHash && (
          <div>
            <label className="text-sm font-medium text-muted-foreground">Transaction Hash</label>
            <div className="flex items-center gap-2 mt-1">
              <p className="text-sm font-mono bg-muted p-2 rounded flex-1">
                {txHash.slice(0, 8)}...{txHash.slice(-8)}
              </p>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ExternalLink className="h-3 w-3" />
              </Button>
            </div>
          </div>
        )}

        {gasUsed && status === "success" && (
          <div>
            <label className="text-sm font-medium text-muted-foreground">Gas Used</label>
            <p className="text-sm bg-muted p-2 rounded mt-1">{gasUsed}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};