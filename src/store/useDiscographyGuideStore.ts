import { create } from "zustand";

interface DiscographyGuideState {
  guideButton: boolean;
  setGuideButton: (value: boolean) => void;
}

const useDiscographyGuideStore = create<DiscographyGuideState>((set) => ({
  guideButton: false,
  setGuideButton: (v) => set({ guideButton: v }),
}));
export default useDiscographyGuideStore;
