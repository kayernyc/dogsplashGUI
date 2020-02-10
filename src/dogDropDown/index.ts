import DogController from '../dogController';
import DogModal from '../dogModel';

interface DogDropDown {
  dogController: DogController;
}

class DogDropDown implements DogDropDown{
  dogController: DogController;

  constructor(selection: HTMLElement, dogController: DogController, dropDownItems: any) {
    this.dogController = dogController;

    selection.appendChild(this.createDropDown(dropDownItems));
  }

  getDogType = async (event: Event) => {
    const select = event.target as HTMLFormElement;
    const response = await DogModal.callAPIforData({type: select.value});
    this.dogController.dogThumbnails(response);
  };
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createDropDown = (obj: any) => {
    const dogTypes = Object.keys(JSON.parse(obj.data).message);
    const form = document.createElement('form');
    form.innerHTML = `<legend>select a breed</legend><select id="dogList"">${dogTypes.reduce((acc: string, type: string) => {
      return acc += `<option value = "${type}">${type}</option>`;
    }, '')}</select>`;
  
    const selectElement: HTMLFormElement = form.querySelector('#dogList');
    selectElement.addEventListener('change', this.getDogType);
  
    const event = new CustomEvent('change', {target: selectElement});
    selectElement.dispatchEvent(event);
  
    return form;
  };
}

export default DogDropDown;