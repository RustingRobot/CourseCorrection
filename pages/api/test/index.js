import { exec } from 'child_process';

export default function handler(req, res) {
  exec('curl -X GET https://api.scratch.mit.edu/users/scratchcat', (error, stdout, stderr) => {
    if (error) {
      res.status(500).json({ error: stderr });
      return;
    }
    res.status(200).json(JSON.parse(stdout));
  });
}