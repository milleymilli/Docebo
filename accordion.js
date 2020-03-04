class Accordion {
  constructor(htmlComponents) {
    this.container = htmlComponents.container;
    this.mainTitle = htmlComponents.mainTitle;
    this.panels = htmlComponents.panels;

    var rootElement = document.getElementById(this.container);

    /*creating a first section for the main title of our
   accordion object and set attribute for it and creating
   horizonal separator element and append both this new elements*/
    var firstSection = document.createElement('section');
    var separator = document.createElement('hr');
    firstSection.setAttribute('class', 'Headsection');
    firstSection.innerHTML = ` <h2>${this.mainTitle}</h2>`;
    rootElement.append(firstSection);
    rootElement.append(separator);

    /* creating other sections for the pannels from our 
     accordion object and appending to each panel
     its panel title, panel subtitle if it exist 
     because it is optional and panel content 
  */
    this.panels.forEach((panel, i) => {
      // Creating a section container for each panel
      var section = document.createElement('section');
      section.setAttribute('class', 'section');

      // Checking if subtitle exit or not and and assign it to a variable
      var checkSubtitleExistence =
        panel.subtitle.length > 0
          ? (section.innerHTML += `<h4>${panel.subtitle} </h4></div>`)
          : `</div>`;

      // Appending panel to section container
      section.innerHTML = `<div class="title-subtitle"><h3  data-accordion-item>${panel.title}</h3>
    ${checkSubtitleExistence}
   <i class="material-icons">keyboard_arrow_down</i>
   <div class="content slideDown">${panel.content} </div>`;

      /* finally appending section container to 
     rootElement accordion with a horizontal separator
  */
      rootElement.append(section);
      i != this.panels.length - 1 ? (rootElement.innerHTML += `<hr>`) : '';
    });

    // adding event listener to all clickable elements
    var allClickableArrows = document.querySelectorAll('.material-icons');
    allClickableArrows.forEach(element => {
      element.addEventListener('click', dropDown);
    });
  }
}

const dropDown = event => {
  const r = event.target;
  // Handling slide down
  const panel = r.nextElementSibling;
  if (panel.style.maxHeight) {
    panel.style.maxHeight = null;
  } else {
    panel.style.maxHeight = panel.scrollHeight + 'px';
  }

  /* Handling font-size of the panel title, 
     changing Arrow direction and setting margin
     to the section container of the clicked element
 */
  const headerSize = r.parentNode.querySelector('h3');
  if (r.innerHTML == 'keyboard_arrow_down') {
    r.innerHTML = 'keyboard_arrow_up';
    r.parentNode.style.margin = '30px 0';
    headerSize.style.fontSize = '18px';
  } else {
    r.innerHTML = 'keyboard_arrow_down';
    r.parentNode.style.margin = ' 0';
    headerSize.style.fontSize = '';
  }
};
