// app/blog/[slug]/page.tsx
import { getPostData, getSortedPostsData } from '../../utils/posts';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { useMDXComponents } from '../../../mdx-components'; 
import type { Metadata } from 'next';

interface PostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const posts = await getSortedPostsData();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = await getPostData(slug);
    return {
      title: `${post.title} - PaisaTools Blog`,
      description: post.description,
      openGraph: {
        title: post.title,
        description: post.description,
        type: 'article',
        publishedTime: post.date,
      },
    };
  } catch (e) {
    return {
      title: 'Post not found - PaisaTools',
    };
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  let post;

  try {
    post = await getPostData(slug);
  } catch (e) {
    notFound(); 
  }

  const components = useMDXComponents({});

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <article className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-10">
          {/* Post Header */}
          <header className="border-b border-gray-200 pb-6 mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              {post.title}
            </h1>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-gray-600">
              <time dateTime={post.date} className="text-lg">
                {new Date(post.date).toLocaleDateString('en-IN', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
              <span className="text-blue-600 font-medium mt-2 sm:mt-0">
                PaisaTools Blog
              </span>
            </div>
          </header>

          {/* Post Content */}
          <div className="prose prose-lg max-w-none 
                         prose-headings:text-gray-900
                         prose-p:text-gray-700 prose-p:leading-relaxed
                         prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
                         prose-strong:text-gray-900
                         prose-em:text-gray-700
                         prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50
                         prose-ul:text-gray-700 prose-ol:text-gray-700
                         prose-code:bg-gray-100 prose-code:rounded prose-code:px-1
                         prose-pre:bg-gray-900 prose-pre:text-gray-100
                         prose-table:border-gray-300
                         prose-th:bg-gray-100 prose-th:text-gray-900
                         prose-td:border-gray-200
                         prose-img:rounded-lg prose-img:shadow-md
                         prose-hr:border-gray-300">
            <MDXRemote source={post.content} components={components} />
          </div>

          {/* Post Footer */}
          <footer className="border-t border-gray-200 pt-6 mt-8">
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              <span>📊 Financial Education</span>
              <span>🇮🇳 India Focus</span>
              <span>💡 Practical Tips</span>
            </div>
          </footer>
        </article>

        {/* Related Posts or CTA */}
        <div className="mt-8 text-center">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Need Help with Calculations?
            </h3>
            <p className="text-gray-600 mb-4">
              Use our free financial calculators to plan your finances better.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="/income-tax-calculator" 
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Tax Calculator
              </a>
              <a 
                href="/sip-calculator" 
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                SIP Calculator
              </a>
              <a 
                href="/" 
                className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
              >
                All Calculators
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}