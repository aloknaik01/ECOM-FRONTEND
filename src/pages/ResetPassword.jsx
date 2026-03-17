import ResetPasswordForm from "../components/auth/ResetPasswordForm";

const ResetPassword = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4 transition-colors duration-200">
      <ResetPasswordForm />
    </div>
  );
};

export default ResetPassword;