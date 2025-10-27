// app/utils/posts.ts
import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { cache } from 'react';

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

// Helper function to validate and format date
function validateAndFormatDate(dateString: string): string {
  if (!dateString) {
    console.warn('Missing date. Using current date.');
    return new Date().toISOString().split('T')[0];
  }
  
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    console.warn(`Invalid date found: ${dateString}. Using current date.`);
    return new Date().toISOString().split('T')[0];
  }
  
  return date.toISOString().split('T')[0];
}

export async function getSortedPostsData(): Promise<PostMetadata[]> {
  try {
    const fileNames = await fs.readdir(postsDirectory); 

    const allPostsData = await Promise.all(
      fileNames.map(async (fileName) => {
        try {
          const slug = fileName.replace(/\.mdx$/, '') .replace(/[-_]+/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
          const fullPath = path.join(postsDirectory, fileName);
          const fileContents = await fs.readFile(fullPath, 'utf8');
          const matterResult = matter(fileContents);

          // Validate and format the date
          const validatedDate = validateAndFormatDate(matterResult.data.date);

          return {
            slug,
            title: matterResult.data.title || `${slug}`,
            date: validatedDate,
            description: matterResult.data.description || `Read our article about ${slug.replace(/-/g, ' ')}`,
          } as PostMetadata;
        } catch (error) {
          console.error(`Error processing file ${fileName}:`, error);
          // Return a fallback post object
          return {
            slug: fileName.replace(/\.mdx$/, ''),
            title: `${fileName.replace(/\.mdx$/, '')}`,
            date: new Date().toISOString().split('T')[0],
            description: 'This post is currently unavailable.',
          };
        }
      })
    );

    // Filter out any null values and sort posts by date
    const validPosts = allPostsData.filter(post => post !== null);
    
    return validPosts.sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  } catch (error) {
    console.error('Error reading posts directory:', error);
    return [];
  }
}

export const getPostData = cache(async (slug: string): Promise<FullPostData> => {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);
    const fileContents = await fs.readFile(fullPath, 'utf8'); 

    const matterResult = matter(fileContents);

    // Validate and format the date
    const validatedDate = validateAndFormatDate(matterResult.data.date);

    return {
      slug,
      content: matterResult.content,
      title: matterResult.data.title || `${slug}`,
      date: validatedDate,
      description: matterResult.data.description || `Read our article about ${slug.replace(/-/g, ' ')}`,
    } as FullPostData;
  } catch (error) {
    console.error(`Error loading post ${slug}:`, error);
    throw new Error(`Post ${slug} not found`);
  }
});
