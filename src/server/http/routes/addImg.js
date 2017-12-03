/* eslint-disable */
import _ from 'lodash';

import User from '../../models/User';

export const addImg = async (req, res) => {
  try {
    const { user: { id }, ctx: { db } } = req;
    const { profile_picture, pic1, pic2, pic3, pic4 } = req.files;
    const [[pictures]] = _.filter(req.files, (picture) => picture !== undefined);

    if (!pictures) return req.Err('Failed to upload image');
    const obj = {};
    obj[pictures.fieldname] = `/upload/${pictures.filename}`;
    const user = await User.update.bind({ db })(obj, Number(id));
    res.json({ details: 'Succesfully update your picutre' });
  }
  catch(err) {
    req.Err('Failed to upload image');
  }
};
export default addImg;
