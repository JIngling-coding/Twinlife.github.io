import { create } from "zustand"

type SidebarStore = {
  isExpanded: boolean
  toggle: () => void
}

export const useSidebarStore = create<SidebarStore>((set) => ({
  isExpanded: true,
  toggle: () => set((state) => ({ isExpanded: !state.isExpanded })),
}))

