import Toastify from 'toastify-js';

export const AlertSuccessNotification = (options: { text: string }) => {
  const { text } = options;
  return Toastify({
    text: text,
    className: 'primary',
    gravity: 'top', // `top` or `bottom`
    position: 'right', // `left`, `center` or `right`
    style: {
      background: `linear-gradient(to right, ##0d6efd, ##0d6efd)`,
    },
  }).showToast();
};

export const AlertDangerNotification = (options: { text: string }) => {
  const { text } = options;
  return Toastify({
    text: text,
    className: 'info',
    gravity: 'top', // `top` or `bottom`
    position: 'center', // `left`, `center` or `right`
    style: {
      background: `linear-gradient(to right, #FF0000, #FF0000)`,
    },
  }).showToast();
};
