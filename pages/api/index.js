/* import axios from 'axios';

export default async (req, res) => {
  console.log(req.url);
  console.log(decodeURIComponent(req.url.slice(5)));
  const { data } = await axios.get(`${decodeURIComponent(req.url.slice(5, -1))}`
  , {
    headers: {
        'User-Agent': 'curl/7.68.0'
    }
  });
  res.json(data);
};
 */
import { exec } from 'child_process';

import fsPromises from 'fs/promises';
import path from 'path'

export default async function handler(req, res) {
  const filePath = path.join(process.cwd(), 'tmp/cache');
  const jsonData = await fsPromises.readFile(filePath);
  const cach_file = JSON.parse(jsonData);
  console.log("cache: " + JSON.stringify(cach_file));

  var url = req.url.slice(5, -1);
  console.log("url: " + url);
  if (url in cach_file) {
    console.log("in cache")
    res.status(200).json({"value": cach_file[url], "cached": true});
    return;
  }{
    console.log("not in cache")
  }
  exec('curl -X GET ' + decodeURIComponent(url), (error, stdout, stderr) => {
    if (error) {
      res.status(500).json({ error: stderr });
      return;
    }

    if (JSON.parse(stdout)["response"] == "Too many requests") {
      res.status(200).json(JSON.parse(stdout));
      return;
    }

    res.status(200).json(JSON.parse(stdout));
    cach_file[url] = JSON.parse(stdout);
    fsPromises.writeFile(filePath, JSON.stringify(cach_file));
  });
}