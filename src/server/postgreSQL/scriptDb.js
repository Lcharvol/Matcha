/* eslint-disable */
const queryDrop = 'DROP TABLE users, notifs, chat';
// ALTER SEQUENCE users_id_seq RESTART WITH 1`;

export const resetDb = async (db) => db.none(queryDrop).then(() => process.exit());
const p = '$2a$10$vpiJTzmJVRLJe5qOM4T5eOtjd2jmUgV7JGM7Q5STQuXqgB6QbqAi6';
const w = 'woman';
const h = 'heterosexual';
const b = 'bisexual';
const g = 'homosexual';
const _ = '@gmail.com';

const i = [
  '/uploads/f1', '/uploads/f2', '/uploads/f3', '/uploads/f4', '/uploads/f5', '/uploads/f6', '/uploads/f7', '/uploads/f8', '/uploads/f9', '/uploads/f10', '/uploads/f11', '/uploads/f12', '/uploads/f13', '/uploads/f14',
  '/uploads/h1', '/uploads/h2', '/uploads/h3', '/uploads/h4', '/uploads/h5', '/uploads/h6', '/uploads/h7', '/uploads/h8', '/uploads/h9',
];
const r = [
  '', '/uploads/r1', '/uploads/r2', '/uploads/r3', '/uploads/r4', '/uploads/r5', '/uploads/r6', '/uploads/r7', '/uploads/r8', '/uploads/r9',
];

