/**
 * Converts a NodeList to an array
 * @param nodes NodeList of dom nodes
 * @returns array of dom nodes
 */
export const nodeListToArray = (nodes: NodeListOf<ChildNode> | undefined) => {
  return Array.prototype.slice.call(nodes);
};

/**
 * Filters an array of nodes based on the given nodeType
 * @param nodes
 * @param nodeType
 * @returns
 */
export const filterNodes = (
  nodes: Array<ChildNode> | undefined,
  nodeType: number,
): Array<Element> => {
  return (
    (nodes?.filter(
      (elem: ChildNode) => elem.nodeType === nodeType,
    ) as Element[]) ?? []
  );
};
