const message = document.querySelector('#guest-message');
const messageCount = document.querySelector('#message-count');
const guestbookForm = document.querySelector('.guestbook-form');

if (message && messageCount) {
  const updateMessageCount = () => { messageCount.textContent = `${message.value.length} / ${message.maxLength}`; };
  message.addEventListener('input', updateMessageCount);
  updateMessageCount();
}

if (guestbookForm) {
  guestbookForm.addEventListener('submit', () => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'guestbook_submit',
      form_name: 'guestbook'
    });
  });
}
