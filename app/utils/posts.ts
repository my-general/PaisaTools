// app/utils/posts.ts
import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { cache } from 'react'; // <-- 1. IMPORT React's cache

const postsDirectory = path.join(process.cwd(), 'posts');

export interface PostMetadata {
  slug: string;
  title: string;
  date: string;
  description: string;
}

export type FullPostData = PostMetadata & {
  content: string;
};

export async function getSortedPostsData(): Promise<PostMetadata[]> {
  const fileNames = await fs.readdir(postsDirectory); 

  const allPostsData = await Promise.all(
    fileNames.map(async (fileName) => {
      const slug = fileName.replace(/\.mdx$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = await fs.readFile(fullPath, 'utf8');
      const matterResult = matter(fileContents);

      return {
        slug,
        title: matterResult.data.title,
        date: matterResult.data.date,
        description: matterResult.data.description,
      } as PostMetadata;
    })
  );

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

//      2. WRAP getPostData in cache()     
export const getPostData = cache(async (slug: string): Promise<FullPostData> => {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);
  const fileContents = await fs.readFile(fullPath, 'utf8'); 

  const matterResult = matter(fileContents);

  return {
    slug,
    content: matterResult.content,
    title: matterResult.data.title,
    date: matterResult.data.date,
    description: matterResult.data.description,
  } as FullPostData;
});