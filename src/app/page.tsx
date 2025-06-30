import LoginForm from "@/components/features/authentication/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Admin Dashboard Login
          </h2>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
