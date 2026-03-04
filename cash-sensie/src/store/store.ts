import { create } from "zustand";
import axios from "axios"; 

interface User {
  id?: string;
  name?: string;
  email?: string;
  createdAt?: string;
  settings?: any;
  profile?: any;
}

interface registrationDataType {
  name: string;
  password: string;
  email: string;
  address: string;
  occupation: string;
  dateOfBirth: string;
  currency: string;
  heardAbout: string;
}


interface TransactionData {
  id?: string;
  title: string;
  emoji: string;
  amount: number;
  type: string;
  category: string; 
  date: string;
  note: string;
}


interface AppState {
  userId: string | null;
  userToken: string | null;
  userLoggedIn: boolean;
  user: User | null;
  isDarkMode: boolean;
  setUser: (u: User | null) => void;
  updateUser: (partial: Partial<User>) => void;
  currentRegisterPage?: number;
  registrationData: registrationDataType;
  completedPagesRegister: number;
  isAddtransactionsFormVisible: boolean;
  
  transactions: TransactionData[];
  transactionFilterType: 'All' | 'Debit' | 'Saving';
  setTransactionFilterType: (t: 'All' | 'Debit' | 'Saving') => void;
  currentTransactionMode?: "add" | "edit";
  currentTransactionData?: TransactionData | null;
  toggleAddTransactionsForm: () => void;
  updateCompletedPagesRegister: (page: number) => void;
  changeRegisterPage?: (page: number) => void;
  incrementRegisterPage?: () => void;
  toggleDarkMode: () => void;
  updateRegistrationData: (newRegistrationData: registrationDataType) => void;
  
  addTransaction: (transaction: Omit<TransactionData, 'id'>) => Promise<void>;
  updateTransaction: (id: string, data: Partial<TransactionData>) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
  fetchTransactions: () => Promise<void>;
  setTransactionMode: (mode: "add" | "edit", data?: TransactionData) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  userId: null,
  userToken: null,
  userLoggedIn: false,
  user: null,
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
    heardAbout: "",
  },
  
  transactions: [],
  transactionFilterType: 'All',
  setTransactionFilterType: (t) => set({ transactionFilterType: t }),
  currentTransactionMode: "add",
  currentTransactionData: null,
  
  
  changeRegisterPage: (page: number) =>
    set(() => ({
      currentRegisterPage: page,
    })),
  incrementRegisterPage: () =>
    set((state) => ({
      currentRegisterPage:
        state.currentRegisterPage ? state.currentRegisterPage + 1 : 2,
    })),
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
  updateRegistrationData: (newRegistrationData: registrationDataType) =>
    set(() => ({ registrationData: newRegistrationData })),
  updateCompletedPagesRegister: (page: number) =>
    set(() => ({ completedPagesRegister: page })),
  
  setUser: (u) => set({ user: u }),
  updateUser: (partial) =>
    set((state) => ({
      user: state.user ? { ...state.user, ...partial } : ({ ...partial } as any),
    })),
  
  toggleAddTransactionsForm: () => 
    set((state) => ({ 
      isAddtransactionsFormVisible: !state.isAddtransactionsFormVisible,
      currentTransactionMode: "add",
      currentTransactionData: null
    })),
    
  setTransactionMode: (mode: "add" | "edit", data?: TransactionData) =>
    set({ 
      isAddtransactionsFormVisible: true,
      currentTransactionMode: mode,
      currentTransactionData: data || null 
    }),
    
addTransaction: async (transactionData: Omit<TransactionData, 'id'>) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post("http://localhost:4000/api/transaction", 
      transactionData, 
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }
    );
    set((state) => ({
      transactions: [...state.transactions, { 
        id: response.data.transaction._id, 
        ...transactionData 
      }]
    }));
    set({ isAddtransactionsFormVisible: false });

  } catch (error) {
    console.error("Failed to add transaction:", error);
    throw error;
  }
},
  
  updateTransaction: async (id: string, updatedData: Partial<TransactionData>) => {
    try {
      const response = await axios.put(`http://localhost:4000/api/transaction/${id}`, updatedData);
      set((state) => ({
        transactions: state.transactions.map(tx => 
          tx.id === id ? response.data.transaction : tx
        )
      }));
      set({ isAddtransactionsFormVisible: false });
    } catch (error) {
      console.error("Failed to update transaction:", error);
    }
  },
  
  deleteTransaction: async (id: string) => {
    try {
      await axios.delete(`http://localhost:4000/api/transactions/${id}`);
      set((state) => ({
        transactions: state.transactions.filter(tx => tx.id !== id)
      }));
    } catch (error) {
      console.error("Failed to delete transaction:", error);
    }
  },
  
  fetchTransactions: async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/transaction", {
        params: { userId: localStorage.getItem('userId') }
      });
      set({ transactions: response.data.transactions });
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
    }
  }
}));
