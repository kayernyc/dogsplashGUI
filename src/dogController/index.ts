import DogModel, {DogAPIResponse, QueryObjectDogImages} from '../dogModel';

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

  private paginationButton = (value: number, title: string): HTMLButtonElement => {
    const button = document.createElement('button');
    button.classList.add('col-thirds');
    button.setAttribute('value', `${value}`);
    button.innerHTML = title;
    button.onclick = this.getPage;
    return button;
  };

  private getPage = async (event: MouseEvent) => {
    const button: HTMLButtonElement = event.target as HTMLButtonElement;
    const response: DogAPIResponse = await DogModel.callAPIforData({page: parseInt(button.value)});
    this.dogThumbnails(response);
  };

  private labelText = (pageItemsCount: number, totalImages: number, prevPage?: number ): string => {
    if (totalImages < 1) {
      return 'no dogs for this breed';
    }

    if (totalImages === 1) {
      return 'one dog for this breed';
    }
   
    const startNumber = (prevPage !== undefined ? prevPage + 1 : 0) * 10;
    const endNumber = startNumber + pageItemsCount;
    return `${startNumber + 1} - ${endNumber} of ${totalImages} dogs`;
  };

  dogNavigation = (pageItemsCount: number, totalImages: number, nextPage?: number, prevPage?: number): HTMLElement => {
    const navigation = document.createElement('section');
    navigation.classList.add('dog-navigation', 'flex-container');

    const label = document.createElement('div');
    label.classList.add('col-thirds');
    label.innerHTML = this.labelText(pageItemsCount, totalImages, prevPage, );
    navigation.append(label);

    if (prevPage !== undefined) {
      const button = this.paginationButton(prevPage, 'previous page');
      navigation.prepend(button);
    }

    if (nextPage !== undefined) {
      const button = this.paginationButton(nextPage, 'next page');
      navigation.append(button);
    }

    return navigation;
  }
  
  dogThumbnails = (response: DogAPIResponse) => {
    // add type guard here to confirm data is QueryObjectDogImages
    const { pageItems, prevPage, nextPage, totalImages} = response.data as unknown as QueryObjectDogImages;
  
    this.dogContainer.innerHTML = '';
    this.dogContainer.innerHTML = `<section class="dog-thumbnails flex-container">${pageItems.reduce((acc: string, url: string) => {
      acc += `<div class="col"><img class="dog-trigger" src="${url}" alt="dog"/></div>`;
      return acc;
    }, '')}</section>`;
  
    const allImages = this.dogContainer.getElementsByClassName('dog-trigger');

    Array.from(allImages)
      .forEach((element: HTMLImageElement )=> {
        element.addEventListener('click', this.modalOpen);
      });
  
    this.dogContainer.prepend(this.dogNavigation(allImages.length, totalImages, nextPage, prevPage));
  };
}

export default DogController;