export function downloadRoadmapAsSvg() {
  const element = document.querySelector(".react-flow") as HTMLElement | null;

  if (!element) return;

  const clone = element.cloneNode(true) as HTMLElement;

  // Copy styles from the original elements.
  function copyStyles(source: Element, target: Element) {
    if (
      !(source instanceof HTMLElement || source instanceof SVGElement) ||
      !(target instanceof HTMLElement || target instanceof SVGElement)
    ) {
      return;
    }

    const styles = getComputedStyle(source);

    for (const property of Array.from(styles)) {
      target.style.setProperty(property, styles.getPropertyValue(property));
    }

    Array.from(source.children).forEach((child, index) => {
      const targetChild = target.children[index];

      if (targetChild) {
        copyStyles(child, targetChild);
      }
    });
  }

  copyStyles(element, clone);

  const width = element.clientWidth;
  const height = element.clientHeight;

  if (!width || !height) return;

  clone.style.width = `${width}px`;
  clone.style.height = `${height}px`;

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg"
         xmlns:xhtml="http://www.w3.org/1999/xhtml"
         width="${width}"
         height="${height}"
         viewBox="0 0 ${width} ${height}">
      <foreignObject width="100%" height="100%">
        ${new XMLSerializer().serializeToString(clone)}
      </foreignObject>
    </svg>
  `;

  const blob = new Blob([svg], {
    type: "image/svg+xml;charset=utf-8",
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = "roadmap.svg";
  document.body.appendChild(link);
  link.click();
  link.remove();

  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
