import DogModel from '../dogModel';

interface DogController {
  dogContainer: HTMLElement;
  dogModal: HTMLElement;
}

class DogController implements DogController {
  dogContainer: HTMLElement;
  dogModal: HTMLElement;

  constructor(dogContainer: HTMLElement, dogModal: HTMLElement) {
    this.dogContainer = dogContainer;
    this.dogModal = dogModal;
    this.dogModal.addEventListener('click', this.modalClose);
  };

  private modalOpen = (event: MouseEvent) => {
    const { src: imgSrc } = event.target as HTMLImageElement; 
    this.dogModal.classList.add('open');
    this.dogModal.innerHTML = `<img src="${ imgSrc }" alt="dog full size">`;
  };
  
  private modalClose = () => {
    this.dogModal.classList.remove('open');
    this.dogModal.innerHTML = '';
  };

  paginationButton = (value: number, title: string) => {
    const button = document.createElement('button');
    button.setAttribute('value', `${value}`);
    button.innerHTML = title;
    button.onclick = this.getPage;
    return button;
  };

  getPage = async (event: Event) => {
    const button: HTMLButtonElement = event.target as HTMLButtonElement;
    const response = await DogModel.callAPIforData({page: parseInt(button.value)});
    this.dogThumbnails(response);
  };
  
  dogThumbnails = (response: any) => {
    const { pageItems, prevPage, nextPage} = response.data;
  
    this.dogContainer.innerHTML = '';
    this.dogContainer.innerHTML = `<section class="dog-thumbnails">${pageItems.reduce((acc: string, url: string) => {
      acc += `<div class="col"><img class="dog-trigger" src="${url}" alt="dog"/></div>`;
      return acc;
    }, '')}</section>`;
  
    const allImages = this.dogContainer.getElementsByClassName('dog-trigger');
    Array.from(allImages)
      .forEach((element: HTMLImageElement )=> {
        element.addEventListener('click', this.modalOpen);
      });
  
    if (nextPage !== undefined) {
      const button = this.paginationButton(nextPage, 'next page');
      this.dogContainer.prepend(button);
    }
  
    if (prevPage !== undefined) {
      const button = this.paginationButton(prevPage, 'previous page');
      this.dogContainer.prepend(button);
    }
  };
}

export default DogController;