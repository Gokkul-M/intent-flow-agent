import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, AlertTriangle, CheckCircle } from "lucide-react";

interface TransactionPreviewProps {
  functionName: string;
  contractAddress: string;
  parameters: Record<string, any>;
  estimatedGas: string;
  onConfirm: () => void;
  onReject: () => void;
  isLoading?: boolean;
}

export const TransactionPreview = ({
  functionName,
  contractAddress,
  parameters,
  estimatedGas,
  onConfirm,
  onReject,
  isLoading = false
}: TransactionPreviewProps) => {
  return (
    <Card className="gradient-card border-primary/20 shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-success" />
            Transaction Preview
          </CardTitle>
          <Badge variant="outline" className="text-primary border-primary/50">
            BlockDAG Testnet
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Function Details */}
        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium text-muted-foreground">Function</label>
            <p className="text-sm font-mono bg-muted p-2 rounded">{functionName}</p>
          </div>
          
          <div>
            <label className="text-sm font-medium text-muted-foreground">Contract</label>
            <div className="flex items-center gap-2">
              <p className="text-sm font-mono bg-muted p-2 rounded flex-1">
                {contractAddress.slice(0, 6)}...{contractAddress.slice(-4)}
              </p>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ExternalLink className="h-3 w-3" />
              </Button>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground">Parameters</label>
            <div className="bg-muted p-3 rounded space-y-1">
              {Object.entries(parameters).map(([key, value]) => (
                <div key={key} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{key}:</span>
                  <span className="font-mono">{String(value)}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground">Estimated Gas</label>
            <p className="text-sm bg-muted p-2 rounded">{estimatedGas}</p>
          </div>
        </div>

        {/* Warning */}
        <div className="flex items-start gap-2 p-3 bg-warning/10 border border-warning/20 rounded-lg">
          <AlertTriangle className="h-4 w-4 text-warning mt-0.5" />
          <div className="text-sm">
            <p className="font-medium text-warning">Review Carefully</p>
            <p className="text-muted-foreground">
              This transaction will be sent to the BlockDAG Primordial Testnet. Make sure all details are correct.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2">
          <Button
            variant="outline"
            onClick={onReject}
            disabled={isLoading}
            className="flex-1"
          >
            Reject
          </Button>
          <Button
            variant="success"
            onClick={onConfirm}
            disabled={isLoading}
            className="flex-1"
          >
            {isLoading ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent mr-2" />
                Sending...
              </>
            ) : (
              "Confirm & Send"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};