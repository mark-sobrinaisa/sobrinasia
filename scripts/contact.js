(function(){
  const formId='sobrinasia-contact';
  const form = document.getElementById(formId);
  if (form) form.addEventListener('submit', logSubmit);
  else console.warn('No form found!');
  function logSubmit(event) {
    event.preventDefault();
    const now=new Date();
    const form = document.getElementById(formId);
    if (form) {
      const inputs = Array.from(form.getElementsByTagName('input'));
      if (inputs) {
        const fields = inputs.map(field => ({id: field.id, value: field.value}));
        const firstErr = fields.find(f => !Boolean(f.value))
        if (firstErr) {
          const errf = document.getElementById(firstErr.id);
          if (errf) errf.focus();
          else console.log('Unable to focus on err field.');
          return;
        } else {
          const payload=fields.reduce((all, curr) => {
            all[curr.id] = curr.value;
            return all;
          }, {});
          // console.log(`Form Submitted at: ${now.toLocaleDateString()} ${now.toLocaleTimeString()}`, payload);
          send(payload);
        }
      }
    } else console.warn('No form found!');
  }
  function send(payload) {
    fetch('/.netlify/functions/formhandler', {
      method: 'POST',
      'Content-Type': 'application/json',
      body: JSON.stringify(payload)
    }).then(resp => {
      return resp.json();
    }).then(data => {
      if (data.success) jumpto('thankyou');
      else              jumpto('error');
    }).catch(error => {
      console.warn('Unable to tranmit data:', error);
      jumpto('error');
    });
  }
  function jumpto(newpage) {
    const filenameStart=window.location.href.lastIndexOf('/')+1;
    const pathStart=window.location.href.substring(0,filenameStart);
    window.location.href=`${pathStart}${newpage}.html`;
  }
})();
