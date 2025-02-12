export interface LanguageState {
  language: string;
}

const initialState: LanguageState = {
  language: 'fi',
};

interface SetLanguageAction {
  type: 'SET_LANGUAGE';
  payload: string;
}

export type LanguageAction = SetLanguageAction;

export const languageReducer = (
  state = initialState,
  action: LanguageAction,
): LanguageState => {
  switch (action.type) {
    case 'SET_LANGUAGE':
      return { ...state, language: action.payload };
    default:
      return state;
  }
};
