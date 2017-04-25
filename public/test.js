// It would be simpler to use this if we could just `require()` the `compiler`,
// but this code runs on the client side and it would be really complicated
// to enable using `require()` here, so we just call the server instead.

document.addEventListener('page:load', function (e) {
  if (e.data.path !== '/test') return;
  // When the user types into the input field...
  document.getElementById('input').addEventListener('input', function (event) {
    // POST the code to the API
    fetch('/api/convert', {
      method: 'POST',
      body: event.target.value,
    }).then(function (res) {
      // then get the JSON back
      return res.json();
    }).then(function (json) {
      // then either:
      var output = document.getElementById('output');
      if (json.ok) {
        // output the transformed code if
        // the compilation succeeded, or
        output.style.backgroundColor = 'black';
        output.textContent = json.code;
      } else {
        // output the error if there was
        // a problem.
        output.style.backgroundColor = 'darkred';
        output.textContent = json.stack;
      }
    })
  })
});