// football, tennis, enfant, maquillage, parcour, rugby
const queryData = `
INSERT INTO
users
(login, email, password, firstname, lastname, sexe, age, sexualorientation, latitude, longitude, confirmed, pic1, pic2, pic3, pic4, profile_picture, popularity, interest, postal_code, city)

VALUES
('juliako','abarriel@student.42.fr','${p}','julia','liako','${w}','21','${h}',48.8537, 2.549, true, '${r[2]}', '${r[1]}', '/uploads/null', '/uploads/null', '${i[0]}', '5', '{football,parcour,enfant}', '75017', 'Paris'),
('jpascal','jpascal${_}','${p}','julie','pascal','${w}','45','${h}',48.8856123, 2.3236024, true, '${r[4]}', '${r[6]}', '/uploads/null', '/uploads/null', '${i[1]}', '15', '{football,parcour,rugby}', '75017', 'Paris'),
('marnaud','marnaud${_}','${p}','mariana','arnaud','${w}','35','${h}',48.8724036, 2.3315904, true, '${r[7]}', '/uploads/null', '/uploads/null', '/uploads/null', '${i[2]}', '25', '{football,maquillage,tennis}', '75017', 'Paris'),
('mquesada','mquesada${_}','${p}','marina','quesada','${w}','19','${b}',48.8724036, 2.3315904, true, '${r[8]}', '/uploads/null', '/uploads/null', '/uploads/null', '${i[3]}', '35', '{football,enfant,tenis}', '75017', 'Paris'),
('elizabeth','elizabeth.barrielle${_}','${p}','elizabeth','borg','${w}','35','${h}',43.3443814, 5.4032437, true, '${r[4]}', '${r[1]}', '${r[2]}', '${r[8]}', '${i[4]}', '85', '{football,enfant}', '75017', 'Paris'),
('natasha','natasha${_}','${p}','natasha','lagentille','${w}','36','${h}',43.2803051, 5.2650563, true, '${r[5]}', '/uploads/null', '/uploads/null', '/uploads/null', '${i[5]}', '55', '{football,parcour}', '75017', 'Paris'),
('ltitia','lititia.barrielle${_}','${p}','laetitia','pascal','${w}','18','${b}',43.3265892, 5.5158536, true, '${r[1]}', '${r[2]}', '${r[6]}', '${r[3]}', '${i[6]}', '85', '{football,sexe}', '75017', 'Paris'),
('linab','lina.barrielle${_}','${p}','lina','fa','${w}','24','${h}',48.8821757, 2.2637868, true, '${r[2]}', '/uploads/null', '/uploads/null', '/uploads/null', '${i[7]}', '55', '{football,rugby,maquillage}', '75017', 'Paris'),
('leab','leab.l${_}','${p}','lea','farcy','${w}','27','${h}',48.9305507, 2.2744882, true, '${r[3]}', '/uploads/null', '/uploads/null', '/uploads/null', '${i[8]}', '55', '{football, rugby, tennis,parcoure}', '75017', 'Paris'),
('lolab','lola.barrielle${_}','${p}','lola','barrielle','${w}','25','${h}',48.8422437, 2.2363779, true, '${r[5]}', '${r[1]}', '${r[2]}', '${r[3]}', '${i[9]}', '5', '{football,rugby,tennis,maquillage}', '75017', 'Paris'),
('camilleb','camille.barrielle${_}','${p}','camille','barrielle','${w}','18','${b}',48.8537, 2.549, true, '${r[7]}', '/uploads/null', '/uploads/null', '/uploads/null', '${i[10]}', '55', '{football,rugby,tennis}', '75017', 'Paris'),
('marine','marinebarrielle${_}','${p}','marine','jse','${w}','31','${g}',48.8965054, 2.4560455, true, '${r[9]}', '/uploads/null', '/uploads/null', '/uploads/null', '${i[11]}', '75', '{tennis}', '75017', 'Paris'),
('inesb','ines.barrielle${_}','${p}','ines','barrielle','${w}','31','${b}',48.8734482, 2.2561488, true, '${r[8]}', '/uploads/null', '/uploads/null', '/uploads/null', '${i[12]}', '95', '{}', '75017', 'Paris'),
('mariab','maria.barrielle${_}','${p}','maria','barrielle','${w}','31','${h}',48.8871477, 2.2541669, true, '${r[1]}', '${r[2]}', '${r[7]}', '${r[4]}', '${i[13]}', '5', '{enfant}', '75017', 'Paris'),
('zoeb','zoe.barrielle${_}','${p}','zoe','barrielle','${w}','18','${h}',48.902219, 2.3513199, true, '${r[8]}', '/uploads/null', '/uploads/null', '/uploads/null', '${i[14]}', '5', '{tennis,passion}', '75017', 'Paris'),

('lcharvol','lcharvl${_}','${p}','lucals','charvol','man','52','${b}',48.8882574, 2.3168467, true, '${r[1]}', '/uploads/null', '/uploads/null', '/uploads/null', '${i[15]}', '25', '{football,rugby}', '75017', 'Paris'),
('tferrari','tferrari${_}','${p}','tony','ferrari','man','65','${b}',48.8852991, 2.339703, true, '${r[5]}', '/uploads/null', '/uploads/null', '/uploads/null', '${i[16]}', '45', '{football,parcour}', '75017', 'Paris'),
('tboivin','tboivin${_}','${p}','thibault','boivin','man','22','${h}',48.8249724, 2.4423883, true, '${r[4]}', '${r[1]}', '${r[5]}', '${r[4]}', '${i[17]}', '21', '{football,enfant,parcour,tennis,maquillage,sexe}', '75017', 'Paris'),
('abarriel','allan.barrielle${_}','${p}','allan','barrielle','man','22','${h}',48.8249724, 2.4423883, true, '${r[4]}', '${r[1]}', '${r[5]}', '${r[4]}', '${i[17]}', '21', '{football,enfant,parcour,tennis,maquillage,sexe}', '75017', 'Paris'),
('aboudjmen','aboudjmen${_}','${p}','adams','boudj','man','19','${b}',48.770936, 2.5586286, true, '${r[6]}', '${r[1]}', '${r[9]}', '${r[3]}', '${i[18]}', '23', '{football,parcour}', '75017', 'Paris'),
('lduval','lduval${_}','${p}','lucas','duval','man','37','${h}',47.8889781, 2.1386827, true, '${r[7]}', '${r[2]}', '${r[3]}', '${r[4]}', '${i[19]}', '56', '{football,rugby}', '75017', 'Paris'),
('paulokok','paul.barrielle${_}','${p}','paul','ribaut','${w}','20','${h}',43.3453801,5.4707066, true, '${r[4]}', '${r[9]}', '${r[1]}', '${r[2]}', '${i[20]}', '87', '{tennis,enfant,football}', '75017', 'Paris'),
('mathias','cmarhie.barrielle${_}','${p}','mathias','retur','man','18','${g}', 25.9776617,59.2608103, true, '${r[9]}', '${r[2]}', '${r[3]}', '${r[7]}', '${i[21]}', '100', '{tennis,maquillage}', '75017', 'Paris'),
('arthur','artuhr.barrielle${_}','${p}','arthur','carbo','man','31','${g}',48.8193103, 2.415233, true, '${r[2]}', '${r[7]}', '${r[8]}', '${r[4]}', '${i[22]}', '9', '{tennis,sexe}', '75017', 'Marseille'),
('jesus','mjesu.barrielle${_}','${p}','jesus','barrielle','man','31','${g}',48.8755667, 2.4627832, true, '${r[9]}', '${r[7]}', '${r[2]}', '${r[8]}', '${i[22]}', '10', '{tennis,football}', '75017', 'Paris');
`;
// 14 filles
// 9 homme

