import File from '../models/File';

export class FileController {
  async store(req, res) {
    const { originalName: name, fileName: path } = req.file;

    const file = await File.create({
      name,
      path,
    });

    return res.json(file);
  }
}

export default FileController;
