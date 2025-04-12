import type { Request, Response } from 'express';
import Tag, { type ITag } from '../models/tags.js';

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

// TODO: implement
// function getMyTags

const getTagById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const tag = await Tag.findById(id);

    if (!tag) {
      res.status(404).send('Tag not found');
      return;
    }

    res.status(200).json(tag);
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal server error');
  }
};

const updateTag = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { tagName, ownerId, parentId } = req.body as ITag;

    const tag = await Tag.findByIdAndUpdate(id, { tagName, ownerId, parentId }, { new: true });

    if (!tag) {
      res.status(404).send('Tag not found');
      return;
    }

    res.status(200).send('Tag updated successfully');
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal server error');
  }
};

const deleteTag = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const tag = await Tag.findByIdAndDelete(id);

    if (!tag) {
      res.status(404).send('Tag not found');
      return;
    }

    res.status(200).send('Tag deleted successfully');
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal server error');
  }
};

export { createTag, getTagById, updateTag, deleteTag };
