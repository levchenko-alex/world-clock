/**
 * Using this directive instead of autofocus attribute
 */
export const focus = {
  inserted(el) {
    el.focus()
  },
};
