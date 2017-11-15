import R from 'ramda';
import User from '../../../models/User';

export const addImg = async (req, res) => {
  const imgs = {};
  const { user: { id }, ctx: { db } } = req;
  const { profilePicture } = req.files;
  let path = null;

  if (req.files.pictures) {
    req.files.pictures.forEach((img, index) => {
      imgs[`photo_${index + 1}`] = `/uploads/${img.filename}`;
    });
  }
  if (profilePicture) {
    path = `/uploads/${req.files.profilePicture[0].filename}`;
  }
  try {
    const imgsPath = await User.addImg.bind({ db })(imgs, path, id);
    res.json = R.pick(['photo_1', 'photo_2', 'photo_3', 'photo_4', 'photo_5'], imgsPath);
  } catch (err) {
    req.Err('Failed to authenticate');
  }
};

export const addProfilePicture = async (req, res) => {

};
export default addImg;
