import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfile } from '../../../redux/slices/authSlice';
import { useForm } from '../../../hooks/useForm';
import { Input } from '../../../components/common/Input';
import { Button } from '../../../components/common/Button';
import { Card, CardHeader, CardBody } from '../../../components/common/Card';
import { User, Upload } from 'lucide-react';

const Profile = () => {
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((state) => state.auth);
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar?.url || null);
  const [avatarFile, setAvatarFile] = useState(null);

  const validate = (values) => {
    const errors = {};
    if (!values.name || values.name.trim().length < 3) {
      errors.name = 'Name must be at least 3 characters';
    }
    if (!values.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      errors.email = 'Invalid email address';
    }
    return errors;
  };

  const { values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue } =
    useForm(
      {
        name: user?.name || '',
        email: user?.email || '',
      },
      validate
    );

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (formValues) => {
    const formData = new FormData();
    formData.append('name', formValues.name);
    formData.append('email', formValues.email);
    if (avatarFile) {
      formData.append('avatar', avatarFile);
    }

    dispatch(updateUserProfile(formData));
  };

  return (
    <div className="container-custom py-8">
      <h1 className="text-3xl font-bold mb-8">Profile Settings</h1>

      <div className="max-w-2xl">
        <Card>
          <CardHeader>
            <h2 className="text-xl font-bold">Update Profile</h2>
          </CardHeader>
          <CardBody>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Avatar Upload */}
              <div className="flex flex-col items-center">
                <div className="relative">
                  {avatarPreview ? (
                    <img
                      src={avatarPreview}
                      alt="Avatar"
                      className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
                    />
                  ) : (
                    <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center border-4 border-gray-200">
                      <User className="w-16 h-16 text-gray-400" />
                    </div>
                  )}
                  <label
                    htmlFor="avatar"
                    className="absolute bottom-0 right-0 bg-primary-500 text-white p-2 rounded-full cursor-pointer hover:bg-primary-600 transition-colors"
                  >
                    <Upload className="w-5 h-5" />
                  </label>
                  <input
                    id="avatar"
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Click the icon to upload a new avatar
                </p>
              </div>

              {/* Name */}
              <Input
                label="Full Name"
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.name && errors.name}
                placeholder="Enter your name"
              />

              {/* Email */}
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

              <Button type="submit" size="lg" className="w-full" isLoading={isLoading}>
                Update Profile
              </Button>
            </form>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default Profile;