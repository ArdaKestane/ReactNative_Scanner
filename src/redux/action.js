import AsyncStorage from '@react-native-async-storage/async-storage';

export const SET_ACTIVE_SCREEN = 'SET_ACTIVE_SCREEN';
export const SET_SCANNED_IMAGE = 'SET_SCANNED_IMAGE';
export const SET_COMPONENTS_DATA = 'SET_COMPONENTS_DATA';
export const SET_SELECTED_COMPONENT = 'SET_SELECTED_COMPONENT';
export const SET_WELCOME_PAGE_SHOWN = 'SET_WELCOME_PAGE_SHOWN';
export const ADD_COMPONENT = 'ADD_COMPONENT';
export const DELETE_COMPONENT = 'DELETE_COMPONENT';
export const HANDLE_COMPONENT_PRESS = 'HANDLE_COMPONENT_PRESS';
export const SAVE_DATA_SUCCESS = 'SAVE_DATA_SUCCESS';
export const SAVE_DATA_ERROR = 'SAVE_DATA_ERROR';
export const SAVE_COMPONENT = 'SAVE_COMPONENT';
export const SET_USERNAME = 'SET_USERNAME';
export const RESET_STATE = 'RESET_STATE';

export const setActiveScreen = screen => ({
  type: SET_ACTIVE_SCREEN,
  payload: screen,
});

export const setScannedImage = image => ({
  type: SET_SCANNED_IMAGE,
  payload: image,
});

export const setComponentsData = data => ({
  type: SET_COMPONENTS_DATA,
  payload: data,
});

export const setSelectedComponent = component => ({
  type: SET_SELECTED_COMPONENT,
  payload: component,
});

export const setWelcomePageShown = shown => ({
  type: SET_WELCOME_PAGE_SHOWN,
  shown,
});

export const addComponent = component => ({
  type: ADD_COMPONENT,
  payload: component,
});

export const deleteComponent = componentId => ({
  type: DELETE_COMPONENT,
  payload: componentId,
});

export const saveDataSuccess = () => {
  return {
    type: SAVE_DATA_SUCCESS,
  };
};

export const saveDataError = errorMessage => {
  return {
    type: SAVE_DATA_ERROR,
    payload: errorMessage,
  };
};

export const saveComponent = component => ({
  type: SAVE_COMPONENT,
  payload: component,
});

export const setGlobalUsername = username => {
  return {
    type: SET_USERNAME,
    payload: username,
  };
};

export const resetState = () => {
  return {
    type: RESET_STATE,
  };
};
