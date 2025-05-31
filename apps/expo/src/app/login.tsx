import { useState } from "react"; 
import { View, TextInput, Button } from "react-native";
import AuthForm from "~/components/auth-form";
import { authClient } from "~/lib/auth-client";
 
export default function App() {
    return <AuthForm />
}