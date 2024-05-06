import { Request, Response, NextFunction } from 'express';

const getVersion = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const version = process.env.npm_package_version;
    res.status(200).json({ version: version });
  } catch (error) {
    next(error);
  }
};

export default {
  getVersion,
};
