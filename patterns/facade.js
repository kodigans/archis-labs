function stop(e) {
  e.preventDefault();
  e.stopPropagation();
}

function stop(e) {
  // not IE

  if (typeof e.preventDefault === 'function') {
    e.preventDefault();
  }

  if (typeof e.stopPropagation === 'function') {
    e.stopPropagation();
  }

  // IE

  if (typeof e.returnValue === 'boolean') {
    e.returnValue = false;
  }

  if (typeof e.cancelBubble === 'boolean') {
    e.cancelBubble = true;
  }
}
