import loginIdData from './data/login-id.json';
import '../styles/additional.scss';

export async function printInstance(screen: any) {
  const $container = document.createElement('div');
  const $content = document.createElement('div');
  const $title = document.createElement('p');

  $title.textContent = 'Possible operations and their results on this screen';
  $title.classList.add('info-title');
  $title.addEventListener('click', () => {
    const contentDisplay = $content.style.display;
    $content.style.display = contentDisplay === 'none' ? 'block' : 'none';
  });
  $container.classList.add('info-container');
  $container.appendChild($title);
  $content.classList.add('info-content');
  

  // Extract values from loginIdData
  const { importName, importPath, instanceName } = loginIdData;

  // Create and append a div with the example usage at the top
  const $exampleDiv = document.createElement('div');
  $exampleDiv.textContent = `import ${importName} from 'ul-javascript/${importPath}';\nconst ${instanceName} = new ${importName}();`;
  $exampleDiv.classList.add('example-usage');
  $content.appendChild($exampleDiv);

  function createDivRows(dataObject: any, parentKey = '') {
    for (const [category, keys] of Object.entries(dataObject)) {
      
      // Create and append a header for each category
      const $headerDiv = document.createElement('div');
      $headerDiv.textContent = category.toUpperCase();
      $headerDiv.classList.add('category-header');
      $content.appendChild($headerDiv);
      
      for (const key of keys as string[]) {
        const fullKey = parentKey ? `${parentKey}.${category}.${key}` : `${category}.${key}`;
        
        const usagePath = `${instanceName}.${fullKey}`;
        
        // Attempt to evaluate the value using the `eval` method.
        let result;
        try {
          result = eval(usagePath);
        } catch (error) {
          console.log(usagePath, error);
          result = 'undefined';
        }

        // Create div elements for usage path and result
        const $itemDiv = document.createElement('div');
        const $usageDiv = document.createElement('div');
        const $resultDiv = document.createElement('div');

        $usageDiv.textContent = usagePath;

        // Pretty-print the result if it's an object or array
        if (typeof result === 'object' && result !== null) {
          $resultDiv.textContent = JSON.stringify(result, null, 2);
        } else {
          $resultDiv.textContent = String(result);
        }

        $itemDiv.classList.add('info-item');
        $usageDiv.classList.add('info-usage');
        $resultDiv.classList.add('info-result');

        $itemDiv.appendChild($usageDiv);
        $itemDiv.appendChild($resultDiv);
        $content.appendChild($itemDiv);
      }
    }
  }

  createDivRows(loginIdData.data, screen.name);
  $container.appendChild($content);
  document.body.appendChild($container);
}
