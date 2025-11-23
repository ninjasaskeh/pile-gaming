import { LoginForm } from "@/components/login-form";

type LoginPageProps = {
  searchParams?: Record<string, string | string[] | undefined>;
};

export default function Page({ searchParams }: LoginPageProps) {
  const callbackUrlParam = searchParams?.callbackUrl;
  const callbackUrl = Array.isArray(callbackUrlParam)
    ? callbackUrlParam[0]
    : callbackUrlParam;

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm callbackUrl={callbackUrl} />
      </div>
    </div>
  );
}
