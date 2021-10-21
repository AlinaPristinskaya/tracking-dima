
export default {
  create(message, type) {
    const alertContainer = document.querySelector('.j-alert-container');
    const alertMessage = document.createElement('div');
    alertMessage.classList.add('g-alert__message', 'j-alert__message');
    if (type === 'error') {
      alertMessage.classList.add('g-alert__message--error');
    }
    if (type === 'warning') {
      alertMessage.classList.add('g-alert__message--warning');
    }
    if (type === 'info') {
      alertMessage.classList.add('g-alert__message--info');
    }

    let messageText;
    if (Array.isArray(message)) {
      messageText = message.reduce((acc, messageElement) => {
        if (typeof messageElement === 'string') {
          acc += messageElement;
        } else if (typeof messageElement === 'object' && messageElement.text) {
          let translatedMessage = messageElement.text;

          Object.keys(messageElement.prepare).forEach((key) => {
            const keyWithColon = key.indexOf(':') === 0;
            const keyName = keyWithColon ? key : `:${key}`;
            translatedMessage = translatedMessage.replace(keyName, messageElement.prepare[key]);
          });

          acc += translatedMessage;
        }
        acc += '<br>';
        return acc;
      }, '');
    } else if (typeof message === 'object') {
      messageText = message.text;

      Object.keys(message.prepare).forEach((key) => {
        const keyWithColon = key.indexOf(':') === 0;
        const keyName = keyWithColon ? key : `:${key}`;

        messageText = messageText.replace(keyName, message.prepare[key]);
      });
    } else if (typeof message === 'string') {
      messageText = message;
    }

    alertMessage.innerHTML = messageText;
    if (alertContainer) {
      alertContainer.appendChild(alertMessage);
    }

    alertMessage.addEventListener('click', (() => alertMessage.remove()));

    setTimeout(() => {
      alertMessage.classList.add('g-alert__message--active');
    }, 0);

    setTimeout(() => {
      alertMessage.classList.remove('g-alert__message--active');
    }, 3500);

    setTimeout(() => {
      alertMessage.remove();
    }, 4000);
  },
};
