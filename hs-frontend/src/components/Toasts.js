export const ToastWarning = (toast, title, duration = 2500) => toast({
    title: title,
    status: 'warning',
    isClosable: true,
    duration: duration,
  });

export const ToastSuccess = (toast, title, duration = 2500) => toast({
  title: title,
  status: 'success',
  isClosable: true,
  duration: duration,
});

export const ToastError = (toast, title, duration = 2500) => toast({
  title: title,
  status: 'error',
  isClosable: true,
  duration: duration,
});
