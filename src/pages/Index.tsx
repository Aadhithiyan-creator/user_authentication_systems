import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Shield, UserPlus, LogIn } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
      setIsLoading(false);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        <div className="space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <Shield className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            User Authentication System
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto">
            A secure platform for user registration and login built with Supabase and modern web technologies
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {isAuthenticated ? (
            <Button
              onClick={() => navigate("/profile")}
              size="lg"
              className="rounded-lg w-full sm:w-auto"
            >
              Go to Profile
            </Button>
          ) : (
            <>
              <Button
                onClick={() => navigate("/register")}
                size="lg"
                className="rounded-lg w-full sm:w-auto"
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Register
              </Button>
              <Button
                onClick={() => navigate("/login")}
                variant="outline"
                size="lg"
                className="rounded-lg w-full sm:w-auto"
              >
                <LogIn className="w-4 h-4 mr-2" />
                Login
              </Button>
            </>
          )}
        </div>

        <div className="pt-8 border-t border-border">
          <h2 className="text-xl font-semibold mb-4">Features</h2>
          <div className="grid md:grid-cols-3 gap-6 text-left">
            <div className="space-y-2">
              <h3 className="font-medium">Secure Authentication</h3>
              <p className="text-sm text-muted-foreground">
                Password hashing and session management with Supabase Auth
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">User Profiles</h3>
              <p className="text-sm text-muted-foreground">
                Manage your personal information securely
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">Admin Dashboard</h3>
              <p className="text-sm text-muted-foreground">
                Administrative tools for user management
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
