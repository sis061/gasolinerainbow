import { create } from "zustand";

interface DiscographyState {
  hasInteractiveTrackList: boolean;
  showOverlayText: boolean;
  GoToDiscActive: boolean;
  setHasInteractiveTrackList: (value: boolean) => void;
  setShowOverlayText: (value: boolean) => void;
  setGoToDiscActive: (value: boolean) => void;
}

const useDiscographyStore = create<DiscographyState>((set) => ({
  hasInteractiveTrackList: false,
  showOverlayText: false,
  GoToDiscActive: false,
  setHasInteractiveTrackList: (v) => set({ hasInteractiveTrackList: v }),
  setShowOverlayText: (v) => set({ showOverlayText: v }),
  setGoToDiscActive: (v) => set({ GoToDiscActive: v }),
}));
``;
export default useDiscographyStore;