const queryDataChat = `
INSERT INTO
chat
(user_send, user_receive, date, msg)

VALUES
(2, 19, '2017-12-05 19:05:34 +0000', 'Hello'),
(2, 19, '2017-12-05 19:05:39 +0000', 'Hello'),
(19, 2, '2017-12-05 19:06:52 +0000', 'oui est toi'),
(19, 2, '2017-12-05 19:07:09 +0000', 'tkl'),
(19, 2, '2017-12-05 19:07:40 +0000', 'si si je suis juste entrain de pisser'),
(19, 2, '2017-12-05 19:10:22 +0000', 'si si je suis juste entrain de pisser'),
(19, 2, '2017-12-05 19:10:24 +0000', 'si si je suis juste entrain de pisser?'),
(2, 19, '2017-12-05 19:10:43 +0000', 'daccord je pense pas?'),
(2, 19, '2017-12-05 19:10:47 +0000', 'daccord je pense pas?!8'),
(2, 19, '2017-12-05 19:12:11 +0000', 'daccord je pense pas?!8'),
(19, 2, '2017-12-05 19:12:19 +0000', 'si si je suis juste entrain de pisser?'),
(19, 2, '2017-12-05 19:12:22 +0000', '1'),
(2, 19, '2017-12-05 19:12:27 +0000', '2'),
(19, 2, '2017-12-05 19:12:32 +0000', '3'),
(2, 19, '2017-12-05 19:12:36 +0000', '4'),
(19, 2, '2017-12-05 19:13:06 +0000', '5'),
(2, 19, '2017-12-05 19:13:09 +0000', '456'),
(19, 2, '2017-12-05 19:13:17 +0000', 'je c plsu quoi dire'),
(2, 19, '2017-12-05 19:13:23 +0000', 'bah di rien alors'),
(19, 2, '2017-12-05 19:13:29 +0000', 'ok je di plus rien'),
(2, 19, '2017-12-05 19:13:38 +0000', 'tu tapplees comment?'),
(19, 2, '2017-12-05 19:13:52 +0000', 'je mapelle abarriel'),
(2, 19, '2017-12-05 19:14:01 +0000', 't une belle fille'),
(19, 2, '2017-12-05 19:14:07 +0000', 'non je suis nun garcon');
`;

const queryDataLike = `
INSERT INTO
notifs
(user_send, user_receive, date, push, type, details)

VALUES
(19, 2, '2017-12-05 18:05:48 +0000', true, 'like', 'abarriel like your profile'),
(2, 19, '2017-12-05 18:44:54 +0000', true, 'like', 'jpascal like you back');
`;
export const loadUsers = async (db) => db.none(queryData).catch(err => console.log(err));
export const loadChat = async (db) => db.none(queryDataChat).catch(err => console.log(err));
export const loadLike = async (db) => db.none(queryDataLike).catch(err => console.log(err));
