import { useState, useCallback } from 'react';

export const useNotification = () => {
  const [notification, setNotification] = useState({
    isOpen: false,
    title: '',
    message: '',
    type: 'info',
    autoClose: true,
    actions: [],
  });

  const showNotification = useCallback((config) => {
    setNotification({
      isOpen: true,
      title: config.title || 'Notification',
      message: config.message || '',
      type: config.type || 'info',
      autoClose: config.autoClose !== false,
      autoCloseDuration: config.autoCloseDuration || 4000,
      actions: config.actions || [],
    });
  }, []);

  const closeNotification = useCallback(() => {
    setNotification((prev) => ({
      ...prev,
      isOpen: false,
    }));
  }, []);

  const showSuccess = useCallback((title, message, actions = []) => {
    showNotification({
      title,
      message,
      type: 'success',
      actions,
    });
  }, [showNotification]);

  const showError = useCallback((title, message, actions = []) => {
    showNotification({
      title,
      message,
      type: 'error',
      autoClose: true,
      actions,
    });
  }, [showNotification]);

  const showWarning = useCallback((title, message, actions = []) => {
    showNotification({
      title,
      message,
      type: 'warning',
      actions,
    });
  }, [showNotification]);

  const showInfo = useCallback((title, message, actions = []) => {
    showNotification({
      title,
      message,
      type: 'info',
      actions,
    });
  }, [showNotification]);

  return {
    notification,
    showNotification,
    closeNotification,
    showSuccess,
    showError,
    showWarning,
    showInfo,
  };
};

export default useNotification;
