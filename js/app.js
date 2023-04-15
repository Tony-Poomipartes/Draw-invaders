const app = {
  invader: document.getElementById('invader'),
  defaultGridSize: 16,
  defaultPixelSize: 20,
  selectedColor: 'white',
  styles: [
    'black',
    'white',
    'pink',
    'red',
    'orange',
    'yellow',
    'green',
    'blue',
    'purple'
  ],
  //?------------------- creation de la grille--------------
  createGrid: function (gridSize = 8, pixelSize = 30){
    const gridElem = document.createElement('div');
    gridElem.classList.add('grid');
    gridElem.style.width = gridSize * pixelSize + 'px';
    for(let pixelIndex = 0; pixelIndex < gridSize * gridSize; pixelIndex++){
      app.createPixel(pixelSize, gridElem);
    }
    gridElem.addEventListener('click', app.onPixelClick);
    app.invader.innerHTML = '';
    app.invader.appendChild(gridElem);
  }, 
  //?-------------------creation des pixels----------------
  createPixel: function (pixelSize,container){
    const pixelElem = document.createElement('div');
    pixelElem.classList.add('pixel');
    pixelElem.classList.add('pixel--white');
    pixelElem.style.width = pixelSize + 'px';
    pixelElem.style.height = pixelSize + 'px';

    container.appendChild(pixelElem);
  },

  //?----------------mise sur ecoute de l'evenement-----
  onPixelClick: function (event){
    console.log('element qui a déclenché le clic: ' + event.target.className);
    console.log('element qui posséde le gestionnaire: ' + event.currentTarget.className);

    if(event.target.classList.contains('pixel')){
      const pixel = event.target;
      app.styles.forEach(function(style){
        pixel.classList.remove('pixel--' + style);
      });
      pixel.classList.add('pixel--' + app.selectedColor);
    }
  },

  //?-----------------creation du formulaire--------
  createForm: function (){
    const form = document.querySelector('.configuration');
    app.createInput('Taille de la grille', form);
    app.createInput('Taille des pixels', form);
    const submitBtn = document.createElement('button');
    submitBtn.type = 'submit';
    submitBtn.textContent = 'Valider';
    form.appendChild(submitBtn);
    form.addEventListener('submit', app.onFormSubmit);
  },

  createInput: function (placeholder, container){
    const input = document.createElement('input');
    input.type = 'number';
    input.placeholder = placeholder;
    container.appendChild(input);
  },

  onFormSubmit: function (event){
    event.preventDefault();
    const gridSize = parseInt(event.target.querySelector('input:nth-child(1)').value, 10);
    const pixelSize = parseInt(event.target.querySelector('input:nth-child(2)').value, 10);
    if(gridSize && pixelSize){
      app.createGrid(gridSize, pixelSize);
    }
  },

  //?----------------creation d'une palette de couleur-----
  createPalette: function (){
    const paletteElem = document.createElement('div');
    paletteElem.classList.add('palette');
    app.styles.forEach(function(style){
      const colorElem = document.createElement('div');
      colorElem.classList.add(style);
      paletteElem.appendChild(colorElem);
    });
    paletteElem.querySelector(`.${app.selectedColor}`).classList.add('active');
    paletteElem.addEventListener('click', app.onSwatchClick);
    document.body.appendChild(paletteElem);
  },

  onSwatchClick: function (event){
    if(!event.target.classList.contains('palette')){
      document.querySelector('.palette .active').classList.remove('active');
      app.selectedColor = event.target.className;
      event.target.classList.add('active');
    }
  },

  //?---------------initialisation des fonctions-----------
  init: function(){
    app.createForm();
    app.createPalette();
    //app.createGridAlt();
    app.createGrid(app.defaultGridSize, app.defaultPixelSize);
  }
};
app.init();