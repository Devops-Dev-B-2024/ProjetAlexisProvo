import express from 'express';
import { router as usersRouter } from './routers/users/users';
import { router as artistsRouter } from './routers/artists/artists';
import { router as authRouther } from './routers/authentication/authentication';
import { router as likedArtistsRouter } from './routers/likedArtists/likedArtists';
import { router as dislikedArtistsRouter } from './routers/dislikedArtists/dislikedArtists';
import { router as recommendationsRouter } from './routers/recommendations/recommendations';
import { router as versionRooter } from './routers/version/version';
import { errorManager } from './middlewares/error/errorManager';
import * as OpenApiValidator from 'express-openapi-validator';
import morgan from 'morgan';

export const app = express();

app.use(express.json());
app.use(
  OpenApiValidator.middleware({
    apiSpec: './openapi.yaml',
    validateRequests: {
      removeAdditional: 'all',
    },
    // ignoreUndocumented: true,
  }),
);
app.use(morgan('dev'));
app.use('/version', versionRooter);
app.use('/auth', authRouther);
app.use('/users', usersRouter);
app.use('/artists', artistsRouter);
app.use('/liked_artists', likedArtistsRouter);
app.use('/disliked_artists', dislikedArtistsRouter);
app.use('/recommendations', recommendationsRouter);

app.use(errorManager);
