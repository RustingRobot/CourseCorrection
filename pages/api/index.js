import axios from 'axios';

export default async (req, res) => {
  console.log("test");
  console.log(req.url);
  console.log(decodeURIComponent(req.url.slice(5)));
  const { data } = await axios.get(`${decodeURIComponent(req.url.slice(5, -1))}`);
  res.json(data);
};