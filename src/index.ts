import 'core-js/stable';
import 'regenerator-runtime/runtime';

import DogController from './dogController';
import DogDropDown from './dogDropDown';
import DogModel from './dogModel';


const initPage = async () => {
  const selection = document.getElementById('selction');
  const dropDownItems = await DogModel.callAPIforData();

  const dogContainer = document.getElementById('dogs');
  const dogModal = document.getElementsByClassName('modal')[0] as HTMLElement;

  const dogController = new DogController(dogContainer, dogModal);
  new DogDropDown(selection, dogController, dropDownItems);
  
};

initPage();
