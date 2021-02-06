// Reference: https://javascript.info/js-animation
function animate(options) {

  var start = performance.now();

  requestAnimationFrame(function animate(time) {
    // timeFraction от 0 до 1
    var timeFraction = (time - start) / options.duration;
    if (timeFraction > 1) timeFraction = 1;

    // текущее состояние анимации
    var progress = options.timing(timeFraction)

    options.draw(progress);

    if (timeFraction < 1) {
      requestAnimationFrame(animate);
    }

  });
}

function trainHKG() {
  animate({
    duration: 7000,
    timing: function bounce(timeFraction) {
      for (let a = 0, b = 1, result; 1; a += b, b /= 2) {
        if (timeFraction >= (7 - 4 * a) / 11) {
          return -Math.pow((11 - 6 * a - 11 * timeFraction) / 4, 2) + Math.pow(b, 2)
        }
      }
    },
    draw: function(progress) {
      document.getElementById("trainHKG").style.left = progress * 570 + 'px';
    }
  });
}

function trainSEL() {
  animate({
    duration: 7000,
    timing: function bounce(timeFraction) {
      for (let a = 0, b = 1, result; 1; a += b, b /= 2) {
        if (timeFraction >= (7 - 4 * a) / 11) {
          return -Math.pow((11 - 6 * a - 11 * timeFraction) / 4, 2) + Math.pow(b, 2)
        }
      }
    },
    draw: function(progress) {
      document.getElementById("trainSEL").style.left = progress * 570 + 'px';
    }
  });
}

function trainTYO() {
  animate({
    duration: 7000,
    timing: function bounce(timeFraction) {
      for (let a = 0, b = 1, result; 1; a += b, b /= 2) {
        if (timeFraction >= (7 - 4 * a) / 11) {
          return -Math.pow((11 - 6 * a - 11 * timeFraction) / 4, 2) + Math.pow(b, 2)
        }
      }
    },
    draw: function(progress) {
      document.getElementById("trainTYO").style.left = progress * 570 + 'px';
    }
  });
}
