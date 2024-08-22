import { exec } from 'child_process';

export default function handler(req, res) {
  var url = req.url.slice(10, -1);
  console.log(url);
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
  });
}