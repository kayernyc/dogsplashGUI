import DogController from '../dogController';
import DogModal, { QueryObjectDogTypes, DogAPIResponse } from '../dogModel';

interface DogDropDown {
  dogController: DogController;
}

class DogDropDown implements DogDropDown{
  dogController: DogController;

  constructor(selection: HTMLElement, dogController: DogController, dropDownItems: QueryObjectDogTypes) {
    this.dogController = dogController;

    selection.appendChild(this.createDropDown(dropDownItems));
  }

  getDogType = async (event: Event) => {
    const select = event.target as HTMLFormElement;
    const response = await DogModal.callAPIforData({type: select.value}) as DogAPIResponse;
    this.dogController.dogThumbnails(response);
  };
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createDropDown = (obj: QueryObjectDogTypes) => {
    const {data} = obj;
    console.log(typeof data);
    const dogTypes = Object.keys(JSON.parse(data).message);
    const form = document.createElement('form');
    form.innerHTML = `<legend>select a breed</legend><select id="dogList"">${dogTypes.reduce((acc: string, type: string) => {
      return acc += `<option value = "${type}">${type}</option>`;
    }, '')}</select>`;
  
    const selectElement: HTMLFormElement = form.querySelector('#dogList');
    selectElement.addEventListener('change', this.getDogType);

    // TODO: resolve CustomEvent problem
    const event = new CustomEvent('change', {target: selectElement});
    selectElement.dispatchEvent(event);
  
    return form;
  };
}

export default DogDropDown;
