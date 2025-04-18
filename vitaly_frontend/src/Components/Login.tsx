import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { toast } from "sonner";
import { Eye, EyeOff, LogIn } from 'lucide-react';

interface AuthCardProps {
  isRegister?: boolean;
  onSubmit?: (values: { email: string; password: string; name?: string }) => void;
}

const Login: React.FC<AuthCardProps> = ({ 
  isRegister = false, 
  onSubmit 
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password || (isRegister && !name)) {
      toast.error("Error", {
        description: "Please fill in all fields"
      });
      return;
    }

    if (onSubmit) {
      onSubmit({ email, password, name });
    } else {
      // Default demo behavior
      toast.success(isRegister ? "Account created" : "Login successful", {
        description: isRegister ? "Account created successfully" : "Logged in successfully"
      });
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white p-8 rounded-2xl shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-6">
        {isRegister ? 'Create an Account' : 'Welcome Back'}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {isRegister && (
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        )}
        
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pr-10"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>
        
        {!isRegister && (
          <div className="text-right">
            <a href="#" className="text-sm text-blue-600 hover:underline">
              Forgot password?
            </a>
          </div>
        )}
        
        <Button type="submit" className="w-full gap-2 bg-[#1E2536] hover:bg-[#273045] text-white py-6 rounded-full">
          <LogIn size={18} />
          {isRegister ? 'Create Account' : 'Sign In'}
        </Button>
      </form>
      
      <div className="mt-6 text-center text-sm">
        {isRegister ? (
          <p>
            Already have an account?{' '}
            <a href="/login" className="text-blue-600 hover:underline">
              Sign in
            </a>
          </p>
        ) : (
          <p>
            Don't have an account?{' '}
            <a href="/register" className="text-blue-600 hover:underline">
              Create an account
            </a>
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;