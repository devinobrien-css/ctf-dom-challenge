import { httpGet } from './http';
import { filterNodes, nodeListToArray } from './util';

/**
 * Find hidden link from the given URL
 * @param debug
 * @returns the hidden keyword
 */
export const findHiddenLink = async () => {
  const hidden_url: string[] = [];

  const html = await httpGet(
    'https://tns4lpgmziiypnxxzel5ss5nyu0nftol.lambda-url.us-east-1.on.aws/challenge',
  );

  const temporary_root_node = document.createElement('div');
  temporary_root_node.innerHTML = html;

  // level 1. find code tags with data class starting with 23
  filterNodes(
    nodeListToArray(temporary_root_node?.childNodes),
    Node.ELEMENT_NODE,
  )?.map((root_element: Element) => {
    if (
      root_element.tagName === 'CODE' &&
      root_element.getAttribute('data-class')?.startsWith('23')
    ) {
      // level 2. find div tags with data tag ending with 93
      filterNodes(
        nodeListToArray(root_element.childNodes),
        Node.ELEMENT_NODE,
      )?.map((child: Element) => {
        if (
          child.tagName === 'DIV' &&
          child.getAttribute('data-tag')?.endsWith('93')
        ) {
          // level 3. find span tags with data id containing 21
          filterNodes(
            nodeListToArray(child.childNodes),
            Node.ELEMENT_NODE,
          )?.map((grandChild: Element) => {
            if (
              grandChild.tagName === 'SPAN' &&
              grandChild.getAttribute('data-id')?.includes('21')
            ) {
              // level 4. find i tags with class containing char
              filterNodes(
                nodeListToArray(grandChild.childNodes),
                Node.ELEMENT_NODE,
              )?.map((greatGrandChild: Element) => {
                if (
                  greatGrandChild.tagName === 'I' &&
                  greatGrandChild.getAttribute('class')?.includes('char')
                ) {
                  hidden_url.push(greatGrandChild.getAttribute('value') ?? '');
                }
              });
            }
          });
        }
      });
    }
  });

  // retrieve keyword from the hidden URL
  const keyword_response = await httpGet(hidden_url.join(''));
  return keyword_response;
};
