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

export default function handler(req, res) {
  exec('curl -X GET ' + decodeURIComponent(req.url.slice(5, -1)), (error, stdout, stderr) => {
    if (error) {
      res.status(500).json({ error: stderr });
      return;
    }
    res.status(200).json(JSON.parse(stdout));
  });
}