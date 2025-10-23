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
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-blue-50 to-cyan-50 dark:from-background dark:via-blue-950 dark:to-cyan-950">
      <div className="max-w-3xl mx-auto text-center space-y-12">
        <div className="space-y-6">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary shadow-lg mb-4 animate-fade-in">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-fade-in">
            User Authentication System
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in">
            A secure platform for user registration and login built with Supabase and modern web technologies
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-scale-in">
          {isAuthenticated ? (
            <Button
              onClick={() => navigate("/profile")}
              size="lg"
              className="group relative w-full sm:w-64 h-14 rounded-xl bg-gradient-to-r from-primary to-secondary hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] transition-all duration-300 hover:scale-105 active:scale-95"
            >
              Go to Profile
            </Button>
          ) : (
            <>
              <Button
                onClick={() => navigate("/login")}
                size="lg"
                className="group relative w-full sm:w-64 h-14 rounded-xl bg-gradient-to-r from-primary to-secondary hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <UserPlus className="w-5 h-5 mr-2" />
                User Login / Register
              </Button>
              <Button
                onClick={() => navigate("/admin/login")}
                size="lg"
                variant="outline"
                className="group relative w-full sm:w-64 h-14 rounded-xl border-2 border-primary/50 bg-white/50 dark:bg-card/50 backdrop-blur-sm hover:bg-primary/10 hover:border-primary hover:shadow-[0_0_30px_rgba(20,184,166,0.4)] transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <Shield className="w-5 h-5 mr-2" />
                Admin Login
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
