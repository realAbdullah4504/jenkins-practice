const fs = require('fs');
const path = require('path');

// Directory of Next.js pages
const pagesDirectory = path.join(process.cwd(), 'pages/cuanto-cuesta');
const outputFilePath = path.join(process.cwd(), 'constants/siteMapsSeoPages/index.ts');

function getAllUrls() {
  const urls = [];

  function readDirectory(directory) {
    const items = fs.readdirSync(directory);

    items.forEach((item) => {
      const fullPath = path.join(directory, item);
      const stats = fs.statSync(fullPath);

      if (stats.isDirectory()) {
        readDirectory(fullPath);
      } else {
        // Get the path relative to the pages directory and remove the file extension
        const relativePath = path.relative(pagesDirectory, fullPath);
        let route = relativePath
          .replace(/\\/g, '/') // For Windows paths
          .replace(/\.jsx?$/, '') // Remove .js and .jsx extensions
          .replace(/\.tsx?$/, ''); // Remove .ts and .tsx extensions

        // Remove index at the end and map to root if necessary
        if (route.endsWith('/index')) {
          route = route.replace(/\/index$/, '');
        }

        // Ensure the route starts with a slash
        route = `/${route}`;

        // Skip special Next.js files and the 'api' folder
        if (!route.startsWith('/_') && !route.startsWith('/api')) {
          urls.push(route);
        }
      }
    });
  }

  readDirectory(pagesDirectory);

  return urls;
}

// Execute the function and log the output
const urls = getAllUrls();
fs.writeFileSync(outputFilePath, JSON.stringify(urls, null, 2));
