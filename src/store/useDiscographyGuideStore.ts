import { create } from "zustand";

interface DiscographyGuideState {
  hasInteractiveTrackList: boolean;
  setHasInteractiveTrackList: (value: boolean) => void;
}

const useDiscographyGuideStore = create<DiscographyGuideState>((set) => ({
  hasInteractiveTrackList: false,
  setHasInteractiveTrackList: (v) => set({ hasInteractiveTrackList: v }),
}));
export default useDiscographyGuideStore;
