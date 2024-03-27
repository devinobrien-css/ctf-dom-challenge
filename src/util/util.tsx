const toArray = (nodes: NodeListOf<ChildNode> | undefined) => {
  return Array.prototype.slice.call(nodes);
};

const filterOnlyElements = (
  nodes: Array<ChildNode> | undefined,
): Array<Element> => {
  return (
    (nodes?.filter(
      (elem: ChildNode) => elem.nodeType === Node.ELEMENT_NODE,
    ) as Element[]) ?? []
  );
};

const httpGet = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch HTML content');
  }
  return await response.text();
};

export const findHiddenLink = async (debug: boolean = false) => {
  const html = await httpGet(
    'https://tns4lpgmziiypnxxzel5ss5nyu0nftol.lambda-url.us-east-1.on.aws/challenge',
  );

  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;

  const nodes = toArray(tempDiv?.childNodes);

  if (!nodes) {
    throw new Error('Failed to read nodes from HTML content');
  }

  const word: string[] = [];

  // find code tags with data class starting with 23
  filterOnlyElements(nodes)?.map((elem: Element) => {
    const data_class = elem.getAttribute('data-class') ?? '';
    if (elem.tagName === 'CODE' && data_class.startsWith('23')) {
      debug && console.log(`<code data-class='${data_class}' >`);
      const children = toArray(elem.childNodes);

      // find div tags with data tag ending with 93
      filterOnlyElements(children)?.map((child: Element) => {
        const data_tag = child.getAttribute('data-tag') ?? '';
        if (child.tagName === 'DIV' && data_tag.endsWith('93')) {
          debug && console.log(`<div data-tag='${data_tag}' >`);
          const grandChildren = toArray(child.childNodes);

          // find span tags with data id containing 21
          filterOnlyElements(grandChildren)?.map((grandChild: Element) => {
            const data_id = grandChild.getAttribute('data-id') ?? '';

            if (grandChild.tagName === 'SPAN' && data_id.includes('21')) {
              debug && console.log(`<span data-id='${data_id}' >`);
              const greatGrandChildren = toArray(grandChild.childNodes);

              // find i tags with class containing char
              filterOnlyElements(greatGrandChildren)?.map(
                (greatGrandChild: Element) => {
                  const class_value =
                    greatGrandChild.getAttribute('class') ?? '';
                  if (
                    greatGrandChild.tagName === 'I' &&
                    class_value.includes('char')
                  ) {
                    debug && console.log(`<i class='${class_value}' >`);

                    word.push(greatGrandChild.getAttribute('value') ?? '');
                  }
                },
              );
            }
          });
        }
      });
      debug && console.log(' ');
    }
  });

  const key_response = await fetch(word.join(''));
  if (!key_response.ok) {
    throw new Error('Failed to fetch HTML content');
  }
  const htmlContent = await key_response.text();
  debug && console.log(htmlContent);
  return htmlContent;
};
