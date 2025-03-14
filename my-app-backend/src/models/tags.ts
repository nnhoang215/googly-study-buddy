import mongoose from 'mongoose';
import type { Request, Response } from 'express';

interface ITag {
  tagName: string,
  ownerId: number,
  parentId: number,
}

const tagSchema = new mongoose.Schema<ITag>({
  tagName: { type: String, required: true},
  ownerId: { type: Number, required: true},
  parentId: Number,
});

const Tag = mongoose.model('Tag', tagSchema);

const createTag = async (req: Request, res: Response): Promise<void> => {
  try {
    const { tagName, ownerId, parentId } = req.body as ITag;
    
    const existingTag = await Tag.findOne({ tagName: tagName });

    if (existingTag) {
      res.status(409).send('Tag already exists');
      return;
    }

    const tag = new Tag({ tagName, ownerId, parentId });
    const result = await tag.save();

    console.log(result.tagName, result.ownerId);
    res.status(201).send('Tag created successfully');
  } catch(error) {
    console.log(error);
    res.status(500).send('Internal server error');
  }
};
export default Tag; 
export { createTag };