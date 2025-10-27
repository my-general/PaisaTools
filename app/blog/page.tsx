// app/blog/page.tsx
import { getSortedPostsData, PostMetadata } from '../utils/posts';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog - PaisaTools',
  description: 'Read our latest articles and guides on financial planning, taxes, investments, and smart money management.',
  keywords: 'finance blog, tax guides, investment tips, financial planning',
};

// Error boundary component for individual posts
const BlogCardErrorBoundary = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

// Enhanced BlogCard with better design and error handling
const BlogCard = ({ post }: { post: PostMetadata }) => {
  let formattedDate = 'Invalid Date';
  
  try {
    const date = new Date(post.date);
    if (!isNaN(date.getTime())) {
      formattedDate = date.toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    }
  } catch (error) {
    console.warn(`Invalid date for post ${post.slug}:`, post.date);
  }

  return (
    <BlogCardErrorBoundary>
      <Link 
        href={`/blog/${post.slug}`}
        className="block group relative p-8 bg-white rounded-2xl shadow-sm border border-gray-100 
                   hover:shadow-2xl hover:border-blue-100 hover:-translate-y-1 
                   transition-all duration-300 ease-out
                   focus:outline-none focus:ring-4 focus:ring-blue-500/20
                   overflow-hidden"
      >
        {/* Background Gradient Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-white/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Content */}
        <div className="relative z-10">
          {/* Date */}
          <div className="flex items-center text-sm text-gray-500 mb-3">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <time dateTime={post.date}>{formattedDate}</time>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-700 transition-colors duration-200 line-clamp-2">
            {post.title}
          </h2>

          {/* Description */}
          <p className="text-gray-600 leading-relaxed mb-4 group-hover:text-gray-700 transition-colors duration-200 line-clamp-3">
            {post.description}
          </p>

          {/* Read More CTA */}
          <div className="flex items-center text-blue-600 font-medium text-sm">
            Read article
            <svg 
              className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-200" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </Link>
    </BlogCardErrorBoundary>
  );
};

// Skeleton loader for better UX
const BlogCardSkeleton = () => (
  <div className="block p-8 bg-white rounded-2xl shadow-sm border border-gray-100 animate-pulse">
    <div className="h-4 bg-gray-200 rounded w-32 mb-4"></div>
    <div className="h-7 bg-gray-200 rounded w-full mb-3"></div>
    <div className="h-7 bg-gray-200 rounded w-4/5 mb-4"></div>
    <div className="h-5 bg-gray-200 rounded w-full mb-2"></div>
    <div className="h-5 bg-gray-200 rounded w-full mb-2"></div>
    <div className="h-5 bg-gray-200 rounded w-3/4"></div>
  </div>
);

export default async function BlogHome() {
  let allPosts: PostMetadata[] = [];
  let error = null;

  try {
    allPosts = await getSortedPostsData();
  } catch (err) {
    error = err instanceof Error ? err.message : 'Failed to load posts';
    console.error('Error loading posts:', err);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Enhanced Hero Section */}
        <section className="text-center bg-white rounded-2xl shadow-sm p-12 mb-16 
                          border border-gray-100 hover:shadow-md transition-shadow duration-300">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 
                         bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Paisa Blogs
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
              Expert guides on taxes, investments, and financial planning
              <span className="block text-lg text-gray-500 mt-2">
                Make smarter money decisions with our comprehensive articles
              </span>
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
              <span className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                Practical Tips
              </span>
              <span className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                Updated for 2024
              </span>
              <span className="flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                Free Forever
              </span>
            </div>
          </div>
        </section>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center mb-8">
            <div className="text-red-600 text-lg font-semibold mb-2">
              Unable to load posts
            </div>
            <p className="text-red-500 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Posts Grid */}
        <section>
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Latest Articles
              </h2>
              <p className="text-gray-600">
                {allPosts.length} article{allPosts.length !== 1 ? 's' : ''} to help you master your finances
              </p>
            </div>
          </div>

          {allPosts.length === 0 && !error ? (
            // Loading state
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[1, 2, 3, 4].map((i) => (
                <BlogCardSkeleton key={i} />
              ))}
            </div>
          ) : (
            // Posts grid
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {allPosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          )}

          {/* Empty State */}
          {allPosts.length === 0 && !error && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">📝</div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No articles yet</h3>
              <p className="text-gray-500">Check back soon for new financial guides and tips.</p>
            </div>
          )}
        </section>

        {/* CTA Section */}
        <section className="text-center mt-16 pt-8 border-t border-gray-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Need help with specific calculations?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Use our financial calculators to get precise numbers for taxes, investments, and loans.
          </p>
          <Link 
            href="/"
            className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 
                       text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl 
                       transform hover:-translate-y-0.5 transition-all duration-200"
          >
            Explore Calculators
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </section>
      </div>
    </div>
  );
}
