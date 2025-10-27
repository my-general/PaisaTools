// app/utils/posts.ts
import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { cache } from 'react';

const postsDirectory = path.join(process.cwd(), 'posts');

export interface PostMetadata {
  slug: string; // This should be the original filename without .mdx
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

// Helper function to format title from slug
function formatTitleFromSlug(slug: string): string {
  return slug
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase())
    .trim();
}

export async function getSortedPostsData(): Promise<PostMetadata[]> {
  try {
    const fileNames = await fs.readdir(postsDirectory); 

    const allPostsData = await Promise.all(
      fileNames.map(async (fileName) => {
        try {
          // Keep the original slug (filename without .mdx)
          const slug = fileName.replace(/\.mdx$/, '');
          const fullPath = path.join(postsDirectory, fileName);
          const fileContents = await fs.readFile(fullPath, 'utf8');
          const matterResult = matter(fileContents);

          // Validate and format the date
          const validatedDate = validateAndFormatDate(matterResult.data.date);

          return {
            slug, // Keep original slug for file lookup
            title: matterResult.data.title || formatTitleFromSlug(slug),
            date: validatedDate,
            description: matterResult.data.description || `Read our article about ${formatTitleFromSlug(slug)}`,
          } as PostMetadata;
        } catch (error) {
          console.error(`Error processing file ${fileName}:`, error);
          // Return a fallback post object
          const slug = fileName.replace(/\.mdx$/, '');
          return {
            slug,
            title: formatTitleFromSlug(slug),
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
    // Use the original slug to find the file
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);
    const fileContents = await fs.readFile(fullPath, 'utf8'); 

    const matterResult = matter(fileContents);

    // Validate and format the date
    const validatedDate = validateAndFormatDate(matterResult.data.date);

    return {
      slug, // Keep original slug
      content: matterResult.content,
      title: matterResult.data.title || formatTitleFromSlug(slug),
      date: validatedDate,
      description: matterResult.data.description || `Read our article about ${formatTitleFromSlug(slug)}`,
    } as FullPostData;
  } catch (error) {
    console.error(`Error loading post ${slug}:`, error);
    throw new Error(`Post ${slug} not found`);
  }
});

// Debug function to check what files exist
export async function debugPostsFiles() {
  try {
    const files = await fs.readdir(postsDirectory);
    console.log('Available post files:', files);
    return files;
  } catch (error) {
    console.error('Error reading posts directory:', error);
    return [];
  }
}
