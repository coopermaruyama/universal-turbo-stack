import type React from "react";
import { useEffect, useState } from "react";
import { Platform, View } from "react-native";
import { useRouter } from "expo-router";

import { Alert, AlertDescription } from "@acme/ui/alert";
import { Button } from "@acme/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@acme/ui/card";
import { Input } from "@acme/ui/input";
import { Label } from "@acme/ui/label";
import { Separator } from "@acme/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@acme/ui/tabs";
import { Text } from "@acme/ui/text";
import { H1, H2, H3, H4 } from "@acme/ui/typography";

import { authClient } from "~/lib/auth-client";
import { Apple } from "~/lib/icons/Apple";
import { AppleLogo } from "~/lib/icons/AppleLogo";
import { CheckCircle } from "~/lib/icons/CheckCircle";
import { Chrome } from "~/lib/icons/Chrome";
import { CircleAlert } from "~/lib/icons/CircleAlert";
import { Eye } from "~/lib/icons/Eye";
import { EyeOff } from "~/lib/icons/EyeOff";
import { Fingerprint } from "~/lib/icons/Fingerprint";
import { Google } from "~/lib/icons/Google";
import { Mail } from "~/lib/icons/Mail";
import { MessageCircle } from "~/lib/icons/MessageCircle";
import { Wallet } from "~/lib/icons/Wallet";
import { ThemeToggle } from "./theme-toggle";

// SIWE imports
declare global {
  interface Window {
    ethereum?: any;
  }
}

// SocialButton component
function SocialButton({
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
      onPress={onPress}
      disabled={isLoading}
    >
      <View style={{ marginRight: 8 }}>{icon}</View>
      <Text>{children}</Text>
    </Button>
  );
}

// Email/Passkey Tabs component
function EmailPasskeyTabs({
  email,
  setEmail,
  password,
  setPassword,
  showPassword,
  setShowPassword,
  isLoading,
  handlePasskeyAuth,
  onClickSubmit,
}: {
  email: string;
  setEmail: (v: string) => void;
  password: string;
  setPassword: (v: string) => void;
  showPassword: boolean;
  setShowPassword: (v: boolean) => void;
  isLoading: boolean;
  handlePasskeyAuth: () => void;
  onClickSubmit: () => void; // Function to handle email/password submission
}) {
  type TabsValue = "email" | "passkey";
  const [activeTab, setActiveTab] = useState<TabsValue>("email");
  return (
    <Tabs
      value={activeTab}
      onValueChange={(v) => setActiveTab(v as TabsValue)}
      className="w-full"
    >
      <TabsList className="mb-4 h-10 w-full flex-row items-stretch p-1">
        <TabsTrigger
          value="email"
          className="flex-1 flex-row justify-center gap-1.5"
        >
          <Mail className="h-1 w-1 text-foreground" />
          <Text>Email</Text>
        </TabsTrigger>
        <TabsTrigger value="passkey" className="flex-1 flex-row justify-center">
          <Fingerprint className="mr-2 h-4 w-4" />
          <Text>Passkey</Text>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="email" className="space-y-4">
        <View className="gap-4">
          <View className="gap-2">
            <Label htmlFor="signin-email">Email</Label>
            <Input
              id="signin-email"
              placeholder="john@example.com"
              value={email}
              onChangeText={setEmail}
            />
          </View>
          <View className="gap-2 space-y-2">
            <Label htmlFor="signin-password">Password</Label>
            <View className="relative">
              <Input
                id="signin-password"
                placeholder="••••••••"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 h-8 w-8 -translate-y-1/2"
                onPress={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Eye className="h-4 w-4 text-muted-foreground" />
                )}
              </Button>
            </View>
          </View>
          <Button
            className="w-full"
            disabled={isLoading}
            onPress={() => onClickSubmit()}
          >
            <Text>{isLoading ? "Signing In..." : "Sign In"}</Text>
          </Button>
        </View>
      </TabsContent>

      <TabsContent value="passkey" className="space-y-4">
        <View className="items-center space-y-4">
          <View className="mx-auto flex h-16 w-16 items-center justify-center rounded-full">
            <Fingerprint className="h-8 w-8" />
          </View>
          <View>
            <Text className="font-medium">Sign in with Passkey</Text>
            <Text className="mt-1 text-sm">
              Use your registered passkey to sign in securely
            </Text>
          </View>
          <Button
            variant="outline"
            className="w-full"
            onPress={handlePasskeyAuth}
            disabled={isLoading}
          >
            {isLoading ? "Authenticating..." : "Sign In with Passkey"}
          </Button>
        </View>
      </TabsContent>
    </Tabs>
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
  const [name, setName] = useState("");

  // SIWE state
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");

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
        const { data, error } = await authClient.signUp.email({
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
        router.push("/");
      } else {
        const { data, error } = await authClient.signIn.email({
          email,
          password,
        });
        if (error) {
          throw new Error(error.message || "Sign in failed");
        }
        setSuccess("Signed in successfully!");
        router.push("/");
      }
    } catch (err: any) {
      setError(err.message || "Authentication failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialAuth = async (provider: "google" | "apple" | "discord") => {
    setIsLoading(true);
    setError("");

    try {
      const { data, error } = await authClient.signIn.social(
        {
          provider,
        },
        {
          onSuccess: (response) => {
            console.debug("Social Auth Success:", response);
            router.push("/");
          },
        },
      );
    } catch (err: any) {
      setError(err.message || `${provider} authentication failed`);
    } finally {
      setIsLoading(false);
    }
  };

  // SIWE Functions
  const connectWallet = async () => {
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

  const handleSIWE = async () => {
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
    const result = await authClient.signIn.passkey({
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
    <View className="flex min-h-screen items-center justify-center bg-background px-4 py-12 transition-colors sm:px-6 lg:px-8">
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
            <Alert
              icon={CircleAlert}
              iconSize={16}
              iconClassName="top-1"
              className="mb-4 flex flex-row items-center"
              variant={"destructive"}
            >
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {success && (
            <Alert icon={CheckCircle}>
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

          <View /* form replacement */ className="flex flex-col gap-4">
            <View className="gap-2">
              <Label htmlFor="signin-email">Email</Label>
              <Input
                id="signin-email"
                placeholder="john@example.com"
                value={email}
                spellCheck={false}
                autoCorrect={false}
                onChangeText={setEmail}
                autoCapitalize="none"
                autoComplete="email"
                keyboardType="email-address"
                textContentType="emailAddress"
              />
            </View>
            <View className="gap-2 space-y-2">
              <Label htmlFor="signin-password">Password</Label>
              <View className="relative">
                <Input
                  id="signin-password"
                  placeholder="••••••••"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 h-8 w-8 -translate-y-1/2"
                  onPress={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </View>
            </View>
            <Button
              className="w-full"
              disabled={isLoading}
              onPress={(e) => handleEmailPasswordAuth(e as any)}
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
          </View>

          <View className="mt-6">
            <Separator className="bg-gray-200 dark:bg-gray-700" />
            <Text className="mb-4 mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
              Or continue with
            </Text>

            <View className="gap-2">
              {!isSignupMode && Platform.OS === "web" && (
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
            </View>
          </View>

          <View className="mt-6 text-center">
            <Button
              variant="link"
              onPress={() => {
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
          </View>
        </CardContent>
      </Card>
    </View>
  );
}
