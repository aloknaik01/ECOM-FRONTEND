import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserPassword } from '../../store/slices/authSlice';
import Input from '../ui/Input';
import Button from '../ui/Button';

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.currentPassword) {
      newErrors.currentPassword = 'Current password is required';
    }

    if (!formData.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters';
    } else if (formData.newPassword.length > 16) {
      newErrors.newPassword = 'Password must not exceed 16 characters';
    }

    if (!formData.confirmNewPassword) {
      newErrors.confirmNewPassword = 'Please confirm your new password';
    } else if (formData.newPassword !== formData.confirmNewPassword) {
      newErrors.confirmNewPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const result = await dispatch(updateUserPassword(formData));

    if (updateUserPassword.fulfilled.match(result)) {
      setFormData({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
      });
    }
  };

  const togglePassword = (field) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-md">
      <div className="relative">
        <Input
          label="Current Password"
          type={showPasswords.current ? 'text' : 'password'}
          name="currentPassword"
          value={formData.currentPassword}
          onChange={handleChange}
          error={errors.currentPassword}
          placeholder="Enter current password"
        />
        <button
          type="button"
          onClick={() => togglePassword('current')}
          className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
        >
          {showPasswords.current ? '👁️' : '👁️‍🗨️'}
        </button>
      </div>

      <div className="relative">
        <Input
          label="New Password"
          type={showPasswords.new ? 'text' : 'password'}
          name="newPassword"
          value={formData.newPassword}
          onChange={handleChange}
          error={errors.newPassword}
          placeholder="Enter new password"
        />
        <button
          type="button"
          onClick={() => togglePassword('new')}
          className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
        >
          {showPasswords.new ? '👁️' : '👁️‍🗨️'}
        </button>
      </div>

      <div className="relative">
        <Input
          label="Confirm New Password"
          type={showPasswords.confirm ? 'text' : 'password'}
          name="confirmNewPassword"
          value={formData.confirmNewPassword}
          onChange={handleChange}
          error={errors.confirmNewPassword}
          placeholder="Confirm new password"
        />
        <button
          type="button"
          onClick={() => togglePassword('confirm')}
          className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
        >
          {showPasswords.confirm ? '👁️' : '👁️‍🗨️'}
        </button>
      </div>

      <Button type="submit" variant="primary" loading={loading} className="w-full">
        Update Password
      </Button>
    </form>
  );
};

export default UpdatePassword;