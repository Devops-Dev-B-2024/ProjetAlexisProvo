declare namespace Express {
  interface Request {
    userId: number;
    userRole: 'user' | 'admin';
  }
}
