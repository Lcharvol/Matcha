import R from 'ramda';
import User from '../../models/User';

const addImg = async (req, res) => {
  const imgs = {};
  const { user: { id }, ctx: { db } } = req;
  const { imgProfile } = req.files;
  let path = null;

  if (req.files.imgs) {
    req.files.imgs.forEach((img, index) => {
      imgs[`photo_${index + 1}`] = `/uploads/${img.filename}`;
    });
  }
  if (imgProfile) {
    path = `/uploads/${req.files.imgProfile[0].filename}`;
  }
  try {
    const imgsPath = await User.addImg.bind({ db })(imgs, path, id);
    res.json = R.pick(['photo_1', 'photo_2', 'photo_3', 'photo_4', 'photo_5'], imgsPath);
  } catch (err) {
    res.status = 201;
    res.json({ details: 'Failed to authenticate' });
  }
};
export default addImg;
