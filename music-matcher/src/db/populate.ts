import authenticationService from '../services/authentication/authentication';
import usersService from '../services/users/users';
import artistsServices from '../services/artists/artists';
import likedArtistsServices from '../services/likedArtists/likedArtists';

const main = async () => {
  const admin = await authenticationService.registerUser({
    name: 'admin',
    email: 'admin@gmail.com',
    password: 'P4ssw0rd!',
  });

  usersService.updateUser(admin.id, { role: 'admin' });

  const user1 = await authenticationService.registerUser({
    name: 'user1',
    email: 'user1@gmail.com',
    password: 'P4ssw0rd!',
  });

  const user2 = await authenticationService.registerUser({
    name: 'user2',
    email: 'user2@gmail.com',
    password: 'P4ssw0rd!',
  });

  const user3 = await authenticationService.registerUser({
    name: 'user3',
    email: 'user3@gmail.com',
    password: 'P4ssw0rd!',
  });

  const user4 = await authenticationService.registerUser({
    name: 'user4',
    email: 'user4@gmail.com',
    password: 'P4ssw0rd!',
  });

  const user5 = await authenticationService.registerUser({
    name: 'user5',
    email: 'user5@gmail.com',
    password: 'P4ssw0rd!',
  });

  const abel31 = await artistsServices.addArtist(79533112);
  const realo = await artistsServices.addArtist(14415029);
  const hJeuneCrack = await artistsServices.addArtist(104543062);
  const femtogo = await artistsServices.addArtist(169773547);
  const irko = await artistsServices.addArtist(9483292);
  const snorunt = await artistsServices.addArtist(147184072);
  const neophron = await artistsServices.addArtist(116695882);
  const ajna = await artistsServices.addArtist(244617312);
  const wastingShit = await artistsServices.addArtist(127795482);
  const ptiteSoeur = await artistsServices.addArtist(130998972);

  await likedArtistsServices.addLike({
    idArtist: abel31.id,
    idUser: user1.id,
  });

  await likedArtistsServices.addLike({
    idArtist: femtogo.id,
    idUser: user1.id,
  });

  await likedArtistsServices.addLike({
    idArtist: abel31.id,
    idUser: user2.id,
  });

  await likedArtistsServices.addLike({
    idArtist: snorunt.id,
    idUser: user2.id,
  });

  await likedArtistsServices.addLike({
    idArtist: neophron.id,
    idUser: user2.id,
  });

  await likedArtistsServices.addLike({
    idArtist: realo.id,
    idUser: user3.id,
  });

  await likedArtistsServices.addLike({
    idArtist: abel31.id,
    idUser: user3.id,
  });

  await likedArtistsServices.addLike({
    idArtist: hJeuneCrack.id,
    idUser: user3.id,
  });

  await likedArtistsServices.addLike({
    idArtist: irko.id,
    idUser: user3.id,
  });

  await likedArtistsServices.addLike({
    idArtist: ajna.id,
    idUser: user3.id,
  });

  await likedArtistsServices.addLike({
    idArtist: realo.id,
    idUser: user4.id,
  });

  await likedArtistsServices.addLike({
    idArtist: femtogo.id,
    idUser: user4.id,
  });

  await likedArtistsServices.addLike({
    idArtist: wastingShit.id,
    idUser: user4.id,
  });

  await likedArtistsServices.addLike({
    idArtist: wastingShit.id,
    idUser: user5.id,
  });

  await likedArtistsServices.addLike({
    idArtist: ptiteSoeur.id,
    idUser: user5.id,
  });
};

main();
