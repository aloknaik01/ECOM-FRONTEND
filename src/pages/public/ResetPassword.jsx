import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { authService } from '../../api/services/authService';
import { useForm } from '../../hooks/useForm';
import { validateResetPasswordForm } from '../../utils/validators';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { Card, CardHeader, CardBody } from '../../components/common/Card';
import toast from 'react-hot-toast';

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useForm(
    { password: '', conformPassword: '' },
    validateResetPasswordForm
  );

  const onSubmit = async (formValues) => {
    setIsLoading(true);
    try {
      const response = await authService.resetPassword(token, formValues);
      toast.success(response.message || 'Password reset successfully');
      setTimeout(() => navigate('/login'), 2000);
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
          <h2 className="text-2xl font-bold text-center">Reset Password</h2>
          <p className="text-center text-gray-600 mt-2">
            Enter your new password
          </p>
        </CardHeader>

        <CardBody>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label="New Password"
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.password && errors.password}
              placeholder="Enter new password (8-16 characters)"
            />

            <Input
              label="Confirm Password"
              type="password"
              name="conformPassword"
              value={values.conformPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.conformPassword && errors.conformPassword}
              placeholder="Confirm your password"
            />

            <Button type="submit" className="w-full" isLoading={isLoading}>
              Reset Password
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default ResetPassword;