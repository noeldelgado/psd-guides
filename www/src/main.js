import PSDGuides from '/src/PSDGuides.js';

var uiControl = [].slice.call(document.querySelectorAll('.psdguides-ctrl'), 0)
  , fixedControl = document.querySelector('.psdguides-ctrl--fixed')
  , guides = new PSDGuides({
    canvasWidth: 500,
    lineColor: "cyan",
    horizontalGuides: ['(10, 60) * 7'],
    verticalGuides: [37, 70, 25, 55, 20, 50, 35, 3, 40, 15, 30, 50, 55, 130, 90, 110, '(55, 110) * 2', 35, 3, 155]
  });

// verticalGuides: [
//   '10rem',
//   20,
//   '200px',
//   '50vh', '+=10px',
// ]
// horizontalGuides: [
//   bounds: {
//     top: 50,
//     left: 'auto',
//     width: 600
//   },
//   10,
//   '50vw',
//   -10
// ]
// verticalGuides: [
//   {
//     label: 'sample label',
//     bounds: {
//       top: 0,
//       width: 500,
//       left: 10
//     }
//   }
// ]
uiControl.forEach(function(ctrl) {
  ctrl.addEventListener('click', toggle, false);
});

function toggle(ev) {
  ev?.preventDefault();

  if (guides.active) {
    fixedControl.textContent = 'Show PSDGuides.js';
    return guides.deactivate();
  }

  fixedControl.textContent = 'Hide PSDGuides.js';
  return guides.activate();
}
// toggle();

var media = (arr) => {
  var { length } = arr;
  var middle = Math.ceil(length / 2);
  var sort = arr.sort((a, b) => a - b);
  return (length % 2) === 0 ?
    (sort[middle] + sort[middle - 1]) / 2 :
    sort[middle - 1];
}
var promedio = (arr) => {
  const { length } = arr;
  return arr.reduce((a, b) => a + b) / length;
}
var moda = (numbers) => {
  // as result can be bimodal or multi-modal,
  // the returned result is provided as an array
  // mode of [3, 5, 4, 4, 1, 1, 2, 3] = [1, 3, 4]
  var modes = [], count = [], i, number, maxIndex = 0;

  for (i = 0; i < numbers.length; i += 1) {
    number = numbers[i];
    count[number] = (count[number] || 0) + 1;
    if (count[number] > maxIndex) {
      maxIndex = count[number];
    }
  }

  for (i in count)
    if (count.hasOwnProperty(i)) {
      if (count[i] === maxIndex) {
        modes.push(Number(i));
      }
    }

  return modes;
}
