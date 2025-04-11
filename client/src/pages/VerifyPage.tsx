import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { AuthLayout } from "@/components/layouts/AuthLayout";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const formSchema = z.object({
  verificationCode: z.string().min(1, { message: "Verification code is required" }),
}).refine((data) => data.verificationCode.length === 6, {
  message: "Verification code must be 6 characters",
  path: ["verificationCode"],
});

type FormData = z.infer<typeof formSchema>;

export default function VerificationPage() {
  const { verifyUser, loading } = useAuth();
  const navigate = useNavigate();
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      verificationCode: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      await verifyUser(data.verificationCode);
      toast.success("Verification successful");
      navigate("/login");
    } catch (error) {
      toast.error("Verification failed. Please try again.");
      console.error(error);
    }
  };

  return (
    <AuthLayout
      title="Verify your account"
      subtitle="Enter the verification code sent to your email"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-8">
          <FormField
            control={form.control}
            name="verificationCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Verification Code</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your code"
                    type="text"
                    maxLength={6}
                    {...field}
                    disabled={loading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full mt-6" disabled={loading}>
            {loading ? "Verifying..." : "Verify Code"}
          </Button>
        </form>
      </Form>

      <div className="mt-6 text-center">
        <p className="text-sm text-muted-foreground">
          Didn't receive a code?{" "}
          <Link to="/resend-code" className="text-primary hover:underline">
            Resend code
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
