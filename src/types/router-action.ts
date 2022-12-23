type RouterAction =
  | {
      readonly href?: string;
      readonly replace?: boolean;
      readonly state?: {} | null;
    }
  | { readonly delta: number };

export { type RouterAction };
