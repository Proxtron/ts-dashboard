import type { AppContextType } from "@/types/Context";
import { createContext } from "react";

export const AppContext = createContext<AppContextType | undefined>(undefined);