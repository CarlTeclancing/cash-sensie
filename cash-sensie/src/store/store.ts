import { create } from "zustand";

interface registrationDataType {
  name: string;
  password: string;
  email: string;
  address: string;
  occupation: string;
  dateOfBirth: string;
  currency: string;
  aboutUs: string;
}

interface AppState {
  userLoggedIn: boolean;
  isDarkMode: boolean;
  currentRegisterPage?: number;
  registrationData: registrationDataType;
  completedPagesRegister: number;
  isAddtransactionsFormVisible: boolean;
  toggleAddTransactionsForm: () => void;
  updateCompletedPagesRegister: (page: number) => void;
  changeRegisterPage?: (page: number) => void;
  incrementRegisterPage?: () => void;
  toggleDarkMode: () => void;
  updateRegistrationData: (newRegistrationData: registrationDataType) => void;
}

export const useAppStore = create<AppState>((set) => ({
  userLoggedIn: false,
  isDarkMode: false,
  currentRegisterPage: 1,
  completedPagesRegister: 0,
  isAddtransactionsFormVisible: false,
  registrationData: {
    name: "",
    password: "",
    email: "",
    address: "",
    occupation: "",
    dateOfBirth: "",
    currency: "",
    aboutUs: "",
  },
  changeRegisterPage: (page: number) =>
    set(() => ({
      currentRegisterPage: page,
    })),
  incrementRegisterPage: () =>
    set((state) => ({
      currentRegisterPage:
        state.currentRegisterPage && state.currentRegisterPage + 1,
    })),
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
  updateRegistrationData: (newRegistrationData: registrationDataType) =>
    set(() => ({ registrationData: newRegistrationData })),
  updateCompletedPagesRegister: (page: number) =>
    set(() => ({ completedPagesRegister: page })),
  toggleAddTransactionsForm: () => set((state) => ({ isAddtransactionsFormVisible: !state.isAddtransactionsFormVisible }))
}));
