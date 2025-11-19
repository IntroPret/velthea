"use client";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import type { Hamper, HamperItem, PackagingOption, BoxSize } from "./types";
import { hampers } from "./mockData";

export type PersonalizationState = {
  base?: Hamper;
  items: HamperItem[];
  packaging?: PackagingOption;
  message: string;
  greeting: string;
  receiverName?: string;
  boxSize?: BoxSize;
  withMessageCard: boolean;
  withContents: boolean; // New state for including contents
  recipient?: {
    name: string;
    address: string;
    date: string; // ISO
  };
};

type Action =
  | { type: "SET_BASE"; base: Hamper }
  | { type: "TOGGLE_ITEM"; item: HamperItem }
  | { type: "SET_PACKAGING"; packaging: PackagingOption }
  | { type: "SET_MESSAGE"; message: string }
  | { type: "SET_GREETING"; greeting: string }
  | { type: "SET_RECEIVER_NAME"; receiverName: string }
  | { type: "SET_RECIPIENT"; recipient: PersonalizationState["recipient"] }
  | { type: "SET_BOX_SIZE"; boxSize: BoxSize }
  | { type: "TOGGLE_WITH_MESSAGE_CARD" }
  | { type: "SET_WITH_CONTENTS"; withContents: boolean } // New action
  | { type: "RESET" };

const initialState: PersonalizationState = {
  base: hampers[0],
  items: hampers[0].defaultItems,
  packaging: undefined,
  message: "",
  greeting: "Best Wishes",
  receiverName: "",
  boxSize: hampers[0].boxSizes[0],
  withMessageCard: true,
  withContents: true, // Default to including contents
  recipient: undefined,
};

function reducer(
  state: PersonalizationState,
  action: Action
): PersonalizationState {
  switch (action.type) {
    case "SET_BASE": {
      return {
        ...state,
        base: action.base,
        items: action.base.defaultItems,
        boxSize: action.base.boxSizes[0],
      };
    }
    case "TOGGLE_ITEM": {
      const exists = state.items.find((i) => i.id === action.item.id);
      if (exists) {
        return {
          ...state,
          items: state.items.filter((i) => i.id !== action.item.id),
        };
      }
      if (state.boxSize && state.items.length >= state.boxSize.itemLimit) {
        // Return current state without showing a toast from the reducer
        return state;
      }
      return { ...state, items: [...state.items, action.item] };
    }
    case "SET_PACKAGING": {
      return { ...state, packaging: action.packaging };
    }
    case "SET_MESSAGE": {
      return { ...state, message: action.message };
    }
    case "SET_GREETING": {
      return { ...state, greeting: action.greeting };
    }
    case "SET_RECEIVER_NAME": {
      return { ...state, receiverName: action.receiverName };
    }
    case "SET_RECIPIENT": {
      return { ...state, recipient: action.recipient };
    }
    case "SET_BOX_SIZE": {
      return { ...state, boxSize: action.boxSize, items: [] };
    }
    case "TOGGLE_WITH_MESSAGE_CARD": {
      return { ...state, withMessageCard: !state.withMessageCard };
    }
    case "SET_WITH_CONTENTS": {
      return {
        ...state,
        withContents: action.withContents,
        items: action.withContents ? state.items : [],
      };
    }
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

const StoreContext = createContext<{
  state: PersonalizationState;
  dispatch: React.Dispatch<Action>;
}>({ state: initialState, dispatch: () => {} });

export function isPersonalizationComplete(state: PersonalizationState) {
  const hasBase = Boolean(state.base && state.base.id);
  const hasBoxSize = Boolean(state.boxSize);
  const hasGreeting = Boolean(state.greeting && state.greeting.trim());
  const hasDecorations = !state.withContents || state.items.length > 0;
  const hasPackaging = Boolean(state.packaging);
  const messageReady = !state.withMessageCard || Boolean(state.message.trim());

  return (
    hasBase &&
    hasBoxSize &&
    hasGreeting &&
    hasDecorations &&
    hasPackaging &&
    messageReady
  );
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("velthea-state");
      if (raw) {
        const parsed = JSON.parse(raw);
        dispatch({ type: "SET_MESSAGE", message: parsed.message ?? "" });
        if (typeof parsed.greeting === "string") {
          dispatch({ type: "SET_GREETING", greeting: parsed.greeting });
        }
        if (typeof parsed.receiverName === "string") {
          dispatch({ type: "SET_RECEIVER_NAME", receiverName: parsed.receiverName });
        }
      }
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(
        "velthea-state",
        JSON.stringify({
          message: state.message,
          greeting: state.greeting,
          receiverName: state.receiverName,
        })
      );
    } catch {}
  }, [state.greeting, state.message, state.receiverName]);

  const value = useMemo(() => ({ state, dispatch }), [state]);
  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
}

export function useStore() {
  return useContext(StoreContext);
}