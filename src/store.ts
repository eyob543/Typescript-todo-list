import { create } from "zustand";
type State = {
  isLoggedIn: boolean;
  setIsLoggedIn: (log: boolean) => void;
  user: string | null;
  setUser: (log: string | null) => void;
};
export const useTodos = create<State>((set) => ({
  isLoggedIn: false,
  setIsLoggedIn: (log: boolean) => set(() => ({ isLoggedIn: log })),
  user: "",
  setUser: (log: string | null) => set(() => ({ user: log })),
}));
export const useLoginInfo = () => useTodos((state) => state.isLoggedIn);
export const useUser = () => useTodos((state) => state.user);
