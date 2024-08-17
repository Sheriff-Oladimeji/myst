import { create } from "zustand";

interface SearchState {
  value: string;
  setValue: (newValue: string) => void;
}

const useSearchStore = create<SearchState>()((set) => ({
    value: "",
    setValue: (newValue: string) => set({value: newValue}) 

}));


export default useSearchStore