import bgAuth from "@/assets/bg-auth.jpg";
import Button from "@/components/Button/Button";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Input from "@/components/Input/Input";
import Label from "@/components/Label/Label";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Define the schema for validation
const ForgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: "Input email tidak boleh kosong",
    })
    .email("Harap isi dengan email yang valid"),
});

type TForgotPasswordSchema = z.infer<typeof ForgotPasswordSchema>;

// Define the API URL
const apiUrl =
  "https://lumibank-backend-edqo6jv53q-et.a.run.app/api/forget-password/send";

// Define the function to send OTP
const sendOtp = async (email: string) => {
  try {
    const response = await axios.post(
      apiUrl,
      { email },
      {
        headers: {
          "Content-Type": "application/json",
          // Add Authorization header if needed
          // "Authorization": `Bearer ${yourAuthToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error response:", error.response?.data);
      console.error("Status code:", error.response?.status); // Log status code
      throw new Error(error.response?.data?.message || "An error occurred");
    } else {
      console.error("Unexpected error:", error);
      throw new Error("An unexpected error occurred");
    }
  }
};

export default function ForgotPassword() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TForgotPasswordSchema>({
    resolver: zodResolver(ForgotPasswordSchema),
  });

  const onSubmit = async (data: TForgotPasswordSchema) => {
    try {
      await sendOtp(data.email);
      reset();
      navigate("/reset/otp"); // Redirect to OTP verification page
    } catch (error) {
      // Display error to user
      if (error instanceof Error) {
        alert(`Error: ${error.message}`);
        console.error(error.message);
      } else {
        alert("An unexpected error occurred");
        console.error("An unexpected error occurred");
      }
    }
  };

  return (
    <>
      <Header />
      <main
        className="w-full min-h-[828px] h-[calc(100vh-73px-75px)] md:h-[calc(100vh-94px-75px)] bg-cover bg-center"
        style={{ backgroundImage: `url(${bgAuth})` }}
      >
        <div className="container mx-auto px-6 flex items-center justify-center md:justify-end h-full">
          <div className="bg-neutral-01 px-8 py-14 md:px-14 rounded-lg w-[450px] min-h-[480px]">
            <div className="mb-8">
              <h1 className="mb-2 text-3xl text-primary-blue font-bold">
                Lupa Password
              </h1>
              <p>
                Masukkan email Anda untuk proses verifikasi, kami akan
                mengirimkan kode 4 digit ke email Anda.
              </p>
            </div>

            <form
              className="flex flex-col gap-y-8"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex flex-col gap-y-3">
                <div className="flex flex-col gap-y-1">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    type="email"
                    id="email"
                    placeholder="Email"
                    aria-label="Email"
                    {...register("email")}
                    className={`${
                      errors.email
                        ? "focus:outline-secondary-red border-secondary-red"
                        : ""
                    }`}
                  />
                  {errors.email && (
                    <span
                      className="text-red-500 text-sm"
                      aria-label={errors.email.message}
                    >
                      {errors.email.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-y-2 items-center">
                <Button
                  id="btnForgotPasswordLanjut"
                  aria-label="Tombol Lanjut"
                  className="my-9"
                >
                  Lanjut
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
