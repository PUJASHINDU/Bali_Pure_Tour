import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Button, Menu, MenuHandler, MenuItem, MenuList, Typography } from "@material-tailwind/react";
import { Cog6ToothIcon, InboxArrowDownIcon, LifebuoyIcon, PowerIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import userDefaultImg from '../../assets/icon/profile.jpg';
import { useAuth } from '../../Context/AuthContext'; // Import AuthContext

const profileMenuItems = [
  { label: "Profile", icon: UserCircleIcon },
  { label: "Inbox", icon: InboxArrowDownIcon },
  { label: "Help", icon: LifebuoyIcon },
  { label: "Sign Out", icon: PowerIcon, isSignOut: true },
];

const AvatarComponent = () => {
  const { user, logout, refreshAccessToken } = useAuth(); // Dapatkan data user, fungsi logout, dan refreshAccessToken
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      refreshAccessToken(); // Jika tidak ada data user, coba refresh token untuk mendapatkan data user
    }
    console.log("User data in AvatarComponent:", user); // Log data user yang diterima
  }, [user, refreshAccessToken]); // Menambahkan dependensi untuk memastikan ini dieksekusi saat user atau refreshAccessToken berubah

  const closeMenu = () => setIsMenuOpen(false);

  const handleMenuItemClick = (item) => {
    if (item.isSignOut) {
      logout();
      console.log('User signed out');
    } else {
      switch (item.label) {
        case 'Profile':
          navigate('/AcountAdminpage');
          break;
        // case 'Edit Profile':
        //   navigate('/ProfilePage');
        //   break;
      }
    }
    closeMenu();
  };

  // Tentukan gambar profil yang digunakan
  const profileImage = user?.profilePicture || userDefaultImg; // Menggunakan gambar profil dari user atau gambar default

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button variant="text" color="gray" className="flex items-center rounded-full p-0">
          <Avatar variant="circular" size="md" alt="User Avatar" withBorder={true} color="blue-gray" className="p-0.5" src={profileImage} />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {profileMenuItems.map(({ label, icon, isSignOut }, key) => (
          <MenuItem
            key={label}
            onClick={() => handleMenuItemClick({ label, icon, isSignOut })}
            className={`flex items-center gap-2 rounded ${isSignOut ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10" : ""}`}
          >
            {React.createElement(icon, { className: `h-4 w-4 ${isSignOut ? "text-red-500" : ""}`, strokeWidth: 2 })}
            <Typography as="span" variant="small" className="font-normal" color={isSignOut ? "red" : "inherit"}>
              {label}
            </Typography>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default AvatarComponent;
