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

var cache = {};

export default function handler(req, res) {
  console.log(cache);
  var url = req.url.slice(5, -1);
  if (url in cache) {
    console.log("in cache")
    res.status(200).json({"value": cache[url], "cached": true});
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
    cache[url] = JSON.parse(stdout);
  });
}