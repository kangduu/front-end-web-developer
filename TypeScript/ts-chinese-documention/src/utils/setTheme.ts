export default function setTheme(theme: string): void {
  const documentElement: HTMLElement = document.documentElement;

  if (documentElement.hasAttribute("theme")) {
    documentElement.removeAttribute("theme");
  }

  documentElement.setAttribute("theme", theme);
}
