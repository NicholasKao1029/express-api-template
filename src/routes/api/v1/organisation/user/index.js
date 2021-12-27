const express = require('express');
const userRouter = express.Router({ mergeParams: true });
const userController = require('../../../../../../controllers/user.js');

userRouter.get('', userController.getAll);
userRouter.post('', userController.post);
userRouter.get('/:userId', userController.get);
userRouter.patch('/:userId', userController.patch);
userRouter.delete('/:userId', userController.deleteHandler);

module.exports = userRouter;
