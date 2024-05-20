import axios from 'axios';

export default async (req, res) => {
  console.log("test");
  console.log(req.url);
  const { data } = await axios.get(`${req.url.slice(6)}`);
  res.json(data);
};