import axios from 'axios';

export default async (req, res) => {
  console.log("test");
  console.log(req.url);
  const { data } = await axios.get(`https://api.scratch.mit.edu/users/RustingRobot`);
  res.json(data);
};