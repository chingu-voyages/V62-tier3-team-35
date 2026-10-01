"use client";

import { createContext, useContext, useState } from "react";

type RoadmapContextType = {
  roadmap: unknown;
  setRoadmap: (roadmap: unknown) => void;
};

const RoadmapContext = createContext<RoadmapContextType | null>(null);

export function RoadmapProvider({ children }: { children: React.ReactNode }) {
  const [roadmap, setRoadmap] = useState<unknown>(null);

  return (
    <RoadmapContext.Provider value={{ roadmap, setRoadmap }}>
      {children}
    </RoadmapContext.Provider>
  );
}

export function useRoadmap() {
  //   const context = useContext(RoadmapContext);

  //   if (!context) {
  //     throw new Error("useRoadmap must be used inside RoadmapProvider");
  //   }
  return useContext(RoadmapContext);

  // return context;
}
