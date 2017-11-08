var input = document.getElementById('todo');
var list = document.getElementById('list');

input.addEventListener('keyup', function(e) {
  if (e.keyCode !== 13) return;
  var data = input.value;

  list.innerHTML += '<li class="item">' + data + '</li>';
  input.value = '';

});

list.addEventListener('click', function(e) {
  if (!e.target || e.target.nodeName !== 'LI') return;
  e.target.parentNode.removeChild(e.target);
});