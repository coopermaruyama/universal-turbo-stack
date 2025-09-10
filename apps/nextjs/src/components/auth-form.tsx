"use client";

import {
  CheckCircle,
  CircleAlert,
  Eye,
  EyeOff,
  Fingerprint,
  MessageCircle,
} from "lucide-react";
// import { Platform } from "react-native";
import { useRouter } from "next/navigation";
import type React from "react";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth/client";
import { Alert, AlertDescription, AlertTitle } from "@/ui/alert";
import { Button } from "@/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/ui/card";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import { Separator } from "@/ui/separator";

import { ThemeToggle } from "./theme-toggle";

// SIWE imports
declare global {
  interface Window {
    // biome-ignore lint/suspicious/noExplicitAny: ignored using `--suppress`
    ethereum?: any;
  }
}

// Add Google component since it's used but not imported
const Google = ({
  width,
  height,
  color,
}: {
  width: number;
  height: number;
  color: string;
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-label="Google"
  >
    <title>Google</title>
    <circle cx="12" cy="12" r="10"></circle>
    <path d="M12 8v8"></path>
    <path d="M8 12h8"></path>
  </svg>
);

// TypeScript declaration for H2 component
const H2: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className="text-2xl font-bold">{children}</h2>
);

// TypeScript declaration for Text component
const Text: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span>{children}</span>
);

// SocialButton component
function SocialButton({
  // biome-ignore lint/correctness/noUnusedFunctionParameters: ignored using `--suppress`
  provider,
  onPress,
  isLoading,
  children,
  icon,
  className = "",
}: {
  provider: string;
  onPress: () => void;
  isLoading: boolean;
  children: React.ReactNode;
  icon: React.ReactNode;
  className?: string;
}) {
  return (
    <Button
      variant="outline"
      className={`flex w-full flex-row ${className}`}
      onClick={onPress}
      disabled={isLoading}
    >
      <div style={{ marginRight: 8 }}>{icon}</div>
      {children}
    </Button>
  );
}

