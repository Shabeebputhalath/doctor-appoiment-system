import { useEffect, useState } from 'react';

const NOTIFS_STORAGE_KEY = 'medicare_notifications';

export const useNotifications = (profile: any) => {
  const [notifications, setNotifications] = useState<any[]>([]);

  const getStoredNotifs = () => {
    const stored = localStorage.getItem(NOTIFS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  };

  useEffect(() => {
    if (!profile) {
      setNotifications([]);
      return;
    }

    const loadNotifs = () => {
      const allNotifs = getStoredNotifs();
      // Use email as a mock userId since we removed Firebase Auth UIDs
      const userNotifs = allNotifs.filter((n: any) => n.userId === profile.email);
      setNotifications(userNotifs.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
    };

    loadNotifs();

    const handler = () => loadNotifs();
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, [profile]);

  const sendNotification = async (userId: string, title: string, message: string, type: string = 'info') => {
    const allNotifs = getStoredNotifs();
    const newNotif = {
      id: Math.random().toString(36).substr(2, 9),
      userId, // Expecting email here now
      title,
      message,
      type,
      isRead: false,
      createdAt: new Date().toISOString()
    };
    
    const updated = [newNotif, ...allNotifs];
    localStorage.setItem(NOTIFS_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('storage'));
  };

  return { notifications, sendNotification };
};
