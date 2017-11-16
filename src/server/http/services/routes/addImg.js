/* eslint-disable */
import R from 'ramda';
import User from '../../../models/User';

export const addImg = async (req, res) => {
  const imgs = {};
  const { user: { id }, ctx: { db } } = req;
  const { profile_picture } = req.files;
  let path = null;
  console.log(req.files);
  if (req.files.pictures) {
    req.files.pictures.forEach((img, index) => {
      imgs[`photo_${index + 1}`] = `/uploads/${img.filename}`;
    });
  }
  if (profile_picture) {
    path = `/uploads/${req.files.profile_picture[0].filename}`;
  }
  try {
    const imgsPath = await User.addImg.bind({ db })(imgs, path, id);
    res.json({ details: R.pick(['photo_1', 'photo_2', 'photo_3', 'photo_4', 'photo_5'], imgsPath) });
  } catch (err) {
    req.Err('Failed to authenticate');
  }
};
export default addImg;
