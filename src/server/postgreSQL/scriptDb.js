/* eslint-disable */
const queryDrop = 'DROP TABLE users';
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
  '', '/uploads/r1', '/uploads/r2', '/uploads/r3', '/uploads/r4', '/uploads/r5', '/uploads/r6', '/uploads/r7', '/uploads/r8',
];

// football, tennis, enfant, maquillage, parcour, rugby
const queryData = `
INSERT INTO
users
(login, email, password, firstname, lastname, sexe, age, sexualorientation, latitude, longitude, confirmed, pic1, pic2, pic3, pic4, profile_picture, popularity, interest)

VALUES
('juliako','abarriel@student.42.fr','${p}','julia','liako','${w}','21','${h}',48.8537, 2.549, true, '${r[2]}', '${r[1]}', '/uploads/null', '/uploads/null', '${i[0]}', '5', '{football,parcour,enfant}'),
('jpascal','jpascal${_}','${p}','julie','pascal','${w}','45','${h}',48.8856123, 2.3236024, true, '${r[4]}', '${r[6]}', '/uploads/null', '/uploads/null', '${i[1]}', '15', '{football,parcour,rugby}'),
('marnaud','marnaud${_}','${p}','mariana','arnaud','${w}','35','${h}',48.8724036, 2.3315904, true, '${r[7]}', '/uploads/null', '/uploads/null', '/uploads/null', '${i[2]}', '25', '{football,maquillage,tennis}'),
('mquesada','mquesada${_}','${p}','marina','quesada','${w}','19','${b}',48.8724036, 2.3315904, true, '${r[8]}', '/uploads/null', '/uploads/null', '/uploads/null', '${i[3]}', '35', '{football,enfant,tenis}'),
('elizabeth','elizabeth.barrielle${_}','${p}','elizabeth','borg','${w}','35','${h}',43.3443814, 5.4032437, true, '${r[4]}', '${r[1]}', '${r[2]}', '${r[8]}', '${i[4]}', '85', '{football,enfant}'),
('natasha','natasha${_}','${p}','natasha','lagentille','${w}','36','${h}',43.2803051, 5.2650563, true, '${r[5]}', '/uploads/null', '/uploads/null', '/uploads/null', '${i[5]}', '55', '{football,parcour}'),
('ltitia','lititia.barrielle${_}','${p}','laetitia','pascal','${w}','18','${b}',43.3265892, 5.5158536, true, '${r[1]}', '${r[2]}', '${r[6]}', '${r[3]}', '${i[6]}', '85', '{football,sexe}'),
('linab','lina.barrielle${_}','${p}','lina','fa','${w}','24','${h}',48.8821757, 2.2637868, true, '${r[2]}', '/uploads/null', '/uploads/null', '/uploads/null', '${i[7]}', '55', '{football,rugby,maquillage}'),
('leab','leab.l${_}','${p}','lea','farcy','${w}','27','${h}',48.9305507, 2.2744882, true, '${r[3]}', '/uploads/null', '/uploads/null', '/uploads/null', '${i[8]}', '55', '{football, rugby, tennis,parcoure}'),
('lolab','lola.barrielle${_}','${p}','lola','barrielle','${w}','25','${h}',48.8422437, 2.2363779, true, '${r[5]}', '${r[1]}', '${r[2]}', '${r[3]}', '${i[9]}', '5', '{football,rugby,tennis,maquillage}'),
('camilleb','camille.barrielle${_}','${p}','camille','barrielle','${w}','18','${b}',48.8537, 2.549, true, '${r[7]}', '/uploads/null', '/uploads/null', '/uploads/null', '${i[10]}', '55', '{football,rugby,tennis}'),
('marine','marinebarrielle${_}','${p}','marine','jse','${w}','31','${g}',48.8965054, 2.4560455, true, '${r[9]}', '/uploads/null', '/uploads/null', '/uploads/null', '${i[11]}', '75', '{tennis}'),
('inesb','ines.barrielle${_}','${p}','ines','barrielle','${w}','31','${b}',48.8734482, 2.2561488, true, '${r[8]}', '/uploads/null', '/uploads/null', '/uploads/null', '${i[12]}', '95', '{}'),
('mariab','maria.barrielle${_}','${p}','maria','barrielle','${w}','31','${h}',48.8871477, 2.2541669, true, '${r[1]}', '${r[2]}', '${r[7]}', '${r[4]}', '${i[13]}', '5', '{enfant}'),
('zoeb','zoe.barrielle${_}','${p}','zoe','barrielle','${w}','18','${h}',48.902219, 2.3513199, true, '${r[8]}', '/uploads/null', '/uploads/null', '/uploads/null', '${i[14]}', '5', '{tennis,passion}'),

('lcharvol','lcharvl${_}','${p}','lucals','charvol','man','52','${b}',48.8882574, 2.3168467, true, '${r[1]}', '/uploads/null', '/uploads/null', '/uploads/null', '${i[15]}', '25', '{football,rugby}'),
('tferrari','tferrari${_}','${p}','tony','ferrari','man','65','${b}',48.8852991, 2.339703, true, '${r[5]}', '/uploads/null', '/uploads/null', '/uploads/null', '${i[16]}', '45', '{football,parcour}'),
('tboivin','tboivin${_}','${p}','thibault','boivin','man','22','${h}',48.8249724, 2.4423883, true, '${r[4]}', '${r[1]}', '${r[5]}', '${r[4]}', '${i[17]}', '21', '{football,enfant,parcour,tennis,maquillage,sexe}'),
('abarriell','allan.barrielle${_}','${p}','allan','barrielle','man','22','${h}',48.8249724, 2.4423883, true, '${r[4]}', '${r[1]}', '${r[5]}', '${r[4]}', '${i[17]}', '21', '{football,enfant,parcour,tennis,maquillage,sexe}'),
('aboudjmen','aboudjmen${_}','${p}','adams','boudj','man','19','${b}',48.770936, 2.5586286, true, '${r[6]}', '${r[1]}', '${r[9]}', '${r[3]}', '${i[18]}', '23', '{football,parcour}'),
('lduval','lduval${_}','${p}','lucas','duval','man','37','${h}',47.8889781, 2.1386827, true, '${r[7]}', '${r[2]}', '${r[3]}', '${r[4]}', '${i[19]}', '56', '{football,rugby}'),
('paulokok','paul.barrielle${_}','${p}','paul','ribaut','${w}','20','${h}',43.3453801,5.4707066, true, '${r[4]}', '${r[9]}', '${r[1]}', '${r[2]}', '${i[20]}', '87', '{tennis,enfant,football}'),
('mathias','cmarhie.barrielle${_}','${p}','mathias','retur','man','18','${g}', 25.9776617,59.2608103, true, '${r[9]}', '${r[2]}', '${r[3]}', '${r[7]}', '${i[21]}', '100', '{tennis,maquillage}'),
('arthur','artuhr.barrielle${_}','${p}','arthur','carbo','man','31','${g}',48.8193103, 2.415233, true, '${r[2]}', '${r[7]}', '${r[8]}', '${r[4]}', '${i[22]}', '9', '{tennis,sexe}'),
('jesus','mjesu.barrielle${_}','${p}','jesus','barrielle','man','31','${g}',48.8755667, 2.4627832, true, '${r[9]}', '${r[7]}', '${r[2]}', '${r[8]}', '${i[22]}', '10', '{tennis,football}');
`;
// 14 filles
// 9 homme


export const loadUsers = async (db) => db.none(queryData).then(() => process.exit());
