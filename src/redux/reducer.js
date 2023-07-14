import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  SET_ACTIVE_SCREEN,
  SET_SCANNED_IMAGE,
  SET_COMPONENTS_DATA,
  SET_SELECTED_COMPONENT,
  SET_WELCOME_PAGE_SHOWN,
  ADD_COMPONENT,
  DELETE_COMPONENT,
  HANDLE_COMPONENT_PRESS,
  SAVE_COMPONENT,
  SET_USERNAME,
} from './action';

const initialState = {
  activeScreen: 'home',
  scannedImage: null,
  componentsData: [],
  loading: false,
  selectedComponent: null,
  isWelcomePageShown: false,
  scannedImage: null,
  username: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ACTIVE_SCREEN:
      return {
        ...state,
        activeScreen: action.payload,
      };
    case SET_SCANNED_IMAGE:
      return {
        ...state,
        scannedImage: action.payload,
      };
    case SET_SELECTED_COMPONENT:
      return {
        ...state,
        selectedComponent: action.payload,
      };
    case SET_WELCOME_PAGE_SHOWN:
      return {
        ...state,
        isWelcomePageShown: action.shown,
      };

    case SET_COMPONENTS_DATA:
      return {
        ...state,
        componentsData: action.payload,
      };
    case ADD_COMPONENT:
      return {
        ...state,
        componentsData: [...state.componentsData, action.payload],
      };
    case DELETE_COMPONENT:
      return {
        ...state,
        componentsData: state.componentsData.filter(
          component => component.id !== action.payload,
        ),
      };
    case HANDLE_COMPONENT_PRESS:
      return state;

    case SAVE_COMPONENT:
      const updatedComponent = action.payload;
      const existingIndex = state.componentsData.findIndex(
        component => component.id === updatedComponent.id,
      );

      if (existingIndex !== -1) {
        // If the component exists, update its fields
        const updatedComponentsData = [...state.componentsData];
        updatedComponentsData[existingIndex] = updatedComponent;

        // Save the updated components to AsyncStorage
        AsyncStorage.setItem(
          'componentsData',
          JSON.stringify(updatedComponentsData),
        )
          .then(() => {
            console.log('Components saved to AsyncStorage.');
          })
          .catch(error => {
            console.log('Error saving components to AsyncStorage:', error);
          });

        return {
          ...state,
          componentsData: updatedComponentsData,
          selectedComponent: null, // Clear the selected component
        };
      } else {
        // If the component doesn't exist, create a new one
        const newComponentsData = [...state.componentsData, updatedComponent];

        // Save the new components to AsyncStorage
        AsyncStorage.setItem(
          'componentsData',
          JSON.stringify(newComponentsData),
        )
          .then(() => {
            console.log('Components saved to AsyncStorage.');
          })
          .catch(error => {
            console.log('Error saving components to AsyncStorage:', error);
          });

        return {
          ...state,
          componentsData: newComponentsData,
          selectedComponent: null, // Clear the selected component
        };
      }
    case SET_USERNAME:
      return {
        ...state,
        username: action.payload,
      };
    case 'RESET_STATE':
      return initialState;

    default:
      return state;
  }
};

export default reducer;
