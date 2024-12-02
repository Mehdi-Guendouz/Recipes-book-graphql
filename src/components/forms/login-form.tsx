import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUserStore } from "@/hooks/user-store";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userStore = useUserStore();
  const navigate = useNavigate();

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    const query = `
    mutation loginUser($email: String!, $password: String!) {
      loginUser(email: $email, password: $password) {
        token
        user {
          id
          username
          email
        }
      }
    }
  `;
    console.log(email, password);
    if (!email || !password) {
      toast.error("Please fill in all fields");
    }

    // Call your login API here
    axios
      .post("https://recipebookapi.vercel.app/graphql", {
        query,
        variables: { email, password },
      })
      .then((res) => {
        console.log(res.data);
        toast.success("Login successful");
        userStore.setToken(res.data.data.loginUser.token);
        localStorage.setItem("token", res.data.data.loginUser.token);
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
        toast.error("An error occurred. Please try again");
      });
  };

  useEffect(() => {
    const tokenLocalStorage = localStorage.getItem("token");

    // Check if the user is already authenticated
    if (tokenLocalStorage) {
      userStore.setToken(tokenLocalStorage);
      //  axiosInstance.defaults.headers.common[
      //    "Authorization"
      //  ] = `Bearer ${tokenLocalStorage}`;

      // Redirect the user only if the current location is the login page
      if (location.pathname === "/login") {
        navigate("/");
      }
    }
  }, []);

  return (
    <Card className="mx-auto w-[450px]  login-card-shadow z-50">
      <CardHeader>
        <CardTitle className="text-3xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="********"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button className="w-full" onClick={(e) => handleSubmit(e)}>
            Login
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
