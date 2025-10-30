import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ShieldAlert, Terminal } from "lucide-react";

export const MyAlert = () => {
  return (
    <Alert  className="mt-10 flex ilex items-center justify-center h-20">
      <ShieldAlert style={{width: 40}} color="#ff0000" className="text-4xl"/>
      <AlertTitle className="flex items-center justify-between">Heads up!  </AlertTitle>
      <AlertDescription>
        You can add components and dependencies to your app using the cli.sdfsdafsdfsdf
      </AlertDescription>
      <ShieldAlert style={{width: 40}} color="#ff0000" />
    </Alert>
  );
};
