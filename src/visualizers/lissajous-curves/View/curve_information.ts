/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Adrián Pérez Poleo
 * @since Apr 18, 2026
 * @description Program that draw the curve into a canvas.
 */

/**
 * Class that models the element of the view where the information about the curve is printed.
 */
export class CurveInformation {
  /**
   * Div Element where the text will be displayed.
   */
  private readonly column: HTMLDivElement;

  /**
   * Creates a new instance of a CurveInformation object.
   */
  constructor() {
    this.column = document.getElementById('div-info') as HTMLDivElement;
    this.addContent();
  }

  /**
   * Adds all the information needed to understand what are the Lissajous curves.
   */
  private addContent(): void {
    this.column.innerHTML = '';

    const contentWrapper = document.createElement('div');
    contentWrapper.classList.add('content');

    const title = this.createElement('h3', 'Lissajous Curves', ['title', 'is-4']);
    const description = this.createElement('p', `Lissajous curves are created by plotting two oscillations on perpendicular axes x and y​​​. 
      These oscillations, represented by sinusoidal functions, intersect to create different patterns. 
      When the ratio of these frequencies is equal to 1 — the oscillations are equally phased— the curve is a straight line.`);
   
    const readMoreLink = this.createLink('Read more', 'https://jpmonteagudo.com/blog/2024/04/lissajous/index.html');

    const equationTitle = this.createElement('h4', 'Equations', ['title', 'is-5', 'mt-4']);
    const firstEquation = this.createElement('p', 'x = A sin(a t + δ)');
    const secondEquation = this.createElement('p', 'y = B sin(b t)');

    const applicationsTitle = this.createElement('h4', 'Applications', ['title', 'is-5', 'mt-4']);
    const applicationsList = document.createElement('ul');
    applicationsList.appendChild(this.createElement('li', 'Oscilloscopes for signal analysis'));
    applicationsList.appendChild(this.createElement('li', 'Harmonic oscillators in mechanics'));

    const referencesTitle = this.createElement('h4', 'References', ['title', 'is-5', 'mt-4']);
    const linksList = document.createElement('ul');
    
    const wikipediaLink = document.createElement('li');
    wikipediaLink.appendChild(this.createLink('Wikipedia', 'https://en.wikipedia.org/wiki/Lissajous_curve' ));
    linksList.appendChild(wikipediaLink);

    const historyLink = document.createElement('li');
    historyLink.appendChild(this.createLink('History if the Curves', 'https://www.epsilones.com/paginas/articulos/articulos-005-lissajous.html'));
    linksList.appendChild(historyLink);

    const originalLink = document.createElement('li');
    originalLink.appendChild(this.createLink('Original Page', 'https://academo.org/demos/lissajous-curves/'));
    linksList.appendChild(originalLink);

    contentWrapper.append(title, description, readMoreLink, 
      equationTitle, firstEquation, secondEquation,
      applicationsTitle, applicationsList, referencesTitle, linksList);
  
    this.column.appendChild(contentWrapper);
  }

  /**
   * Creates a new element in the HTML page.
   * @param tag Type of element that will be created.
   * @param text Text that the element contains.
   * @return DOM Element that has been created. 
   */
  private createElement(tag: string, text: string, classes: string[] = []): HTMLElement {
    const element = document.createElement(tag);
    element.textContent = text;
    if (classes.length !== 0) element.classList.add(...classes);
    return element;
  }

  /**
   * Creates and return a link element.
   * @param text Text that will be displayed containing the link.
   * @param url UTL where the user will be redirected.
   * @return Link element that has been created. 
   */
  private createLink(text: string, url: string): HTMLAnchorElement {
    const link = document.createElement('a');
    link.textContent = text;
    link.href = url;
    return link;
  }

  /**
   * Modifies the size of the information DIV element.
   */
  resize(): void {
    this.column.style.height = '100%';
  }
}