import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, ArrowRight, Users } from "lucide-react";
import { motion } from "framer-motion";
import { User as UserEntity } from "@/entities/User";

export default function MemberLogin({ onLoginSuccess }) {
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = async () => {
    setIsLoggingIn(true);
    try {
      await UserEntity.login();
      // After successful login, the page will reload and user will be authenticated
    } catch (error) {
      console.error("Login error:", error);
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                <Users className="w-8 h-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-white">
              Member Access
            </CardTitle>
            <Badge className="bg-blue-600 text-white mt-2">
              CRE AI Studio Resources
            </Badge>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-blue-100 text-center leading-relaxed">
              Circle community members get free access to all PDF resources. 
              Please log in with your member account.
            </p>
            
            <Button
              size="lg"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium"
              onClick={handleLogin}
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                "Logging in..."
              ) : (
                <>
                  <User className="mr-2 w-4 h-4" />
                  Login as Member
                  <ArrowRight className="ml-2 w-4 h-4" />
                </>
              )}
            </Button>

            <div className="text-center pt-4 border-t border-white/20">
              <p className="text-blue-100 text-sm">
                Not a member yet?{" "}
                <button 
                  className="text-blue-300 hover:text-white underline"
                  onClick={() => window.location.href = '/Payment'}
                >
                  Join the Circle Community
                </button>
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}