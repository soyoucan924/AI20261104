const message = document.querySelector('#guest-message');
const messageCount = document.querySelector('#message-count');
const guestbookForm = document.querySelector('.guestbook-form');
const formStatus = document.querySelector('#form-status');

if (message && messageCount) {
  const updateMessageCount = () => { messageCount.textContent = `${message.value.length} / ${message.maxLength}`; };
  message.addEventListener('input', updateMessageCount);
  updateMessageCount();
}

if (guestbookForm) {
  guestbookForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'guestbook_submit',
      form_name: 'guestbook'
    });

    const submitButton = guestbookForm.querySelector('[type="submit"]');
    submitButton.disabled = true;
    formStatus.textContent = '正在送出留言⋯⋯';

    try {
      const response = await fetch(guestbookForm.action, {
        method: 'POST',
        body: new FormData(guestbookForm),
        headers: { Accept: 'application/json' }
      });

      if (!response.ok) throw new Error('Submission failed');
      window.location.assign('index.html?guestbook=sent');
    } catch (error) {
      formStatus.textContent = '留言暫時無法送出，請稍後再試。';
      submitButton.disabled = false;
    }
  });
}