export default function AuthForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");

  // Email/Password form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, _setName] = useState("");

  // SIWE state
  const [_walletConnected, _setWalletConnected] = useState(false);
  const [_walletAddress, _setWalletAddress] = useState("");

  // Check if wallet is already connected
  useEffect(() => {
    checkWalletConnection();
  }, []);

  const checkWalletConnection = async () => {
    // if (typeof window !== "undefined" && window.ethereum) {
    //   try {
    //     const accounts = await window.ethereum.request({
    //       method: "eth_accounts",
    //     });
    //     if (accounts.length > 0) {
    //       setWalletConnected(true);
    //       setWalletAddress(accounts[0]);
    //     }
    //   } catch (error) {
    //     console.error("Error checking wallet connection:", error);
    //   }
    // }
  };

  const handleEmailPasswordAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      if (authMode === "signup") {
        const { error } = await authClient.signUp.email({
          email,
          password,
          name,
        });
        if (error) {
          throw new Error(error.message || "Sign up failed");
        }
        setSuccess(
          "Account created! Please check your email to verify your account.",
        );
        router.replace("/");
      } else {
        const { error } = await authClient.signIn.email({
          email,
          password,
        });
        if (error) {
          throw new Error(error.message || "Sign in failed");
        }
        setSuccess("Signed in successfully!");
        router.replace("/");
      }
    // biome-ignore lint/suspicious/noExplicitAny: ignored using `--suppress`
    } catch (err: any) {
      setError(err.message ?? "Authentication failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialAuth = async (provider: "google" | "apple" | "discord") => {
    setIsLoading(true);
    setError("");

    try {
      const { error } = await authClient.signIn.social(
        {
          provider,
          callbackURL: "/",
        },
        {
          onSuccess: (response) => {
            console.debug("Social Auth Success:", response);
            router.replace("/");
          },
        },
      );
      if (error) {
        throw new Error(error.message || `${provider} authentication failed`);
      }
    // biome-ignore lint/suspicious/noExplicitAny: ignored using `--suppress`
    } catch (err: any) {
      setError(err.message || `${provider} authentication failed`);
    } finally {
      setIsLoading(false);
    }
  };

  // SIWE Functions
  const _connectWallet = async () => {
    // if (!window.ethereum) {
    //   setError("Please install MetaMask or another Ethereum wallet");
    //   return;
    // }
    // try {
    //   setIsLoading(true);
    //   const accounts = await window.ethereum.request({
    //     method: "eth_requestAccounts",
    //   });
    //   if (accounts.length > 0) {
    //     setWalletConnected(true);
    //     setWalletAddress(accounts[0]);
    //     setSuccess("Wallet connected successfully!");
    //   }
    // } catch (error: any) {
    //   setError(error.message || "Failed to connect wallet");
    // } finally {
    //   setIsLoading(false);
    // }
  };

  const _handleSIWE = async () => {
    //     if (!walletConnected) {
    //       await connectWallet();
    //       return;
    //     }
    //     setIsLoading(true);
    //     setError("");
    //     try {
    //       // Step 1: Get nonce from server
    //       const nonceResponse = await fetch("/api/auth/siwe/nonce", {
    //         method: "POST",
    //       });
    //       const { nonce } = await nonceResponse.json();
    //       // Step 2: Create SIWE message
    //       const domain = window.location.host;
    //       const origin = window.location.origin;
    //       const statement = "Sign in with Ethereum to the app.";
    //       const message = `${domain} wants you to sign in with your Ethereum account:
    // ${walletAddress}
    // ${statement}
    // URI: ${origin}
    // Version: 1
    // Chain ID: 1
    // Nonce: ${nonce}
    // Issued At: ${new Date().toISOString()}`;
    //       // Step 3: Sign message
    //       const signature = await window.ethereum.request({
    //         method: "personal_sign",
    //         params: [message, walletAddress],
    //       });
    //       // Step 4: Verify signature and create session
    //       const verifyResponse = await fetch("/api/auth/siwe/verify", {
    //         method: "POST",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify({
    //           message,
    //           signature,
    //           address: walletAddress,
    //         }),
    //       });
    //       if (verifyResponse.ok) {
    //         setSuccess("Successfully signed in with Ethereum!");
    //       } else {
    //         const data = await verifyResponse.json();
    //         setError(data.error || "SIWE verification failed");
    //       }
    //     } catch (error: any) {
    //       if (error.code === 4001) {
    //         setError("User rejected the signature request");
    //       } else {
    //         setError(error.message || "SIWE authentication failed");
    //       }
    //     } finally {
    //       setIsLoading(false);
    //     }
  };

  const handlePasskeyAuth = async () => {
    const _ = await authClient.signIn.passkey({
      autoFill: true,
      email,
    });
    // setIsLoading(true);
    // setError("");
    // try {
    //   // Check if WebAuthn is supported
    //   if (!window.PublicKeyCredential) {
    //     throw new Error("WebAuthn is not supported in this browser");
    //   }
    //   if (authMode === "signup") {
    //     // Simulate passkey registration
    //     const credential = await navigator.credentials.create({
    //       publicKey: {
    //         challenge: new Uint8Array(32),
    //         rp: { name: "Multi-Auth Demo" },
    //         user: {
    //           id: new Uint8Array(16),
    //           name: email || "user@example.com",
    //           displayName: name || "Demo User",
    //         },
    //         pubKeyCredParams: [{ alg: -7, type: "public-key" }],
    //         authenticatorSelection: {
    //           authenticatorAttachment: "platform",
    //           userVerification: "required",
    //         },
    //         timeout: 60000,
    //         attestation: "direct",
    //       },
    //     });
    //     if (credential) {
    //       setSuccess("Passkey registered successfully!");
    //     }
    //   } else {
    //     // Simulate passkey authentication
    //     const credential = await navigator.credentials.get({
    //       publicKey: {
    //         challenge: new Uint8Array(32),
    //         timeout: 60000,
    //         userVerification: "required",
    //       },
    //     });
    //     if (credential) {
    //       setSuccess("Signed in with passkey!");
    //     }
    //   }
    // } catch (err: any) {
    //   if (err.name === "NotAllowedError") {
    //     setError("Passkey authentication was cancelled");
    //   } else {
    //     setError(err.message || "Passkey authentication failed");
    //   }
    // } finally {
    //   setIsLoading(false);
    // }
  };

  // Render Sign Up Form (No Tabs)
  // if (authMode === "signup") {
  //   return (
  //     <SignUpForm
  //       error={error}
  //       success={success}
  //       name={name}
  //       setName={setName}
  //       email={email}
  //       setEmail={setEmail}
  //       password={password}
  //       setPassword={setPassword}
  //       showPassword={showPassword}
  //       setShowPassword={setShowPassword}
  //       isLoading={isLoading}
  //       handleSocialAuth={handleSocialAuth}
  //       setAuthMode={setAuthMode}
  //       handleEmailPasswordAuth={handleEmailPasswordAuth}
  //     />
  //   );
  // }
  const isSignupMode = authMode === "signup";
  // Render Sign In Form (With Tabs)
  return (
    <div className="mx-auto flex min-h-screen items-center justify-center bg-background px-4 py-12 transition-colors sm:px-6 lg:px-8">
      <ThemeToggle />
      <Card className="w-full max-w-md border-muted bg-card px-6">
        <CardHeader>
          <CardTitle className="mb-2 text-center">
            <H2>{isSignupMode ? "Create Account" : "Welcome Back"}</H2>
          </CardTitle>
          <CardDescription className="text-center">
            <Text>
              {isSignupMode
                ? "Sign up with email or social account"
                : "Sign in to your account"}
            </Text>
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert className="mb-4 border-muted" variant={"destructive"}>
              <CircleAlert className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {success && (
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}

          {/* <EmailPasskeyTabs
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            isLoading={isLoading}
            handlePasskeyAuth={handlePasskeyAuth}
          /> */}

          <div /* form replacement */ className="flex flex-col gap-4">
            <div className="gap-2">
              <Label htmlFor="signin-email">Email</Label>
              <Input
                id="signin-email"
                placeholder="john@example.com"
                value={email}
                spellCheck={false}
                // autoCorrect={false}
                onChange={(e) => setEmail(e.target.value)}
                autoCapitalize="none"
                autoComplete="email"
                // keyboardType="email-address"
                // textContentType="emailAddress"
              />
            </div>
            <div className="gap-2 space-y-2">
              <Label htmlFor="signin-password">Password</Label>
              <div className="relative">
                <Input
                  id="signin-password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={showPassword ? "text" : "password"}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 h-8 w-8 -translate-y-1/2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
            </div>
            <Button
              className="w-full"
              disabled={isLoading}
              onClick={(e) => handleEmailPasswordAuth(e)}
            >
              <Text>
                {isLoading
                  ? isSignupMode
                    ? "Creating Account..."
                    : "Signing In..."
                  : isSignupMode
                    ? "Create Account"
                    : "Sign In"}
              </Text>
            </Button>
          </div>

          <div className="mt-6">
            <Separator className="bg-muted dark:bg-muted" />
            <div className="mb-4 mt-4 w-full text-center text-xs text-muted-foreground dark:text-muted-foreground">
              Or continue with
            </div>

            <div className="flex flex-col gap-2">
              {!isSignupMode && (
                <SocialButton
                  provider="passkey"
                  onPress={() => handlePasskeyAuth()}
                  isLoading={isLoading}
                  icon={<Fingerprint width={18} height={18} color="#ccc" />}
                >
                  Continue with Passkey
                </SocialButton>
              )}
              <SocialButton
                provider="google"
                onPress={() => handleSocialAuth("google")}
                isLoading={isLoading}
                icon={<Google width={14} height={14} color="#ccc" />}
              >
                Continue with Google
              </SocialButton>
              <SocialButton
                provider="discord"
                onPress={() => handleSocialAuth("discord")}
                isLoading={isLoading}
                icon={<MessageCircle width={14} height={14} color="#ccc" />}
              >
                Continue with Discord
              </SocialButton>
            </div>
          </div>

          <div className="mt-6 text-center">
            <Button
              variant="link"
              onClick={() => {
                setAuthMode((v) => (v === "signin" ? "signup" : "signin"));
                setError(""); // Clear error when switching modes
              }}
            >
              <Text>
                {isSignupMode
                  ? "Already have an account? Sign in"
                  : "Don't have an account? Create one"}
              </Text>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
