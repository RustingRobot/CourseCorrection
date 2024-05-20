import { exec } from 'child_process';

var int = 0;
export default function handler(req, res) {
    res.status(200).json({"number": int});
    int++;
}