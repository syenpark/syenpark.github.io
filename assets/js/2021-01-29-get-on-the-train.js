function myFunction() {
  let start = Date.now();

  let timer = setInterval(function() {
  let timePassed = Date.now() - start;

  document.getElementById("train").style.left = timePassed / 5 + 'px';

  if (timePassed > 2000) clearInterval(timer);

  }, 20);
}
