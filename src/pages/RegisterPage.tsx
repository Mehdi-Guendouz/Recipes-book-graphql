import { RegisterForm } from "@/components/forms/register-form";
import { Toaster } from "sonner";

const RegisterPage = () => {
  return (
    <div className="flex items-center justify-center w-full h-screen  background-login ">
      <Toaster position="top-center" richColors />

      <div className="ellipse-login-1 absolute top-[-50%] left-0 z-20"></div>
      <div className="ellipse-login-2 absolute top-[-30%] right-0 bottom-0 z-20"></div>
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
