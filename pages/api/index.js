import axios from 'axios';

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