import { useState } from 'react';
import { Link } from 'react-router-dom';
import { authService } from '../../api/services/authService';
import { useForm } from '../../hooks/useForm';
import { validateEmail } from '../../utils/validators';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { Card, CardHeader, CardBody } from '../../components/common/Card';
import toast from 'react-hot-toast';
import { ArrowLeft } from 'lucide-react';

const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const validate = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = 'Email is required';
    } else if (!validateEmail(values.email)) {
      errors.email = 'Invalid email address';
    }
    return errors;
  };

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useForm(
    { email: '' },
    validate
  );

  const onSubmit = async (formValues) => {
    setIsLoading(true);
    try {
      const response = await authService.forgotPassword(formValues.email);
      toast.success(response.message);
      setEmailSent(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <h2 className="text-2xl font-bold text-center">Forgot Password</h2>
          <p className="text-center text-gray-600 mt-2">
            Enter your email to receive a password reset link
          </p>
        </CardHeader>

        <CardBody>
          {emailSent ? (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <svg
                  className="w-8 h-8 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold">Email Sent!</h3>
              <p className="text-gray-600">
                We've sent a password reset link to <strong>{values.email}</strong>
              </p>
              <p className="text-sm text-gray-500">
                Please check your inbox and click the link to reset your password.
              </p>
              <Link to="/login">
                <Button variant="outline" className="w-full">
                  Back to Login
                </Button>
              </Link>
            </div>
          ) : (
            <>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <Input
                  label="Email"
                  type="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.email && errors.email}
                  placeholder="Enter your email"
                />

                <Button type="submit" className="w-full" isLoading={isLoading}>
                  Send Reset Link
                </Button>
              </form>

              <Link
                to="/login"
                className="flex items-center justify-center gap-2 mt-6 text-sm text-primary-500 hover:underline"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Login
              </Link>
            </>
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default ForgotPassword;