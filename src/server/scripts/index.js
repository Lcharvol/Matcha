/* eslint-disable */
const queryDrop = 'DROP TABLE users';
// ALTER SEQUENCE users_id_seq RESTART WITH 1`;

export const resetDb = async (db) => db.none(queryDrop).then(() => process.exit());

const queryData = `
INSERT INTO users(login, email, password, firstname, lastname, sexe, age, sexualorientation, latitude, longitude, confirmed) VALUES
('juliako','abarriel@student.42.fr','$2a$10$vpiJTzmJVRLJe5qOM4T5eOtjd2jmUgV7JGM7Q5STQuXqgB6QbqAi6','julia','liako','woman','21','heterosexual',48.8537,2.549, true),
('lcharvol','lcharvl@gmail.com','$2a$10$vpiJTzmJVRLJe5qOM4T5eOtjd2jmUgV7JGM7Q5STQuXqgB6QbqAi6','lucals','charvol','man','52','bisexual',48.8882574,2.3168467, true),
('jpascal','jpascal@gmail.com','$2a$10$vpiJTzmJVRLJe5qOM4T5eOtjd2jmUgV7JGM7Q5STQuXqgB6QbqAi6','julie','pascal','woman','45','heterosexual',48.8856123,2.3236024, true),
('tferrari','tferrari@gmail.com','$2a$10$vpiJTzmJVRLJe5qOM4T5eOtjd2jmUgV7JGM7Q5STQuXqgB6QbqAi6','tony','ferrari','man','65','bisexual',48.8852991,2.339703, true),
('marnaud','marnaud@gmail.com','$2a$10$vpiJTzmJVRLJe5qOM4T5eOtjd2jmUgV7JGM7Q5STQuXqgB6QbqAi6','mariana','arnaud','woman','35','heterosexual',48.8724036,2.3315904, true),
('mquesada','mquesada@gmail.com','$2a$10$vpiJTzmJVRLJe5qOM4T5eOtjd2jmUgV7JGM7Q5STQuXqgB6QbqAi6','marina','quesada','woman','19','bisexual',48.8724036,2.3315904, true),
('tboivin','tboivin@gmail.com','$2a$10$vpiJTzmJVRLJe5qOM4T5eOtjd2jmUgV7JGM7Q5STQuXqgB6QbqAi6','thibault','boivin','man','22','heterosexual',48.8249724,2.4423883, true),
('aboudjmen','aboudjmen@gmail.com','$2a$10$vpiJTzmJVRLJe5qOM4T5eOtjd2jmUgV7JGM7Q5STQuXqgB6QbqAi6','adams','boudj','man','19','bisexual',48.770936,2.5586286, true),
('lduval','lduval@gmail.com','$2a$10$vpiJTzmJVRLJe5qOM4T5eOtjd2jmUgV7JGM7Q5STQuXqgB6QbqAi6','lucas','duval','man','37','heterosexual',47.8889781,2.1386827, true),
('natasha','natasha@gmail.com','$2a$10$vpiJTzmJVRLJe5qOM4T5eOtjd2jmUgV7JGM7Q5STQuXqgB6QbqAi6','natasha','lagentille','woman','36','heterosexual',43.2803051,5.2650563, true),
('elizabeth','elizabeth.barrielle@gmail.com','$2a$10$vpiJTzmJVRLJe5qOM4T5eOtjd2jmUgV7JGM7Q5STQuXqgB6QbqAi6','elizabeth','borg','woman','35','heterosexual',43.3443814,5.4032437, true),
('paulokok','paul.barrielle@gmail.com','$2a$10$vpiJTzmJVRLJe5qOM4T5eOtjd2jmUgV7JGM7Q5STQuXqgB6QbqAi6','paul','ribaut','woman','20','heterosexual',43.3453801,5.4707066, true),
('ltitia','lititia.barrielle@gmail.com','$2a$10$vpiJTzmJVRLJe5qOM4T5eOtjd2jmUgV7JGM7Q5STQuXqgB6QbqAi6','laetitia','pascal','woman','18','bisexual',43.3265892,5.5158536, true),
('linab','lina.barrielle@gmail.com','$2a$10$vpiJTzmJVRLJe5qOM4T5eOtjd2jmUgV7JGM7Q5STQuXqgB6QbqAi6','lina','fa','woman','24','heterosexual',48.8821757,2.2637868, true),
('leab','leab.l@gmail.com','$2a$10$vpiJTzmJVRLJe5qOM4T5eOtjd2jmUgV7JGM7Q5STQuXqgB6QbqAi6','lea','farcy','woman','27','heterosexual',48.9305507,2.2744882, true),
('lolab','lola.barrielle@gmail.com','$2a$10$vpiJTzmJVRLJe5qOM4T5eOtjd2jmUgV7JGM7Q5STQuXqgB6QbqAi6','lola','barrielle','woman','25','heterosexual',48.8422437,2.2363779, true),
('camilleb','camille.barrielle@gmail.com','$2a$10$vpiJTzmJVRLJe5qOM4T5eOtjd2jmUgV7JGM7Q5STQuXqgB6QbqAi6','camille','barrielle','woman','18','bisexual',48.8537,2.549,true),
('inesb','ines.barrielle@gmail.com','$2a$10$vpiJTzmJVRLJe5qOM4T5eOtjd2jmUgV7JGM7Q5STQuXqgB6QbqAi6','ines','barrielle','woman','31','bisexual',48.8734482,2.2561488, true),
('mariab','maria.barrielle@gmail.com','$2a$10$vpiJTzmJVRLJe5qOM4T5eOtjd2jmUgV7JGM7Q5STQuXqgB6QbqAi6','maria','barrielle','woman','31','heterosexual',48.8871477,2.2541669, true),
('zoeb','zoe.barrielle@gmail.com','$2a$10$vpiJTzmJVRLJe5qOM4T5eOtjd2jmUgV7JGM7Q5STQuXqgB6QbqAi6','zoe','barrielle','woman','18','heterosexual',48.902219,2.3513199, true),
('mathias','cmarhie.barrielle@gmail.com','$2a$10$vpiJTzmJVRLJe5qOM4T5eOtjd2jmUgV7JGM7Q5STQuXqgB6QbqAi6','mathias','retur','man','18','homosexual',25.9776617,59.2608103, true),
('arthur','artuhr.barrielle@gmail.com','$2a$10$vpiJTzmJVRLJe5qOM4T5eOtjd2jmUgV7JGM7Q5STQuXqgB6QbqAi6','arthur','carbo','man','31','homosexual',48.8193103,2.415233, true),
('jesus','mjesu.barrielle@gmail.com','$2a$10$vpiJTzmJVRLJe5qOM4T5eOtjd2jmUgV7JGM7Q5STQuXqgB6QbqAi6','jesus','barrielle','man','31','homosexual',48.8755667,2.4627832, true),
('marine','marinebarrielle@gmail.com','$2a$10$vpiJTzmJVRLJe5qOM4T5eOtjd2jmUgV7JGM7Q5STQuXqgB6QbqAi6','marine','jse','woman','31','homosexual',48.8965054,2.4560455, true);
`;

export const loadUsers = async (db) => db.none(queryData).then(() => process.exit());
