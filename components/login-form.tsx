"use client";

import { cn } from "@/lib/utils";
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
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type FormValues = z.infer<typeof formSchema>;

type LoginFormProps = React.ComponentPropsWithoutRef<"div"> & {
  callbackUrl?: string;
};

export function LoginForm({
  className,
  callbackUrl,
  ...props
}: LoginFormProps) {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const redirectTo = callbackUrl || "/dashboard";
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (values: FormValues) => {
    setError(null);
    const res = await signIn("credentials", { ...values, redirect: false });
    if (res?.error) {
      setError("Email atau password salah.");
      toast.error("Login gagal", {
        description: "Periksa kembali email atau password Anda.",
      });
    } else {
      toast.success("Login berhasil", {
        description: "Mengalihkan ke dashboard...",
      });
      router.replace(redirectTo);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Masukkan email dan password admin untuk masuk ke dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  {...register("email")}
                />
                {errors.email && (
                  <span className="text-sm text-destructive">
                    {errors.email.message}
                  </span>
                )}
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  {...register("password")}
                />
                {errors.password && (
                  <span className="text-sm text-destructive">
                    {errors.password.message}
                  </span>
                )}
              </div>
              {error && <p className="text-sm text-destructive">{error}</p>}
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Masuk..." : "Masuk"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
