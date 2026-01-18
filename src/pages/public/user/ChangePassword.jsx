import { useState } from 'react';
import { authService } from '../../../api/services/authService';
import { useForm } from '../../../hooks/useForm';
import { validateChangePasswordForm } from '../../../utils/validators';
import { Input } from '../../../components/common/Input';
import { Button } from '../../../components/common/Button';
import { Card, CardHeader, CardBody } from '../../../components/common/Card';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const ChangePassword = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const { values, errors, touched, handleChange, handleBlur, handleSubmit, resetForm } =
    useForm(
      {
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
      },
      validateChangePasswordForm
    );

  const onSubmit = async (formValues) => {
    setIsLoading(true);
    try {
      const response = await authService.updatePassword(formValues);
      toast.success(response.message || 'Password updated successfully');
      resetForm();
      setTimeout(() => navigate('/dashboard'), 1500);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container-custom py-8">
      <h1 className="text-3xl font-bold mb-8">Change Password</h1>

      <div className="max-w-2xl">
        <Card>
          <CardHeader>
            <h2 className="text-xl font-bold">Update Your Password</h2>
            <p className="text-sm text-gray-600 mt-1">
              Password must be between 8 to 16 characters
            </p>
          </CardHeader>
          <CardBody>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Input
                label="Current Password"
                type="password"
                name="currentPassword"
                value={values.currentPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.currentPassword && errors.currentPassword}
                placeholder="Enter current password"
              />

              <Input
                label="New Password"
                type="password"
                name="newPassword"
                value={values.newPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.newPassword && errors.newPassword}
                placeholder="Enter new password"
              />

              <Input
                label="Confirm New Password"
                type="password"
                name="confirmNewPassword"
                value={values.confirmNewPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.confirmNewPassword && errors.confirmNewPassword}
                placeholder="Confirm new password"
              />

              <Button type="submit" size="lg" className="w-full" isLoading={isLoading}>
                Update Password
              </Button>
            </form>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default ChangePassword;