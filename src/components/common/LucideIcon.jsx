import * as Icons from 'lucide-react';

const LucideIcon = ({ name, className = "w-5 h-5", defaultIcon = "Package" }) => {
  if (!name) {
    const Default = Icons[defaultIcon] || Icons.Package;
    return <Default className={className} />;
  }

  // Find the icon by name (case insensitive for convenience)
  const iconName = Object.keys(Icons).find(
    key => key.toLowerCase() === name.toLowerCase()
  );

  const Icon = Icons[iconName] || Icons[defaultIcon] || Icons.Package;
  return <Icon className={className} />;
};

export default LucideIcon;
