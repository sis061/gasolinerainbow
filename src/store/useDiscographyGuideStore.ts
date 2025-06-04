import { create } from "zustand";

interface DiscographyGuideState {
  hasInteractiveTrackList: boolean;
  showOverlayText: boolean;
  setHasInteractiveTrackList: (value: boolean) => void;
  setShowOverlayText: (value: boolean) => void;
}

const useDiscographyGuideStore = create<DiscographyGuideState>((set) => ({
  hasInteractiveTrackList: false,
  showOverlayText: false,
  setHasInteractiveTrackList: (v) => set({ hasInteractiveTrackList: v }),
  setShowOverlayText: (v) => set({ showOverlayText: v }),
}));

export default useDiscographyGuideStore;
