import axios from 'axios';

export default async (req, res) => {
  console.log("test");
  console.log(req.url);
  const { data } = await axios.get(`${decodeURI(req.url.slice(5))}`);
  res.json(data);
};