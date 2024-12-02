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

export function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const userStore = useUserStore();
  const navigate = useNavigate();

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    const query = `
    mutation registerUser($username: String!, $email: String!, $password: String!) {
      registerUser(username: $username, email: $email, password: $password) {
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
    if (!email || !password || !username) {
      toast.error("Please fill in all fields");
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }

    // Call your login API here
    axios
      .post("https://recipebookapi.vercel.app", {
        query,
        variables: { username, email, password },
      })
      .then((res) => {
        console.log(res.data);
        toast.success("Login successful");
        userStore.setToken(res.data.data.registerUser.token);
        localStorage.setItem("token", res.data.data.registerUser.token);
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
        toast.error("email or password are incorrect , please try again");
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
        <CardTitle className="text-3xl">Register</CardTitle>
        <CardDescription>
          Enter your information below to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="userName">username</Label>
            <Input
              id="userName"
              type="text"
              placeholder="chef m"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
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
            Register
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          you already have an account?{" "}
          <Link to="/login" className="underline">
            login
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
